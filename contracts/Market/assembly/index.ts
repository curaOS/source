import { storage, u128 } from 'near-sdk-as';
import { AccountId, CurrencyId, bid_shares, token_bidders, BidShares, Bid } from "./models";


export function set_bid_shares(
    token_id: string,
    prev_owner: u16,
    creator: u16,
    owner: u16,
): void {
    const new_bid_shares = new BidShares(prev_owner, creator, owner);
    bid_shares.set(token_id, new_bid_shares);

}

export function set_bid(
    token_id: string,
    amount: u128,
    bidder : AccountId,
    recipient : AccountId,
    sell_on_share : u32,
    currency: CurrencyId = "near",
): void {
    let bidders = token_bidders.get(token_id);
    
    if (!bidders) {
        bidders = new Map();
    } 

    const new_bid = new Bid(amount, bidder, recipient, sell_on_share, currency);
    
    bidders.set(bidder, new_bid);
    
    token_bidders.set(token_id, bidders);
}

/** 
 * Init
 */

// The media contract that can call this market
export const MEDIA_CONTRACT_KEY = "media_contract";

export function init(media_contract: AccountId): void {
    assert(storage.get<string>("init") == null, "Already initialized");
  
    storage.set(MEDIA_CONTRACT_KEY, media_contract);
  
    storage.set("init", "done");
  }