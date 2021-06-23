import getConfig from '../config'

const ftContract = process.env.YSN_ADDRESS
const nftContract = process.env.SHARE_ADDRESS
const marketContract = process.env.SHARE_MARKET_ADDRESS

export const {
    networkId,
    nodeUrl,
    walletUrl,
    nameSuffix,
    contractName,
    contractMethods,
} = getConfig()

export function getContractMethods(contractName) {
    switch (contractName) {
        case ftContract:
            return {
                changeMethods: [],
                viewMethods: [
                    'ft_balance_of',
                    'get_treasury',
                    'ft_total_supply',
                ],
            }
        case nftContract:
            return {
                changeMethods: [
                    'set_bid',
                    'remove_bid',
                    'accept_bid',
                    'design',
                    'claim_media',
                    'burn_design',
                    'view_media',
                    'nft_tokens',
                    'nft_tokens_for_owner',
                ],
                viewMethods: ['nft_total_supply'],
            }
        case marketContract:
            return {
                changeMethods: [],
                viewMethods: ['get_bids', 'get_bidders_bids'],
            }
    }
}
