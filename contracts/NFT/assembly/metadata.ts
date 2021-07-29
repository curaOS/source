/**
 * TODO move to init
 */
const NFT_SPEC = 'nft-1.0.0'
const NFT_NAME = 'Nft'
const NFT_SYMBOL = 'NFT'

@nearBindgen
export class TokenMetadata {
    constructor(
        public title: string = '',
        public issued_at: string = '',
        public copies: u8 = 1,
        public media: string = '',
        public extra: Uint8Array = new Uint8Array(0),
        public description: string = '',
        public media_hash: string = '',
        public expires_at: string = '',
        public starts_at: string = '',
        public updated_at: string = '',
        public reference: string = '',
        public reference_hash: string = ''
    ) {}
}

@nearBindgen
export class NFTContractMetadata {
    spec: string = NFT_SPEC
    name: string = NFT_NAME
    symbol: string = NFT_SYMBOL
    icon: string
    base_uri: string
    reference: string
    reference_hash: string
}
