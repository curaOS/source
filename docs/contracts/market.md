---
description: A perpetual market.
---

# Market

## Types

```typescript
class Bid {
    constructor(
        public amount: u128,
        public bidder: AccountId,
        public recipient: AccountId,
        public sell_on_share: u16,
        public currency: CurrencyId = 'near'
    ) {}
}
```

```typescript
class BidShares {
    constructor(
        public prev_owner: u16,
        public creator: u16,
        public owner: u16
    ) {}
}
```

```typescript
class Ask {
    amount: u128 // Amount asked
    currency: CurrencyId = 'near' // currency of ask, default is NEAR
    sell_on_share: u16 // % to pay to previous owner on this sale
    constructor() {}
}
```

## Methods

{% api-method method="get" host="\[market-contract\]" path=".get\_bids\(token\_id\)" %}
{% api-method-summary %}
Get Bids
{% endapi-method-summary %}

{% api-method-description %}
Retrieve all bids for a certain token.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to retrieve bids for.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  "ysn.testnet": {
    "amount": "100000000000000000000000",
    "bidder": "ysn.testnet",
    "recipient": "berrytest.testnet",
    "sell_on_share": 1000,
    "currency": "near"
  },
  "ys24.testnet": {
    "amount": "10000000000000000000000",
    "bidder": "ys24.testnet",
    "recipient": "berrytest.testnet",
    "sell_on_share": 1900,
    "currency": "near"
  }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="get" host="\[market-contract\]" path=".get\_bidders\_bids\(account\_id\)" %}
{% api-method-summary %}
Get Bidders Bids
{% endapi-method-summary %}

{% api-method-description %}
Retrieve all bids placed by an account.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-path-parameters %}
{% api-method-parameter name="account\_id" type="string" required=true %}
Bidder's account.
{% endapi-method-parameter %}
{% endapi-method-path-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}

{% endapi-method-response-example-description %}

```
{
  "ysn57031827": {
    "amount": "40000000000000000000000",
    "bidder": "ys24.testnet",
    "recipient": "ysn.testnet",
    "sell_on_share": 2000,
    "currency": "near"
  },
  "yyyyy": {
    "amount": "10000000000000000000000",
    "bidder": "ys24.testnet",
    "recipient": "berrytest.testnet",
    "sell_on_share": 1900,
    "currency": "near"
  }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="\[market-contract\]" path=".set\_bid\_shares\(token\_id, prev\_owner, creator, owner\)" %}
{% api-method-summary %}
Set Bid Shares
{% endapi-method-summary %}

{% api-method-description %}
Set or update the split shares for a certain token.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to set or update.
{% endapi-method-parameter %}

{% api-method-parameter name="prev\_owner" type="string" required=true %}
Share of sale to the previous owner.
{% endapi-method-parameter %}

{% api-method-parameter name="creator" type="string" required=true %}
Share of sale to initial creator.
{% endapi-method-parameter %}

{% api-method-parameter name="owner" type="string" required=true %}
Share of sale to the current owner.
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
No response.
{% endapi-method-response-example-description %}

```
void
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

{% api-method method="post" host="\[market-contract\]" path=".set\_bid\(token\_id, amount, bidder, recipient, sell\_on\_share, currency\)" %}
{% api-method-summary %}
Set Bid
{% endapi-method-summary %}

{% api-method-description %}
Places a bid on a token.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to bid on.
{% endapi-method-parameter %}

{% api-method-parameter name="amount" type="string" required=true %}
Amount of bid.
{% endapi-method-parameter %}

{% api-method-parameter name="bidder" type="string" required=true %}
Account of bidder \(tx user\).
{% endapi-method-parameter %}

{% api-method-parameter name="recipient" type="string" required=true %}
Recipient of bid \(current owner\).
{% endapi-method-parameter %}

{% api-method-parameter name="sell\_on\_share" type="string" required=true %}
The amount for prev\_owner in case of sale.
{% endapi-method-parameter %}

{% api-method-parameter name="currency" type="string" required=true %}
Currency of the bid.
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

{% api-method method="delete" host="\[market-contract\]" path=".remove\_bid\(token\_id, bidder\)" %}
{% api-method-summary %}
Remove Bid
{% endapi-method-summary %}

{% api-method-description %}
Remove a bid for token.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to remove the bid from.
{% endapi-method-parameter %}

{% api-method-parameter name="bidder" type="string" required=true %}
Account of the bid to remove.
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

{% api-method method="get" host="\[market-contract\]" path=".burn\(token\_id\)" %}
{% api-method-summary %}
Burn
{% endapi-method-summary %}

{% api-method-description %}
Removes bid shares, asks, and bids for a token while returing bid amounts.
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

{% api-method method="patch" host="\[market-contract\]" path=".accept\_bid\(token\_id, bidder, creator, owner, prev\_owner\)" %}
{% api-method-summary %}
Accept Bid
{% endapi-method-summary %}

{% api-method-description %}
Pays off the bid shares,  updates to new shares, and removes only this bid.
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-body-parameters %}
{% api-method-parameter name="token\_id" type="string" required=true %}
Token to accept the bid for.
{% endapi-method-parameter %}

{% api-method-parameter name="bidder" type="string" required=true %}
Account of the bid to accept.
{% endapi-method-parameter %}

{% api-method-parameter name="creator" type="string" required=true %}
Account of the initial creator.
{% endapi-method-parameter %}

{% api-method-parameter name="owner" type="string" required=true %}
Account of the current owner.
{% endapi-method-parameter %}

{% api-method-parameter name="prev\_owner" type="string" required=true %}
Account of the previous owner.
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

