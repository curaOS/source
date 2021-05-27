import { storage } from 'near-sdk-as';
import { AccountId } from "./models";

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