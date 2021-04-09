# Art Demo

Generative art on NEAR.

----
## Environment
```sh
export CONTRACT = [contract_id] // ncd.ys24.testnet
export ACCOUNT = [account_id]
```

## Methods

`draw(): void`

```sh
near call CONTRACT draw --accountId ACCOUNT
```

`createDesign(): void`

```sh
near call CONTRACT createDesign '{"seed": [number]}' --accountId ACCOUNT
```

`viewMyDesign(): void`

```sh
near call CONTRACT viewMyDesign --accountId ACCOUNT
```

`burnMyDesign(): void`

```sh
near call CONTRACT burnMyDesign --accountId ACCOUNT 
```