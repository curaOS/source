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

{% api-method method="post" host="\[nft-contract\]" path=".claim\_media\(media\)" %}
{% api-method-summary %}
Claim Media
{% endapi-method-summary %}

{% api-method-description %}
Mint Media for user.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="media" type="string" required=true %}
Identifier of media on decentralized storage.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Return Media created.
{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="delete" host="\[nft-contract\]" path=".burn\_design\(token\_id\)" %}
{% api-method-summary %}
Burn Design
{% endapi-method-summary %}

{% api-method-description %}
Removes Media.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to remove.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
void
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]" path=".nft\_token\(token\_id\)" %}
{% api-method-summary %}
NFT Token
{% endapi-method-summary %}

{% api-method-description %}
Retrieve a specific token.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to retrieve.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
null
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]" path=".nft\_total\_supply\(\)" %}
{% api-method-summary %}
NFT Total Supply
{% endapi-method-summary %}

{% api-method-description %}
Returns number of tokens.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
"5"
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]." path="nft\_tokens\(from\_index, limit\)" %}
{% api-method-summary %}
NFT Tokens
{% endapi-method-summary %}

{% api-method-description %}
An array of tokens from index to limit.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="from\_index" type="string" required=false %}
Start index.
{% endapi-method-parameter %}

{% api-method-parameter name="limit" type="integer" required=false %}
The number of tokens.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]" path=".nft\_supply\_for\_owner\(account\_id\)" %}
{% api-method-summary %}
NFT Supply For Owner
{% endapi-method-summary %}

{% api-method-description %}
A number of tokens are owned by the account.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="account\_id" type="string" required=true %}
Account to retrieve.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
"1"
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]" path=".nft\_tokens\_for\_owner\(account\_id, from\_index, limit\)" %}
{% api-method-summary %}
NFT Tokens For Owner
{% endapi-method-summary %}

{% api-method-description %}
An array of tokens owned by account.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="account\_id" type="string" required=true %}
Account to retrieve.
{% endapi-method-parameter %}

{% api-method-parameter name="from\_index" type="string" required=false %}
Start index.
{% endapi-method-parameter %}

{% api-method-parameter name="limit" type="integer" required=false %}
The number of tokens.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="patch" host="\[nft-contract\]" path=".nft\_transfer\(token\_id, bidder\)" %}
{% api-method-summary %}
NFT Transfer
{% endapi-method-summary %}

{% api-method-description %}
Transfer token to the new owner.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=false %}
Token to transfer.
{% endapi-method-parameter %}

{% api-method-parameter name="bidder" type="string" required=false %}
The receiver of the token.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
void
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[nft-contract\]" path=".nft\_metadata\(\)" %}
{% api-method-summary %}
NFT Metadata
{% endapi-method-summary %}

{% api-method-description %}
Return contract metadata.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="\[nft-contract\]" path=".init\(contract\_metadata, market\_contract\)" %}
{% api-method-summary %}
init
{% endapi-method-summary %}

{% api-method-description %}
Initialize new contract.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="contract\_metadata" type="object" required=true %}
Metadata list.
{% endapi-method-parameter %}

{% api-method-parameter name="market\_contracta" type="string" required=true %}
Address of the Market contract.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
void
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

