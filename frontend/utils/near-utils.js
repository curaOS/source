import getConfig from '../config'
import * as nearAPI from 'near-api-js'

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

const { Contract } = nearAPI

export function getContract(account) {
    return new Contract(account, contractName, { ...contractMethods })
}

export const getWallet = async () => {
    const near = await nearAPI.connect({
        networkId,
        nodeUrl,
        walletUrl,
        deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
    })
    const wallet = new nearAPI.WalletAccount(near)
    return { near, wallet }
}

export function getContractMethods(contractName) {
    switch (contractName) {
        case ftContract:
            return {
                changeMethods: [],
                viewMethods: ['ft_balance_of'],
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
