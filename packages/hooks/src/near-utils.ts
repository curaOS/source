function getConfig() {
    let config = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
    }

    return config
}

export const { nodeUrl, networkId, walletUrl } = getConfig()

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
                    'mint',
                    'burn_design',
                    'view_media',
                    'nft_tokens',
                    'nft_tokens_for_owner',
                    'nft_metadata',
                ],
                viewMethods: ['nft_total_supply', 'nft_token'],
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
