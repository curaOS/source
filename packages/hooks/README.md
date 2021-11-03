# @cura/hooks

a group of useful React hooks for front-ends on NEAR blockchain

## NFT

Hooks related to NFT contracts, like retrieving on-chain and off-chain NFT data

### Hooks to interact with NFT contract

| Hook               | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `useNFTContract`   | Loads an NFT contract                                            |
| `useNFTMethod`     | Execute and returns results for an NFT contract view/call method |
| `useViewNFTMethod` | Execute and returns results for an NFT contract view method      |

### Hooks to fetch on-chain NFT Data

| Hook                     | Description                            |
| ------------------------ | -------------------------------------- |
| `useNFTMetadata`         | Fetches on-chain NFT metadata          |
| `useNFTContractMetadata` | Fetches on-chain NFT Contract metadata |

### Hooks to fetch off-chain NFT Data

| Hook                | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `useNFTReference`   | Fetches off-chain NFT metadata from given reference URI |
| `useNFTContentType` | Fetch NFT content type from given URI                   |

## FT

## MARKET
