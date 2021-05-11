import { PersistentMap } from "near-sdk-as";

const FT_SPEC = "ft-1.0.0";
const FT_NAME = "Yassine";
const FT_SYMBOL = "YSN";
const FT_DECIMALS = 24;

@nearBindgen
export class FTContractMetadata {
    spec: string = FT_SPEC;
    name: string = FT_NAME;
    symbol: string = FT_SYMBOL;
    icon: string;
    reference: string;
    reference_hash: string;
    decimals: number = FT_DECIMALS;
}

const balances = new PersistentMap<string, u64>("b:");
const approves = new PersistentMap<string, u64>("a:");