import { context, PersistentMap, PersistentSet } from "near-sdk-as";

type AccountId = string;

const NFT_SPEC = "nft-1.0.0";
const NFT_NAME = "Share";
const NFT_SYMBOL = "SHARE";

@nearBindgen
export class NFTContractMetadata {
    spec: string = NFT_SPEC;
    name: string = NFT_NAME;
    symbol: string = NFT_SYMBOL;
    icon: string;
    base_uri: string;
    reference: string;
    reference_hash: string;
}

@nearBindgen
class TokenMetadata {
    constructor(
        public title: string = "",
        public issued_at: string = "",
        public copies: number = 1,
        public extra: string = "", 
        public description: string = "",
        public media: string = "",
        public media_hash: string = "",
        public expires_at: string = "",
        public starts_at: string = "",
        public updated_at: string = "",
        public reference: string = "",
        public reference_hash: string = "",
    ) {}
  }

@nearBindgen
export class Design {
    id: string;
    owner_id: string;
    metadata: TokenMetadata;
    constructor(
        instructions: Array<i32>,
        public seed: i32, 
    ) {
        this.id = context.sender;
        this.owner_id = context.sender;

       
        const title = `${seed}`; 
        const issued_at = context.blockTimestamp.toString();
        const copies : number = 1;
        const extra = `"{'instructions': '${instructions}'}"`;

        this.metadata = new TokenMetadata(title, issued_at, copies, extra);

    }
}


export const designs = new PersistentMap<AccountId, Design>("dsgn");

export const owners = new PersistentSet<AccountId>("onrs")