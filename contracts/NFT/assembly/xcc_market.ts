import { u128, ContractPromise, context, storage } from 'near-sdk-as'
import { MARKET_CONTRACT_KEY } from '.'

const XCC_MARKET_SET_BID_SHARES_GAS = 25000000000000
const XCC_MARKET_ACCEPT_BID_SHARES_GAS = 150000000000000
const XCC_MARKET_BURN_GAS = 25000000000000
const XCC_MARKET_REMOVE_BID_SHARES_GAS = 25000000000000

/**
 * market.set_bid_shares
 */

@nearBindgen
export class MarketSetBidSharesArgs {
    token_id: string
    prev_owner: u16
    creator: u16
    owner: u16
}

export function xcc_market_set_bid_shares(
    token_id: string,
    prev_owner: u16,
    creator: u16,
    owner: u16
): void {
    const mediaContract = storage.getSome<string>(MARKET_CONTRACT_KEY)
    const remoteMethod = 'set_bid_shares'

    let remoteMethodArgs: MarketSetBidSharesArgs = {
        token_id: token_id,
        prev_owner: prev_owner,
        creator: creator,
        owner: owner,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_SET_BID_SHARES_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}

/**
 * market.set_bid
 */
@nearBindgen
export class MarketSetBidArgs {
    token_id: string
    amount: u128
    bidder: string
    recipient: string
    sell_on_share: u16
    currency: string = 'near'
}

export function xcc_market_set_bid(
    token_id: string,
    amount: u128,
    bidder: string,
    recipient: string,
    sell_on_share: u16,
    currency: string = 'near'
): void {
    const mediaContract = storage.getSome<string>(MARKET_CONTRACT_KEY)
    const remoteMethod = 'set_bid'

    let remoteMethodArgs: MarketSetBidArgs = {
        token_id: token_id,
        amount: amount,
        bidder: bidder,
        recipient: recipient,
        sell_on_share: sell_on_share,
        currency: currency,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_SET_BID_SHARES_GAS,
        context.attachedDeposit
    )

    promise.returnAsResult()
}

/**
 * market.remove_bid
 */
@nearBindgen
export class MarketRemoveBidArgs {
    token_id: string
    bidder: string
}

export function xcc_market_remove_bid(token_id: string, bidder: string): void {
    const mediaContract = storage.getSome<string>(MARKET_CONTRACT_KEY)
    const remoteMethod = 'remove_bid'

    let remoteMethodArgs: MarketRemoveBidArgs = {
        token_id: token_id,
        bidder: bidder,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_REMOVE_BID_SHARES_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}

/**
 * market.accept_bid
 */
@nearBindgen
export class MarketAcceptBidArgs {
    token_id: string
    bidder: string
    creator: string
    owner: string
    prev_owner: string
}

export function xcc_market_accept_bid(
    token_id: string,
    bidder: string,
    creator: string,
    owner: string,
    prev_owner: string
): void {
    const mediaContract = storage.getSome<string>(MARKET_CONTRACT_KEY)
    const remoteMethod = 'accept_bid'

    let remoteMethodArgs: MarketAcceptBidArgs = {
        token_id: token_id,
        bidder: bidder,
        creator: creator,
        owner: owner,
        prev_owner: prev_owner,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_ACCEPT_BID_SHARES_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}

/**
 * market.burn
 */
@nearBindgen
export class MarketBurnArgs {
    token_id: string
}

export function xcc_market_burn(token_id: string): void {
    const mediaContract = storage.getSome<string>(MARKET_CONTRACT_KEY)
    const remoteMethod = 'burn'

    let remoteMethodArgs: MarketBurnArgs = {
        token_id: token_id,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_BURN_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}
