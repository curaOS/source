import { context, logging, PersistentMap, PersistentSet, u128 } from "near-sdk-as";

type AccountId = string;

const NFT_SPEC = "nft-1.0.0";
const NFT_NAME = "Share";
const NFT_SYMBOL = "SHARE";


const ONE_NEAR = u128.from('1000000000000000000000000');
const FIFTY_NEAR = u128.mul(ONE_NEAR, u128.from(50)); // 50

export const SHARE_PRICE = FIFTY_NEAR;
export const DESIGN_PRICE = ONE_NEAR;

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
    type: string = "design";
    value: u128 = u128.Zero;
    constructor(
        public instructions: Array<i32> = [],
        type: string = "design",
    ) {
        if (type == "share") {
            this.value = FIFTY_NEAR;
            this.type = type;
        } else if (type == "design") {
            this.value = ONE_NEAR;
            this.type = type;
        }
    }
}

@nearBindgen
export class Royalty {
    split_between: Map<AccountId, u16> = new Map();
    percentage: u16 = 0;
    constructor(type: string) {
        if (type == "share") {
            // keep default values
        } else if (type == "design") {
            const stakersValues : Array<string> =  stakers.values();
            const sameSplit = <u16>Math.floor(ROYALTY_MAX_PERCENTAGE / stakers.size);
    
            for (let i = 0; i < stakers.size; i++) {
                this.split_between.set(stakersValues[i], sameSplit);
            }

            this.percentage = <u16>(sameSplit * stakers.size)
        }

;
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
        let type : string = "none";

        if (u128.eq(context.attachedDeposit, SHARE_PRICE)) {
            type = "share";
        } else if (u128.eq(context.attachedDeposit, DESIGN_PRICE)) {
            type = "design";
        }

        assert((type == "share" || type == "design"), 'Wrong amount.');

        this.id = context.sender;
        this.owner_id = context.sender;


        this.royalty = new Royalty(type);

       
        const title = `${seed}`; 
        const issued_at = context.blockTimestamp.toString();
        const copies : number = 1;

        const extra = (new Extra(instructions, type)).encode();

        this.metadata = new TokenMetadata(title, issued_at, copies, extra);

    }
}


export const designs = new PersistentMap<AccountId, Design>("dsgn");
export const owners = new PersistentSet<AccountId>("onrs");

export const stakers = new PersistentSet<AccountId>("stkr");