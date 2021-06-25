---
description: It's a collection of scripts to make development faster.
---

# Scripts

## Deploy

```bash
node deploy [--init --clean --create --build]
```

❗️Passing clean options wipes out contracts state 

> Contracts are deployed if no option or only init is passed.

`--init` : deploys and calls init function

`--clean` : deletes _NEAR_ accounts for contracts

`--build` : builds contracts

`--create` : create accounts for contract deploys

## Accounts

```bash
node accounts
```

> Write contract addressed to be consumed by front-end and smart contracts.

