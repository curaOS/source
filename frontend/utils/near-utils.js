import getConfig from '../config'
import * as nearAPI from 'near-api-js'

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
