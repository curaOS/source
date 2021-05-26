import { context, PersistentMap, PersistentSet, u128 } from "near-sdk-as";

type AccountId = string;
type CurrencyId = string;

const NFT_SPEC = "nft-1.0.0";
const NFT_NAME = "Share";
const NFT_SYMBOL = "SHARE";


const ONE_NEAR = u128.from('1000000000000000000000000');

export const DESIGN_PRICE = ONE_NEAR;

export const ROYALTY_MAX_PERCENTAGE : u32 = 5000; // 50%

export const FT_CONTRACT : string = "v1.ysn.testnet";
const FT_CONTRACT_ROYALTY : u32 = 2500; // 25%

const ONE_HUNDRED_PERCENT : u32 = 10000; // 100%
const ZERO_PERCENT : u32 = 0; // 0%

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
        public copies: u8 = 1,
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
        public instructions: string = "",
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
export class Bid {
    amount: u128;
    currency: CurrencyId = "near";
    bidder : AccountId;
    recipient : AccountId;
    sell_on_share : u32;
    constructor() { }
}

@nearBindgen
export class BidShares {
    prev_owner: Map<AccountId, u32> = new Map(); // previous owner split (sell-on fee)
    owner: Map<AccountId, u32> = new Map(); // owner splits
    constructor(royalty_percentage : u32 = 0) {
        this.prev_owner.set(context.sender, ZERO_PERCENT);  /** 0% minus perpetual royalties of future sales goes to reseller(s) on first sale */
        this.owner.set(context.sender, ONE_HUNDRED_PERCENT - royalty_percentage);  /** 100% minus perpetual royalties of future sales goes to creator(s) on first sale */
    }
}

@nearBindgen
export class Ask {
    amount : u128; // Amount asked
    currency: CurrencyId = "near"; // currency of ask, default is NEAR
    sell_on_share : u32; // % to pay to previous owner on this sale
    constructor() { }
}


@nearBindgen
export class Market {
    bid_shares: BidShares;
    ask: Ask;
    bids:  Map<AccountId, Bid> = new Map();
    constructor(royalty_percentage : u32 = 0) {
        this.bid_shares = new BidShares(royalty_percentage);
    }
}

@nearBindgen
export class Design {
    id: string;
    owner_id: string;
    metadata: TokenMetadata;
    royalty: Royalty;
    market: Market;
    constructor(
        instructions: string,
        seed: i32, 
    ) {
        this.id = context.sender;
        this.owner_id = context.sender;

        this.royalty = new Royalty();

        // pass it to market to make sure that on mint royalties add up to 100%
        const royalty_percentage = this.royalty.percentage;

        this.market = new Market(royalty_percentage);
       
        const title = `${seed}`; 
        const issued_at = context.blockTimestamp.toString();
        const copies : u8 = 1;

        const extra = (new Extra(instructions)).encode();

        this.metadata = new TokenMetadata(title, issued_at, copies, extra);

    }


}

@nearBindgen
export class TemporaryDesign {
    constructor(
        public instructions: string,
        public seed: i32, 
    ) { }
}


export const designs = new PersistentMap<AccountId, Design>("dsgn");
export const owners = new PersistentSet<AccountId>("onrs");