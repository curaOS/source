import { createContainer } from 'unstated-next'
import { useEffect, useState } from 'react'
import { networkId, nodeUrl, walletUrl, contractName } from '@utils/near-utils'
import { WalletConnection, keyStores, connect, Contract } from 'near-api-js'
import { useSetRecoilState } from 'recoil'
import { accountState } from '../state/account'
import { lensPath, set } from 'ramda'

const accountIdLens = lensPath(['accountId'])

function useNear() {
    const [nearConnect, setNearConnect] = useState(null)
    const [nearWallet, setNearWallet] = useState(null)
    const [nearAccount, setNearAccount] = useState(null)

    const setAccount = useSetRecoilState(accountState)

    const setupNear = async () => {
        const connectSetup = await connect({
            networkId,
            nodeUrl,
            walletUrl,
            deps: {
                keyStore: new keyStores.BrowserLocalStorageKeyStore(),
            },
        })

        const walletSetup = new WalletConnection(connectSetup)

        const accountSetup = walletSetup.account()

        setNearConnect(connectSetup)
        setNearWallet(walletSetup)
        setNearAccount(accountSetup)

        const accountId = accountSetup.accountId

        setAccount(set(accountIdLens, accountId))
    }

    useEffect(setupNear, [])

    const signIn = () => {
        nearWallet.requestSignIn(
            contractName,
            'SHARE',
            window.location.origin + '/share',
            window.location.origin + '/share'
        )
    }

    const signOut = () => {
        nearWallet.signOut()
    }

    const getContract = (contractName, contractMethods) => {
        return new Contract(nearAccount, contractName, { ...contractMethods })
    }

    return {
        signIn,
        signOut,
        getContract,
    }
}

const Near = createContainer(useNear)
export default Near
