import { u128, ContractPromise, context } from 'near-sdk-as'

const XCC_MARKET_SET_BID_SHARES_GAS = 25000000000000;

/**
 * TODO move to init
 */
const MARKET_CONTRACT = "market.v1.share.ysn.testnet";

/**
 * market.set_bid_shares
 */

@nearBindgen
export class MarketSetBidSharesArgs {
    token_id: string;
    prev_owner: u16;
    creator: u16;
    owner: u16;
}

export function xcc_market_set_bid_shares(
    token_id: string,
    prev_owner: u16,
    creator: u16,
    owner: u16,
): void {
    const remoteMethod = "set_bid_shares";

    let remoteMethodArgs: MarketSetBidSharesArgs = {
        token_id: token_id,
        prev_owner: prev_owner,
        creator: creator,
        owner: owner,
    };

    const promise = ContractPromise.create(
        MARKET_CONTRACT,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_SET_BID_SHARES_GAS,
        u128.Zero
    )
      
    promise.returnAsResult();
}

/**
 * market.set_bid
 */
@nearBindgen
export class MarketSetBidArgs {
    token_id: string;
    amount: u128;
    bidder : string;
    recipient : string;
    sell_on_share : u32;
    currency: string = "near";
}

export function xcc_market_set_bid(
    token_id: string,
    amount: u128,
    bidder: string,
    recipient: string,
    sell_on_share: u32,
    currency: string = "near",
): void {
    const remoteMethod = "set_bid";

    let remoteMethodArgs: MarketSetBidArgs = {
        token_id: token_id,
        amount: amount,
        bidder: bidder,
        recipient: recipient,
        sell_on_share: sell_on_share,
        currency: currency,
    };

    const promise = ContractPromise.create(
        MARKET_CONTRACT,
        remoteMethod,
        remoteMethodArgs,
        XCC_MARKET_SET_BID_SHARES_GAS,
        context.attachedDeposit, 
    )
      
    promise.returnAsResult();
}