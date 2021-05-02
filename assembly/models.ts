import { context, PersistentMap, PersistentSet } from "near-sdk-as";
import { NFTContractMetadataType } from "./types"

type AccountId = string;

export const NFTContractMetadata : NFTContractMetadataType = {
    spec: "nft-1.0.0",
    name: "Share",
    symbol: "SHARE",
    icon: null,
    base_uri: null,
    reference: null,
    reference_hash: null,
}

@nearBindgen
export class Design {
    owner: string;
    constructor(
        public instructions: Array<i32>,
        public seed: i32, 
    ) {
        this.owner = context.sender;
    }
}

export const designs = new PersistentMap<AccountId, Design>("dsgn");

export const owners = new PersistentSet<AccountId>("onrs")