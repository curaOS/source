import { context, PersistentMap, PersistentSet } from "near-sdk-as";

type AccountId = string;

@nearBindgen
export class NFTContractMetadata {
    spec: string = "nft-1.0.0";
    name: string = "Share";
    symbol: string = "SHARE";
    icon: string;
    base_uri: string;
    reference: string;
    reference_hash: string;
}

@nearBindgen
export class Design {
    id: string;
    owner_id: string;
    constructor(
        public instructions: Array<i32>,
        public seed: i32, 
    ) {
        this.id = context.sender;
        this.owner_id = context.sender;
    }
}


export const designs = new PersistentMap<AccountId, Design>("dsgn");

export const owners = new PersistentSet<AccountId>("onrs")