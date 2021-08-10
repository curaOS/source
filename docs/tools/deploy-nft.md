---
description: CLI command to deploy an NFT contract to address and pass init props.
---

# deploy-nft

```text
node scripts deploy-nft
```

| Name | Type | Message |
| :--- | :--- | :--- |
| **address** | `string` | _Contract deploy address_ |
| spec | `string` | _Default is nft-1.0.0_ |
| name | `string` | _Name of contract_ |
| symbol | `string` | _Symbol of contract_ |
| market\_contract | `string | null` | _Address of the Market_ |
| generator\_contract | `string | null` | _Address of the Generator_ |
| packages\_script | `text` | _Creative project packages_ |
| render\_script | `text` | _Creative project script  \(preferrably minfied\)_ |
| style\_css | `text` | _Creative project CSS_ |
| parameters | `JSON` | _Project parameters_ |

Remember to minify JS you put in between script tags.

