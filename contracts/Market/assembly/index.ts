import { storage } from 'near-sdk-as';
import { AccountId, bid_shares, BidShares } from "./models";

/** 
 * Init
 */

// The media contract that can call this market
export const MEDIA_CONTRACT_KEY = "media_contract";

export function set_bid_shares(
    token_id: string,
    prev_owner: u16,
    creator: u16,
    owner: u16,
): void {
    const new_bid_shares = new BidShares(prev_owner, creator, owner);
    bid_shares.set(token_id, new_bid_shares);

}


export function init(media_contract: AccountId): void {
    assert(storage.get<string>("init") == null, "Already initialized");
  
    storage.set(MEDIA_CONTRACT_KEY, media_contract);
  
    storage.set("init", "done");
  }