import { u128, ContractPromise } from 'near-sdk-as'

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