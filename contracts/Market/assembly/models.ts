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
    prev_owner: Map<AccountId, u32> = new Map(); // previous owner split (sell-on fee)
    owner: Map<AccountId, u32> = new Map(); // owner splits
    constructor(royalty_percentage : u32 = 0) {
        this.prev_owner.set(context.sender, ZERO_PERCENT);  /** 0% minus perpetual royalties of future sales goes to reseller(s) on first sale */
        this.owner.set(context.sender, ONE_HUNDRED_PERCENT - royalty_percentage);  /** 100% minus perpetual royalties of future sales goes to creator(s) on first sale */
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