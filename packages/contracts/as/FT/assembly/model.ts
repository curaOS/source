import { PersistentMap, u128 } from 'near-sdk-as'

const FT_SPEC = 'ft-1.0.0'
const FT_NAME = 'Ft'
const FT_SYMBOL = 'FT'
const FT_DECIMALS: u8 = 24

@nearBindgen
export class FTContractMetadata {
    constructor(
        public spec: string = FT_SPEC,
        public name: string = FT_NAME,
        public symbol: string = FT_SYMBOL,
        public icon: string = '',
        public reference: string = '',
        public reference_hash: string = '',
        public decimals: u8 = FT_DECIMALS
    ) {}
}

export const balances = new PersistentMap<string, u128>('bln')
