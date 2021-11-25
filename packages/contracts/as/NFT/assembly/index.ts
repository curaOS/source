import {
    logging,
    context,
    u128,
    ContractPromise,
    PersistentSet,
    MapEntry,
    storage,
} from 'near-sdk-as'
import {
    Media,
    designs,
    owners,
    account_media,
    DESIGN_PRICE,
    FT_CONTRACT,
    GAS_FOR_NFT_APPROVE,
    NFTOnApprovedArgs,
} from './models'
import { NFTContractMetadata, TokenMetadata } from './metadata'
import {
    xcc_market_set_bid_shares,
    xcc_market_set_bid,
    xcc_market_remove_bid,
    xcc_market_accept_bid,
    xcc_market_burn,
} from './xcc_market'
import {
    assert_deposit_attached,
    assert_one_yocto,
    assert_at_least_one_yocto,
} from './asserts'
import { AccountId, royalty_to_payout } from '../../utils'
import { xcc_generator_generate } from './xcc_generator'
import {
    refund_deposit,
    refund_approved_account,
    refund_approved_accounts,
} from './internal_functions'

export const ROYALTY_PERCENTAGE: u16 = 2500 // 25%
const OWNER_PERCENTAGE: u16 = 7500 // 75%

type Payout = Map<AccountId, u128>

export function claim_media(tokenMetadata: TokenMetadata): Media {
    assert_deposit_attached(DESIGN_PRICE)

    /** Assert uniqueId is actually unique */

    let design = new Media(tokenMetadata.media, tokenMetadata.extra)

    owners.add(context.sender)

    designs.set(design.id, design)

    let accountMedia = account_media.get(context.sender)
    if (!accountMedia) {
        accountMedia = new PersistentSet(context.sender)
    }
    accountMedia.add(design.id)
    account_media.set(context.sender, accountMedia)

    // FT
    // xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_CLAIM, DESIGN_PRICE)
    // Market
    xcc_market_set_bid_shares(
        design.id,
        0,
        ROYALTY_PERCENTAGE,
        OWNER_PERCENTAGE
    )

    return design
}

export function burn_design(token_id: string): void {
    assert(owners.has(context.sender), 'No design to burn here.')

    const accountMedia = account_media.get(context.sender)
    if (!accountMedia) {
        return
    }
    accountMedia.delete(token_id)
    account_media.set(context.sender, accountMedia)

    if (accountMedia.size == 0) {
        owners.delete(context.sender)
    }

    designs.delete(token_id)

    xcc_market_burn(token_id)
}

export function nft_token(token_id: string): Media | null {
    return designs.getSome(token_id)
}

export function nft_total_supply(): string {
    return designs.length.toString()
}

export function nft_tokens(from_index: string = '0', limit: u8 = 0): Media[] {
    const start = <u32>parseInt(from_index)
    const end = <u32>(limit == 0 ? parseInt(nft_total_supply()) : limit) + start

    let entries: MapEntry<string, Media>[] = designs.entries(start, <u8>end)
    let tokens: Array<Media> = []

    for (let i = 0; i < entries.length; i++) {
        let entryValue = entries[i].value
        tokens.push(entryValue)
    }

    // xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_EXPLORE)

    return tokens
}

export function nft_supply_for_owner(account_id: string): string {
    const accountMedia = account_media.get(account_id)
    if (accountMedia == null || accountMedia.size == 0) {
        return '0'
    }
    return accountMedia.size.toString()
}

export function nft_tokens_for_owner(
    account_id: string,
    from_index: string = '0',
    limit: u8 = 0
): Media[] {
    const accountMedia = account_media.get(account_id)
    if (accountMedia == null || accountMedia.size == 0) {
        return []
    }
    const media = accountMedia.values()

    logging.log(media.length)

    let tokens: Array<Media> = []

    if (limit == 0) {
        limit = <u8>media.length
    }

    for (let i = parseInt(from_index); i < limit; i++) {
        let token = media.at(<i32>i)
        tokens.push(designs.getSome(token))
    }

    return tokens
}

/* Payouts */

export function nft_payout(
    token_id: string,
    balance: u128
    // max_len_payout: u32
): Payout {
    let token = designs.getSome(token_id)
    let owner_id = token.owner_id
    let total_perpetual = 0
    let payout: Payout = new Map()
    let royalty = token.royalty

    let royalty_sb_keys = token.royalty.split_between.keys()
    let royalty_sb_size = token.royalty.split_between.size

    // TODO assert gas is limited

    //go through each key and value in the royalty object

    for (let i = 0; i < royalty_sb_size; i++) {
        let key = royalty_sb_keys[i]
        if (key != owner_id) {
            let split = royalty.split_between.get(royalty_sb_keys[i])
            payout.set(key, royalty_to_payout(split, balance))
            total_perpetual += split
        }
    }

    payout.set(owner_id, royalty_to_payout(10000 - total_perpetual, balance))

    //return the payout object
    return payout
}

export function nft_transfer_payout(
    receiver_id: AccountId,
    token_id: string,
    approval_id: u64,
    balance: u128
    // max_len_payout: u32
): Payout {
    // assert_one_yocto()
    let payout = nft_payout(token_id, balance)
    nft_transfer(token_id, receiver_id) //TODO add approval_id
    return payout
}

/* nft_transfer */

