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

## Methods

{% swagger baseUrl="[nft-contract]" path=".claim_media(media)" method="post" summary="Claim Media" %}
{% swagger-description %}
Mint Media for user.
{% endswagger-description %}

{% swagger-parameter in="body" name="media" type="string" %}
Identifier of media on decentralized storage.
{% endswagger-parameter %}

{% swagger-response status="200" description="Return Media created." %}
```
{
  "id": "mmmmm",
  "owner_id": "berrytest.testnet",
  "creator": "ysn-1_0_0.ysn.testnet",
  "prev_owner": "ysn.testnet",
  "metadata": {
    "title": "berrytest",
    "issued_at": "1627037962034007695",
    "copies": 1,
    "media": "b-ATrsmcvLYREXzQKpW8Yq9u9WZMR4KU-jnjOMNGt64",
    "extra": "",
    "description": "",
    "media_hash": "",
    "expires_at": "",
    "starts_at": "",
    "updated_at": "",
    "reference": "",
    "reference_hash": ""
  },
  "royalty": {
    "split_between": {
      "ysn-1_0_0.ysn.testnet": 2500
    },
    "percentage": 2500
  }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".burn_design(token_id)" method="delete" summary="Burn Design" %}
{% swagger-description %}
Removes Media.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to remove.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_token(token_id)" method="get" summary="NFT Token" %}
{% swagger-description %}
Retrieve a specific token.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to retrieve.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
{
  "id": "ysn57031827",
  "owner_id": "ysn.testnet",
  "creator": "ysn-1_0_0.ysn.testnet",
  "prev_owner": "ysn.testnet",
  "metadata": {
    "title": "ysn",
    "issued_at": "1627565749029316411",
    "copies": 1,
    "media": "-H5vVA2HosWrOecpXebEKLt4cq4_BmAZzm1QjcCzB8o",
    "extra": "",
    "description": "",
    "media_hash": "",
    "expires_at": "",
    "starts_at": "",
    "updated_at": "",
    "reference": "",
    "reference_hash": ""
  },
  "royalty": {
    "split_between": {
      "ysn-1_0_0.ysn.testnet": 2500
    },
    "percentage": 2500
  }
}
```
{% endswagger-response %}

{% swagger-response status="404" description="" %}
```
null
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_total_supply()" method="get" summary="NFT Total Supply" %}
{% swagger-description %}
Returns number of tokens.
{% endswagger-description %}

{% swagger-response status="200" description="" %}
```
"5"
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]." path="nft_tokens(from_index, limit)" method="get" summary="NFT Tokens" %}
{% swagger-description %}
An array of tokens from index to limit.
{% endswagger-description %}

{% swagger-parameter in="body" name="from_index" type="string" %}
Start index.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="limit" type="integer" %}
The number of tokens.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
[
  {
    id: 'mmmmm',
    owner_id: 'berrytest.testnet',
    creator: 'ysn-1_0_0.ysn.testnet',
    prev_owner: 'ysn.testnet',
    metadata: {
      title: 'berrytest',
      issued_at: '1627037962034007695',
      copies: 1,
      media: 'b-ATrsmcvLYREXzQKpW8Yq9u9WZMR4KU-jnjOMNGt64',
      extra: '',
      description: '',
      media_hash: '',
      expires_at: '',
      starts_at: '',
      updated_at: '',
      reference: '',
      reference_hash: ''
    },
    royalty: {
      split_between: { 'ysn-1_0_0.ysn.testnet': 2500 },
      percentage: 2500
    }
  },
  {
    id: 'yyyyy',
    owner_id: 'berrytest.testnet',
    creator: 'ysn-1_0_0.ysn.testnet',
    prev_owner: 'berrytest.testnet',
    metadata: {
      title: 'berrytest',
      issued_at: '1627550039482793937',
      copies: 1,
      media: 'iNannrXFNmLKZOoSrbl9KGuqptHKkNh1BsAomyXSu7Q',
      extra: '',
      description: '',
      media_hash: '',
      expires_at: '',
      starts_at: '',
      updated_at: '',
      reference: '',
      reference_hash: ''
    },
    royalty: {
      split_between: { 'ysn-1_0_0.ysn.testnet': 2500 },
      percentage: 2500
    }
  }
]
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_supply_for_owner(account_id)" method="get" summary="NFT Supply For Owner" %}
{% swagger-description %}
A number of tokens are owned by the account.
{% endswagger-description %}

{% swagger-parameter in="path" name="account_id" type="string" %}
Account to retrieve.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
"1"
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_tokens_for_owner(account_id, from_index, limit)" method="get" summary="NFT Tokens For Owner" %}
{% swagger-description %}
An array of tokens owned by account.
{% endswagger-description %}

{% swagger-parameter in="body" name="account_id" type="string" %}
Account to retrieve.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="from_index" type="string" %}
Start index.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="limit" type="integer" %}
The number of tokens.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
[
  {
    id: 'yyyyy',
    owner_id: 'berrytest.testnet',
    creator: 'ysn-1_0_0.ysn.testnet',
    prev_owner: 'berrytest.testnet',
    metadata: {
      title: 'berrytest',
      issued_at: '1627550039482793937',
      copies: 1,
      media: 'iNannrXFNmLKZOoSrbl9KGuqptHKkNh1BsAomyXSu7Q',
      extra: '',
      description: '',
      media_hash: '',
      expires_at: '',
      starts_at: '',
      updated_at: '',
      reference: '',
      reference_hash: ''
    },
    royalty: {
      split_between: { 'ysn-1_0_0.ysn.testnet': 2500 },
      percentage: 2500
    }
  }
]
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_transfer(token_id, bidder)" method="patch" summary="NFT Transfer" %}
{% swagger-description %}
Transfer token to the new owner.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to transfer.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="bidder" type="string" %}
The receiver of the token.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".nft_metadata()" method="get" summary="NFT Metadata" %}
{% swagger-description %}
Return contract metadata.
{% endswagger-description %}

{% swagger-response status="200" description="" %}
```
{
  "spec": "nft-1.0.0",
  "name": "ml1w",
  "symbol": "ML1W",
  "icon": null,
  "base_uri": null,
  "reference": null,
  "reference_hash": null
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[nft-contract]" path=".init(contract_metadata, market_contract)" method="post" summary="init" %}
{% swagger-description %}
Initialize new contract.
{% endswagger-description %}

{% swagger-parameter in="body" name="contract_metadata" type="object" %}
Metadata list.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="market_contracta" type="string" %}
Address of the Market contract.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}
