// @ts-nocheck

import { useEffect, useState } from 'react'
import { createContainer } from 'unstated-next'
import { WalletConnection, keyStores, connect, Contract } from 'near-api-js'
import { networkId, nodeUrl, walletUrl } from './near-utils'

function useNearHooks() {
    const [nearConnect, setNearConnect] = useState({})
    const [nearWallet, setNearWallet] = useState({})
    const [nearAccount, setNearAccount] = useState({})
    const [accountId, setAccountId] = useState('')

    const setupNear = async () => {
        const connectSetup = await connect({
            networkId,
            nodeUrl,
            walletUrl,
            deps: {
                keyStore: new keyStores.BrowserLocalStorageKeyStore(),
            },
        })

        const walletSetup = new WalletConnection(connectSetup, null)

        const accountSetup = walletSetup.account()

        setNearConnect(connectSetup)
        setNearWallet(walletSetup)
        setNearAccount(accountSetup)
        setAccountId(accountSetup.accountId)
    }

    useEffect(setupNear, [])

    const signIn = (project, successPath, errorPath) => {
        console.log(project, successPath, errorPath)
        nearWallet.requestSignIn(project, successPath, errorPath)
    }

    const signOut = () => {
        nearWallet?.signOut()
    }

    const getContract = (contractName: string, contractMethods: {}) => {
        return new Contract(nearAccount, contractName, {
            ...contractMethods,
        })
    }

    return {
        signIn,
        signOut,
        getContract,
        accountId,
    }
}

const { Provider, useContainer } = createContainer(useNearHooks)

export { Provider as NearHooksProvider, useContainer as useNearHooksContainer }
