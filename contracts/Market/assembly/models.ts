import { context, PersistentMap, u128 } from "near-sdk-as";

export type AccountId = string;
type CurrencyId = string;
type TokenId = string;

type Bids = Map<AccountId, Bid>;

const ONE_HUNDRED_PERCENT : u32 = 10000; // 100%
const ZERO_PERCENT : u32 = 0; // 0%

/**
 * Structures
 *  - Bids
 *  - BidShares
 *  - Ask
 */

@nearBindgen
export class Bid {
    amount: u128;
    currency: CurrencyId = "near";
    bidder : AccountId;
    recipient : AccountId;
    sell_on_share : u32;
    constructor() { }
}

@nearBindgen
export class BidShares {
    constructor(public prev_owner : u16, public creator : u16, public owner : u16) {
    }
}

@nearBindgen
export class Ask {
    amount : u128; // Amount asked
    currency: CurrencyId = "near"; // currency of ask, default is NEAR
    sell_on_share : u32; // % to pay to previous owner on this sale
    constructor() { }
}


/**
 * Store
 */

export const token_bidders = new PersistentMap<TokenId, Bids>("bdrs");
export const bid_shares = new PersistentMap<TokenId, BidShares>("shrs");
export const token_asks = new PersistentMap<TokenId, Ask>("asks");