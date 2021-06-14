import {
    logging,
    RNG,
    context,
    u128,
    ContractPromise,
    PersistentSet,
} from 'near-sdk-as'
import { generate } from './generate'
import {
    Design,
    TemporaryDesign,
    designs,
    owners,
    account_media,
    DESIGN_PRICE,
    FT_CONTRACT,
} from './models'
import { NFTContractMetadata } from './models'
import {
    xcc_market_set_bid_shares,
    xcc_market_set_bid,
    xcc_market_remove_bid,
    xcc_market_accept_bid,
    xcc_market_burn,
} from './xcc_market'

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

const ROYALTY_PERCENTAGE: u16 = 2500 // 25%
const OWNER_PERCENTAGE: u16 = 7500 // 75%

const YSN_FOR_DESIGN = u128.div(ONE_YSN, u128.from(10)) // 0.1 YSN
const YSN_FOR_CLAIM = u128.div(ONE_YSN, u128.from(1)) // 1 YSN
const YSN_FOR_EXPLORE = u128.div(ONE_YSN, u128.from(20)) // 0.05 YSN

export function claim_media(
    seed: i32,
    schema: Array<u32> = defaultCodePoints
): Design {
    assert(schema.length == SCHEMA_SIZE, 'Wrong schema size dimension.')
    assert(seed >= 0, 'Seed needs to be valid.')
    assert(
        u128.eq(context.attachedDeposit, DESIGN_PRICE),
        'Deposit is one NEAR.'
    )
    assert(!owners.has(context.sender), 'You can only own one design.')

    let instructions = generate(seed, schema)
    let design = new Design(instructions.toString(), seed)

    owners.add(context.sender)

    designs.set(design.id, design)

    let accountMedia = account_media.get(context.sender)
    if (!accountMedia) {
        accountMedia = new PersistentSet(context.sender)
    }
    accountMedia.add(design.id)
    account_media.set(context.sender, accountMedia)

    // FT
    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_CLAIM, DESIGN_PRICE)
    // Market
    xcc_market_set_bid_shares(
        design.id,
        0,
        ROYALTY_PERCENTAGE,
        OWNER_PERCENTAGE
    )

    return design
}

export function view_media(): Design {
    let accountMedia = account_media.getSome(context.sender)
    let media = accountMedia.values().at(0)

    return designs.getSome(media)
}

export function burn_design(): void {
    assert(owners.has(context.sender), 'No design to burn here.')

    const accountMedia = account_media.get(context.sender)
    if (!accountMedia) {
        return
    }
    const media = accountMedia.values().at(0)
    accountMedia.delete(media)
    account_media.set(context.sender, accountMedia)

    owners.delete(context.sender)
    designs.delete(media)

    xcc_market_burn(media)
}

export function design(
    seed: i32 = 0,
    schema: Array<u32> = defaultCodePoints
): TemporaryDesign {
    assert(schema.length == SCHEMA_SIZE, 'Wrong schema size dimension.')

    if (seed == 0) {
        seed = <i32>randomNum()
        logging.log(
            `\n\n\tCall claim_media with the seed number ${seed} to claim it.\n`
        )
    }

    let instructions = generate(seed, schema)

    let design = new TemporaryDesign(instructions.toString(), seed)

    // logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_DESIGN)

    return design
}

export function nft_token(token_id: string): Design | null {
    return designs.getSome(token_id)
}

export function nft_metadata(): NFTContractMetadata {
    // TODO move to init
    return new NFTContractMetadata()
}

export function nft_total_supply(): string {
    return designs.length.toString()
}

export function nft_tokens(from_index: string = '0', limit: u8 = 0): Design[] {
    const start = <u32>parseInt(from_index)
    const end = (limit > 0 ? parseInt(nft_total_supply()) : limit) + start

    const ownersValues: Array<string> = owners.values()

    let tokens: Array<Design> = []

    for (let i = start; i < end; i++) {
        let accountMedia = account_media.getSome(ownersValues[i])
        let media = accountMedia.values().at(0)
        tokens.push(designs.getSome(media))
    }

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_EXPLORE)

    return tokens
}

export function nft_supply_for_owner(account_id: string): string {
    return owners.has(account_id) ? '1' : '0'
}

export function nft_tokens_for_owner(
    account_id: string,
    from_index: string = '0',
    limit: u8 = 0
): Design[] {
    limit = 1
    const accountMedia = account_media.get(account_id)
    if (!accountMedia) {
        return []
    }
    const media = accountMedia.values().at(0)
    return owners.has(account_id) ? [designs.getSome(media)] : []
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

    owners.delete(context.sender)

    accountMedia = account_media.get(design.prev_owner)
    if (!accountMedia) {
        return
    }
    const media = accountMedia.values().at(0)
    accountMedia.delete(media)
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
