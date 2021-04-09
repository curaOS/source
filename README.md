# Art Demo

Generative art on NEAR.

----
## Environment
```
export CONTRACT = ncd.ys24.testnet
export ACCOUNT = [your_account_id]
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