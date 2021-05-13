import { context, logging, PersistentMap, PersistentSet, u128, util } from "near-sdk-as";

type AccountId = string;

const NFT_SPEC = "nft-1.0.0";
const NFT_NAME = "Share";
const NFT_SYMBOL = "SHARE";


const ONE_NEAR = u128.from('1000000000000000000000000');
const FIFTY_NEAR = u128.mul(ONE_NEAR, u128.from(50)); // 50

export const DESIGN_PRICE = ONE_NEAR;

export const ROYALTY_MAX_PERCENTAGE : u32 = 5000; // 50%

export const FT_CONTRACT : string = "ysn.ys24.testnet";
const FT_CONTRACT_ROYALTY : u32 = 2500; // 25%

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
export class Extra {
    constructor(
        public instructions: Array<i32> = [],
    ) { }
}

@nearBindgen
export class Royalty {
    split_between: Map<AccountId, u32> = new Map();
    percentage: u32 = 0;
    constructor() {
        /** 25% of future sales goes to FT */
        this.split_between.set(FT_CONTRACT, FT_CONTRACT_ROYALTY);
        this.percentage = FT_CONTRACT_ROYALTY;
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
        seed: i32, 
    ) {
        this.id = context.sender;
        this.owner_id = context.sender;

        this.royalty = new Royalty();
       
        const title = `${seed}`; 
        const issued_at = context.blockTimestamp.toString();
        const copies : number = 1;

        const extra = (new Extra(instructions)).encode();

        logging.log(util.parseFromBytes<Extra>(extra));

        this.metadata = new TokenMetadata(title, issued_at, copies, extra);

    }


}


export const designs = new PersistentMap<AccountId, Design>("dsgn");
export const owners = new PersistentSet<AccountId>("onrs");