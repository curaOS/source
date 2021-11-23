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

{% swagger baseUrl="[market-contract]" path=".get_bids(token_id)" method="get" summary="Get Bids" %}
{% swagger-description %}
Retrieve all bids for a certain token.
{% endswagger-description %}

{% swagger-parameter in="path" name="token_id" type="string" %}
Token to retrieve bids for.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
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
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[market-contract]" path=".get_bidders_bids(account_id)" method="get" summary="Get Bidders Bids" %}
{% swagger-description %}
Retrieve all bids placed by an account.
{% endswagger-description %}

{% swagger-parameter in="path" name="account_id" type="string" %}
Bidder's account.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
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
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[market-contract]" path=".set_bid_shares(token_id, prev_owner, creator, owner)" method="post" summary="Set Bid Shares" %}
{% swagger-description %}
Set or update the split shares for a certain token.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to set or update.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="prev_owner" type="string" %}
Share of sale to the previous owner.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="creator" type="string" %}
Share of sale to initial creator.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="owner" type="string" %}
Share of sale to the current owner.
{% endswagger-parameter %}

{% swagger-response status="200" description="No response." %}
```
void
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[market-contract]" path=".set_bid(token_id, amount, bidder, recipient, sell_on_share, currency)" method="post" summary="Set Bid" %}
{% swagger-description %}
Places a bid on a token.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to bid on.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="amount" type="string" %}
Amount of bid.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="bidder" type="string" %}
Account of bidder (tx user).
{% endswagger-parameter %}

{% swagger-parameter in="body" name="recipient" type="string" %}
Recipient of bid (current owner).
{% endswagger-parameter %}

{% swagger-parameter in="body" name="sell_on_share" type="string" %}
The amount for prev_owner in case of sale.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="currency" type="string" %}
Currency of the bid.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[market-contract]" path=".remove_bid(token_id, bidder)" method="delete" summary="Remove Bid" %}
{% swagger-description %}
Remove a bid for token.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to remove the bid from.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="bidder" type="string" %}
Account of the bid to remove.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="[market-contract]" path=".burn(token_id)" method="get" summary="Burn" %}
{% swagger-description %}
Removes bid shares, asks, and bids for a token while returing bid amounts.
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

{% swagger baseUrl="[market-contract]" path=".accept_bid(token_id, bidder, creator, owner, prev_owner)" method="patch" summary="Accept Bid" %}
{% swagger-description %}
Pays off the bid shares,  updates to new shares, and removes only this bid.
{% endswagger-description %}

{% swagger-parameter in="body" name="token_id" type="string" %}
Token to accept the bid for.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="bidder" type="string" %}
Account of the bid to accept.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="creator" type="string" %}
Account of the initial creator.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="owner" type="string" %}
Account of the current owner.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="prev_owner" type="string" %}
Account of the previous owner.
{% endswagger-parameter %}

{% swagger-response status="200" description="" %}
```
void
```
{% endswagger-response %}
{% endswagger %}
