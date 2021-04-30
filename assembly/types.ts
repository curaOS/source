export type Token = {
    id: string,
    owner_id: string,
    metadata: TokenMetadata,
}

export type NFTContractMetadata = {
    spec: string,
    name: string,
    symbol: string,
    icon: string|null,
    base_uri: string|null,
    reference: string|null,
    reference_hash: string|null,
  }
  
 export type TokenMetadata = {
    title: string|null,
    description: string|null,
    media: string|null,
    media_hash: string|null,
    copies: number|null,
    issued_at: string|null,
    expires_at: string|null,
    starts_at: string|null,
    updated_at: string|null,
    extra: string|null,
    reference: string|null,
    reference_hash: string|null,
  }