import { PersistentMap, u128 } from "near-sdk-as";

const FT_SPEC = "ft-1.0.0";
const FT_NAME = "Ysn";
const FT_SYMBOL = "YSN";
const FT_DECIMALS : u8 = 24;


@nearBindgen
export class FTContractMetadata {
    spec: string = FT_SPEC;
    name: string = FT_NAME;
    symbol: string = FT_SYMBOL;
    icon: string;
    reference: string;
    reference_hash: string;
    decimals: u8 = FT_DECIMALS;
}

export const balances = new PersistentMap<string, u128>("bln");