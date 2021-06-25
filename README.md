---
description: >-
  A full-stack of tools for creators to create a market and build a community
  around their content.
---

# Introduction

YSN is an experimental project on the NEAR sharded blockchain that puts together non-fungible tokens, fungible-tokens as social tokens that bounds together with the projects and gives access to a decentralized organization.

The project currently consists of three smart contracts.

![Group 1](https://user-images.githubusercontent.com/5102099/119519396-ac0a9800-bd79-11eb-9b07-4f345212a52d.png)

## YSN

Generative art, social token and future DAO on NEAR.

```text
Generative art "SHARE" -> v1.share.ysn.testnet
Social token "YSN" -> v1.ysn.testnet
```

### Environment

```bash
export CONTRACT = [contract_id]
export ACCOUNT = [account_id]
```

### Methods \(not up to date\)

`design(): void`

```bash
near call CONTRACT design --accountId ACCOUNT
```

```bash
near call CONTRACT design '{"seed": [number]}'  --accountId ACCOUNT
```

`claim_media(): void`

```bash
near call CONTRACT claim_media '{"seed": [number]}' --accountId ACCOUNT
```

`view_media(): void`

```bash
near call CONTRACT view_media --accountId ACCOUNT
```

`burn_design(): void`

```bash
near call CONTRACT burn_design --accountId ACCOUNT
```

