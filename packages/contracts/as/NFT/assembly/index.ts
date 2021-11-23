import {
    logging,
    context,
    u128,
    ContractPromise,
    ContractPromiseBatch,
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
    StorageBalance,
    StorageBalanceBounds,
    accounts,
    FT_CONTRACT,
<<<<<<< HEAD
    GAS_FOR_NFT_APPROVE,
    NFTOnApprovedArgs,
=======
    storage_usage,
>>>>>>> Storage management initial code
} from './models'
import { NFTContractMetadata, TokenMetadata } from './metadata'
import {
    xcc_market_set_bid_shares,
    xcc_market_set_bid,
    xcc_market_remove_bid,
    xcc_market_accept_bid,
    xcc_market_burn,
} from './xcc_market'
<<<<<<< HEAD
import {
    assert_deposit_attached,
    assert_one_yocto,
    assert_at_least_one_yocto,
} from './asserts'
=======
import { assert_deposit_attached, assert_one_yocto } from './asserts'
>>>>>>> Storage management initial code
import { AccountId } from '../../utils'
import { xcc_generator_generate } from './xcc_generator'
import {
    refund_deposit,
    refund_approved_account,
    refund_approved_accounts,
} from './internal_functions'

export const ROYALTY_PERCENTAGE: u16 = 2500 // 25%
const OWNER_PERCENTAGE: u16 = 7500 // 75%

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
    
/* Storage management */


function internal_storage_balance_of(account_id: string): StorageBalance {
    return <StorageBalance>{total: storage_balance_bounds().min, available: '0'}
}

function storage_byte_cost(): u128 {
    const num = u128.from(10000000000000000000)
    return num
}

export function storage_deposit(account_id: string|null, registration_only: Boolean|null=null): StorageBalance {
    const amount = context.attachedDeposit
    if (account_id == null)
        account_id = context.sender
    account_id = account_id as string
    if (accounts.contains(account_id)) {
        logging.log('Account already registered')
        if (u128.gt(amount, u128.from('0'))) {
            ContractPromiseBatch.create(account_id).transfer(amount)
        }
    } else {
        const minBalance = u128.from(storage_balance_bounds().min)
        assert(amount >= minBalance, 'Attached deposit less than minimum required')
        accounts.set(account_id, u128.from('0'))
        const refund = u128.sub(amount, minBalance)
        if (u128.gt(refund, u128.from('0'))) {
            ContractPromiseBatch.create(account_id).transfer(refund)
        }
    }
    return internal_storage_balance_of(account_id)
}

export function storage_withdraw(amount: string|null): StorageBalance  {
    assert_one_yocto()
    const account_id = context.sender
    const account = accounts.getSome(account_id)
    assert (account, 'Account not registered')
    const balance = internal_storage_balance_of(account_id)

    if (amount)
        assert(u128.gt(u128.from(amount as string), u128.from('0')), 'The amount is greater than available storage balance')

    return balance;
}

export function storage_unregister(force: Boolean|null=null): boolean {
    assert_one_yocto()
    const account_id = context.sender
    const account = accounts.getSome(account_id)
    if (account) {
        const balance = accounts.getSome(account_id)
        if (u128.eq(balance, u128.from('0')) || force) {
            accounts.delete(account_id)
            ContractPromiseBatch.create(account_id).transfer(u128.add(u128.from(storage_balance_bounds().min), u128.from(1)))
            return true
        } else {
            assert(false, 'Account balance is not zero')
        }
    } 
    return false;
}

export function storage_balance_bounds(): StorageBalanceBounds {
    const cost = u128.mul(storage_usage, storage_byte_cost())
    return <StorageBalanceBounds>{min: cost.toString(), max: cost.toString()}
}

export function storage_balance_of(account_id: string): StorageBalance|null {
    return internal_storage_balance_of(account_id);
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
