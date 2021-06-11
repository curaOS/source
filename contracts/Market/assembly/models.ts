import { context, PersistentMap, u128 } from 'near-sdk-as'

export type AccountId = string
export type CurrencyId = string
export type TokenId = string

/**
 * Structures
 *  - Bid
 *  - BidShares
 *  - Ask
 */

export type Bids = Map<AccountId, Bid>
export type BidsByToken = Map<TokenId, Bid>

@nearBindgen
export class Bid {
    constructor(
        public amount: u128,
        public bidder: AccountId,
        public recipient: AccountId,
        public sell_on_share: u16,
        public currency: CurrencyId = 'near'
    ) {}
}

@nearBindgen
export class BidShares {
    constructor(
        public prev_owner: u16,
        public creator: u16,
        public owner: u16
    ) {}
}

@nearBindgen
export class Ask {
    amount: u128 // Amount asked
    currency: CurrencyId = 'near' // currency of ask, default is NEAR
    sell_on_share: u16 // % to pay to previous owner on this sale
    constructor() {}
}

/**
 * Store
 */

export const token_bidders = new PersistentMap<TokenId, Bids>('bdrs')
export const bid_shares = new PersistentMap<TokenId, BidShares>('shrs')
export const token_asks = new PersistentMap<TokenId, Ask>('asks')

/* Bidders bids */
export const bidders_bids = new PersistentMap<AccountId, BidsByToken>('bbds')
