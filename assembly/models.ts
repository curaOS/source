import { context, logging, PersistentMap, PersistentSet } from "near-sdk-as";

type AccountId = string;

const NFT_SPEC = "nft-1.0.0";
const NFT_NAME = "Share";
const NFT_SYMBOL = "SHARE";

export const ROYALTY_MAX_PERCENTAGE : u16 = 5000; // 50%

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
        public extra: Uint8Array = new Uint8Array(0), 
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
class Extra {
    constructor(
        public instructions: Array<i32> = [],
    ) {}
}

@nearBindgen
export class Royalty {
    split_between: Map<AccountId, u16> = new Map();
    percentage: u16 = 0;
    constructor() {
        const stakersValues : Array<string> =  stakers.values();
        const sameSplit = <u16>Math.floor(ROYALTY_MAX_PERCENTAGE / stakers.size);

        for (let i = 0; i < stakers.size; i++) {
            this.split_between.set(stakersValues[i], sameSplit);
        }

        this.percentage = <u16>(sameSplit * stakers.size);
    }
  }

@nearBindgen
export class Design {
    id: string;
    owner_id: string;
    metadata: TokenMetadata;
    royalty: Royalty;
    constructor(
        instructions: Array<i32>,
        public seed: i32, 
    ) {
        this.id = context.sender;
        this.owner_id = context.sender;

        this.royalty = new Royalty();
       
        const title = `${seed}`; 
        const issued_at = context.blockTimestamp.toString();
        const copies : number = 1;

        const extra = (new Extra(instructions)).encode();

        this.metadata = new TokenMetadata(title, issued_at, copies, extra);

    }
}


export const designs = new PersistentMap<AccountId, Design>("dsgn");
export const owners = new PersistentSet<AccountId>("onrs");

export const stakers = new PersistentSet<AccountId>("stkr");