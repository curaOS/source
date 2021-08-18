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
        public extra: string = '',
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
    constructor(
        public spec: string = NFT_SPEC,
        public name: string = NFT_NAME,
        public symbol: string = NFT_SYMBOL,
        public icon: string = '',
        public base_uri: string = '',
        public reference: string = '',
        public reference_hash: string = '',
        public packages_script: string = '',
        public render_script: string = '',
        public style_css: string = '',
        public parameters: string = ''
    ) {}
}
