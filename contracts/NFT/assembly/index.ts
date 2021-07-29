import {
    logging,
    RNG,
    context,
    u128,
    ContractPromise,
    PersistentSet,
    MapEntry,
    storage,
} from 'near-sdk-as'
import { generate } from './generate'
import {
    Media,
    TemporaryMedia,
    designs,
    owners,
    account_media,
    DESIGN_PRICE,
    FT_CONTRACT,
} from './models'
import { NFTContractMetadata } from './metadata'
import {
    xcc_market_set_bid_shares,
    xcc_market_set_bid,
    xcc_market_remove_bid,
    xcc_market_accept_bid,
    xcc_market_burn,
} from './xcc_market'
import { assert_deposit_attached } from './asserts'

// 🟣 = 128995
// 🟡️ = 128993
// ⚫️ = 9899
// ⭕️ = 11093
// 🔘 = 128280
// ⚪️ = 9898

const SCHEMA_SIZE: i8 = 5
const defaultCodePoints: Array<u32> = [128995, 128993, 9899, 11093, 128280]

const XCC_FT_MINE_TO_GAS = 25000000000000

const ONE_YSN = u128.from('1000000000000000000000000')

export const ROYALTY_PERCENTAGE: u16 = 2500 // 25%
const OWNER_PERCENTAGE: u16 = 7500 // 75%

const YSN_FOR_DESIGN = u128.div(ONE_YSN, u128.from(10)) // 0.1 YSN
const YSN_FOR_CLAIM = u128.div(ONE_YSN, u128.from(1)) // 1 YSN
const YSN_FOR_EXPLORE = u128.div(ONE_YSN, u128.from(20)) // 0.05 YSN

export function claim_media(media: string): Media {
    assert_deposit_attached(DESIGN_PRICE)

    /** Assert uniqueId is actually unique */

    let design = new Media(media)

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

export function view_media(): Media {
    let accountMedia = account_media.getSome(context.sender)
    let media = accountMedia.values().at(0)

    return designs.getSome(media)
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

export function design(
    seed: i32 = 0,
    schema: Array<u32> = defaultCodePoints
): TemporaryMedia {
    assert(schema.length == SCHEMA_SIZE, 'Wrong schema size dimension.')

    if (seed == 0) {
        seed = <i32>randomNum()
        logging.log(
            `\n\n\tCall claim_media with the seed number ${seed} to claim it.\n`
        )
    }

    let instructions = generate(seed, schema)

    let design = new TemporaryMedia(instructions.toString(), seed)

    // logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_DESIGN)

    return design
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
    return owners.has(account_id) ? '1' : '0'
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

function randomNum(max: u32 = <u32>context.blockIndex): u32 {
    const rng = new RNG<u32>(1, max)
    return rng.next()
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

/* XCC ft_mine_to */

@nearBindgen
class FTMineToArgs {
    account_id: string
    amount: u128
}

function xcc_ft_mine_to_and_transfer(
    account_id: string,
    amount: u128,
    near_amount_to_deposit: u128 = u128.Zero
): void {
    const remoteMethod = 'ft_mine_to'

    let remoteMethodArgs: FTMineToArgs = {
        account_id: account_id,
        amount: amount,
    }

    const promise = ContractPromise.create(
        FT_CONTRACT,
        remoteMethod,
        remoteMethodArgs,
        XCC_FT_MINE_TO_GAS,
        near_amount_to_deposit
    )

    promise.returnAsResult()
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
export const METADATA_KEY = 'contract_metadata'

export function init(
    contract_metadata: NFTContractMetadata,
    market_contract: string
): void {
    assert(storage.get<string>('init') == null, 'Already initialized')

    storage.set(MARKET_CONTRACT_KEY, market_contract)

    storage.set(
        METADATA_KEY,
        new NFTContractMetadata(
            contract_metadata.spec,
            contract_metadata.name,
            contract_metadata.symbol,
            contract_metadata.icon,
            contract_metadata.base_uri,
            contract_metadata.reference,
            contract_metadata.reference_hash
        )
    )

    storage.set('init', 'done')
}

export function nft_metadata(): NFTContractMetadata {
    return storage.getSome(METADATA_KEY)
}
