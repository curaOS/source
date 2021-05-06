# Share

Generative art on NEAR.

```
mojio-v1.ys24.testnet
```

----
## Environment
```sh
export CONTRACT = [contract_id] // ncd.ys24.testnet
export ACCOUNT = [account_id]
```

## Methods

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
