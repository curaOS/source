---
description: The non-fungible tokens.
---

# NFT

## Types

### Media

```typescript
export class Media {
    id: string
    owner_id: string
    creator: string
    prev_owner: string
    metadata: TokenMetadata
    royalty: Royalty
    constructor(media: string) { }
}
```

### Metadata

```typescript
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

export class NFTContractMetadata {
    constructor(
        public spec: string = NFT_SPEC,
        public name: string = NFT_NAME,
        public symbol: string = NFT_SYMBOL,
        public icon: string = '',
        public base_uri: string = '',
        public reference: string = '',
        public reference_hash: string = ''
    ) {}
}
```

### Royalty

```typescript
export class Royalty {
    split_between: Map<AccountId, u32> = new Map()
    percentage: u32 = 0
    constructor() {
        /** 25% of future sales goes to FT */
        this.split_between.set(FT_CONTRACT, ROYALTY_PERCENTAGE)
        this.percentage = ROYALTY_PERCENTAGE
    }
}

```



