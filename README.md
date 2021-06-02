![Group 1](https://user-images.githubusercontent.com/5102099/119519396-ac0a9800-bd79-11eb-9b07-4f345212a52d.png)

# YSN

Generative art, social token and future DAO on NEAR.

```
Generative art "SHARE" -> v1.share.ysn.testnet
Social token "YSN" -> v1.ysn.testnet
```

---

## Environment

```sh
export CONTRACT = [contract_id]
export ACCOUNT = [account_id]
```

## Methods (not up to date)

`design(): void`

```sh
near call CONTRACT design --accountId ACCOUNT
```

```sh
near call CONTRACT design '{"seed": [number]}'  --accountId ACCOUNT
```

`claimMyDesign(): void`

```sh
near call CONTRACT claimMyDesign '{"seed": [number]}' --accountId ACCOUNT
```

`viewMyDesign(): void`

```sh
near call CONTRACT viewMyDesign --accountId ACCOUNT
```

`burnMyDesign(): void`

```sh
near call CONTRACT burnMyDesign --accountId ACCOUNT
```
