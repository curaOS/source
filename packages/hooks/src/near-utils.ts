function getConfig(env: string) {
    switch (env) {
        case 'mainnet':
            return {
                networkId: 'mainnet',
                nodeUrl: 'https://rpc.mainnet.near.org',
                walletUrl: 'https://wallet.near.org',
                helperUrl: 'https://helper.mainnet.near.org',
                explorerUrl: 'https://explorer.near.org'
            }
        case 'testnet':
            return {
                networkId: 'testnet',
                nodeUrl: 'https://rpc.testnet.near.org',
                walletUrl: 'https://wallet.testnet.near.org',
                helperUrl: 'https://helper.testnet.near.org',
                explorerUrl: 'https://explorer.testnet.near.org',
            }
        default:
            throw Error('Environment not found.')
    }
}

export const { nodeUrl, networkId, walletUrl, explorerUrl } = getConfig(process.env.NEAR_ENV || 'testnet')

export function getContractMethods(contractName: string) {
    switch (contractName) {
        case 'ft':
            return {
                changeMethods: [],
                viewMethods: [
                    'ft_balance_of',
                    'get_treasury',
                    'ft_total_supply',
                ],
            }
        case 'nft':
            return {
                changeMethods: [
                    'set_bid',
                    'remove_bid',
                    'accept_bid',
                    'generate',
                    'claim_media',
                    'burn_design',
                    'nft_mint',
                ],
                viewMethods: [
                    'nft_total_supply',
                    'nft_metadata',
                    'nft_token',
                    'nft_tokens_for_owner',
                    'nft_tokens',
                    'view_media',
                    'nft_supply_for_owner',
                    'get_bids',
                    'get_bidder_bids',
                    'nft_metadata_extra',
                ],
            }
        case 'market':
            return {
                changeMethods: [],
                viewMethods: ['get_bids', 'get_bidders_bids'],
            }

        default:
            return {}
    }
}