export function nft_transfer(token_id: string, bidder: string): void {
    const design = designs.getSome(token_id)

    design.prev_owner = design.owner_id
    design.owner_id = bidder

    designs.set(token_id, design)
    owners.add(bidder)
    let accountMedia = account_media.get(bidder)
    if (!accountMedia) {
        accountMedia = new PersistentSet(bidder)
    }
    accountMedia.add(token_id)
    account_media.set(bidder, accountMedia)

    accountMedia = account_media.get(design.prev_owner)
    if (!accountMedia) {
        return
    }

    if (accountMedia.size == 0) {
        owners.delete(context.sender)
    }

    accountMedia.delete(token_id)
    account_media.set(design.prev_owner, accountMedia)
}

/* Approval system */

export function nft_approve(
    token_id: string,
    account_id: string,
    msg: string | null = null
): void {
    assert_at_least_one_yocto()
    const design = designs.getSome(token_id)
    assert(design != null, 'No design to approve.')
    assert(design.owner_id == context.sender, 'Only owner can approve.')
    const approval_id = design.next_approval_id

    const approvals = design.approvals.has(account_id)
    const new_approval = approvals ? false : true

    design.approvals.set(account_id, approval_id)

    const storage: u128 = u128.from(
        new_approval ? account_id.length + 4 + 8 : 0
    )
    design.next_approval_id += 1
    designs.set(token_id, design)

    refund_deposit(storage)

    if (msg) {
        const promiseArgs: NFTOnApprovedArgs = {
            token_id: token_id,
            owner_id: design.owner_id,
            approval_id: approval_id,
            msg: msg,
        }

        const promise = ContractPromise.create(
            token_id,
            'nft_on_approve',
            promiseArgs,
            context.prepaidGas - GAS_FOR_NFT_APPROVE,
            u128.Zero
        )

        promise.returnAsResult()
    }
}

export function nft_is_approved(
    token_id: string,
    approved_account_id: string,
    approval_id: string | null = null
): boolean {
    const design = designs.getSome(token_id)
    assert(design != null, 'No design to test approval.')
    const approval = design.approvals.has(approved_account_id)
    if (approval) {
        const approval = design.approvals.has(approved_account_id)
        if (approval_id) {
            const approval = design.approvals.get(approved_account_id)
            return approval == parseInt(approval_id)
        }
        return true
    }
    return false
}

export function nft_revoke(token_id: string, account_id: string): void {
    assert_one_yocto()
    const design = designs.getSome(token_id)
    assert(design != null, 'No design to revoke.')
    assert(design.owner_id == context.sender, 'Only owner can revoke.')
    if (design.approvals.get(account_id)) {
        refund_approved_account(account_id)
        design.approvals.delete(account_id)
        designs.set(token_id, design)
    }
}

export function nft_revoke_all(token_id: string): void {
    assert_one_yocto()
    const design = designs.getSome(token_id)
    assert(design != null, 'No design to revoke.')
    const sender = context.sender
    assert(design.owner_id == sender, 'Only owner can revoke.')

    if (design.approvals) {
        refund_approved_accounts(design.approvals)
        design.approvals.clear()
        designs.set(token_id, design)
    }
}

/* Market */

export function set_bid(
    token_id: string,
    amount: u128,
    bidder: string,
    recipient: string,
    sell_on_share: u16,
    currency: string = 'near'
): void {
    xcc_market_set_bid(
        token_id,
        amount,
        bidder,
        recipient,
        sell_on_share,
        currency
    )
}

export function remove_bid(token_id: string, bidder: string): void {
    xcc_market_remove_bid(token_id, bidder)
}

export function accept_bid(token_id: string, bidder: string): void {
    const design = designs.get(token_id)

    if (!design) {
        return
    }

    xcc_market_accept_bid(
        token_id,
        bidder,
        design.creator,
        design.owner_id,
        design.prev_owner
    )
}

/** Dangerous */

export function dangerous_wipe_designs(): void {
    assert(
        context.sender == 'ysn.testnet',
        'Only owner on testnet can wipe designs'
    )

    designs.clear()
}

/**
 * Init
 */

export const MARKET_CONTRACT_KEY = 'market_contract'
export const GENERATOR_CONTRACT_KEY = 'generator_contract'
export const METADATA_KEY = 'contract_metadata'

export function init(
    contract_metadata: NFTContractMetadata,
    market_contract: AccountId,
    generator_contract: AccountId = ''
): void {
    assert(storage.get<string>('init') == null, 'Already initialized')

    storage.set(MARKET_CONTRACT_KEY, market_contract)

    storage.set(GENERATOR_CONTRACT_KEY, generator_contract)

    storage.set(
        METADATA_KEY,
        new NFTContractMetadata(
            contract_metadata.spec,
            contract_metadata.name,
            contract_metadata.symbol,
            contract_metadata.icon,
            contract_metadata.base_uri,
            contract_metadata.reference,
            contract_metadata.reference_hash,
            contract_metadata.packages_script,
            contract_metadata.render_script,
            contract_metadata.style_css,
            contract_metadata.parameters
        )
    )

    storage.set('init', 'done')
}

export function nft_metadata(): NFTContractMetadata {
    return storage.getSome<NFTContractMetadata>(METADATA_KEY)
}

/** Generate */

export function generate(): void {
    xcc_generator_generate()
}
