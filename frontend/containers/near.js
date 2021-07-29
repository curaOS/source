import { createContainer } from 'unstated-next'
import { useEffect, useState } from 'react'
import { networkId, nodeUrl, walletUrl } from '@utils/near-utils'
import { useRouter } from 'next/router'
import { WalletConnection, keyStores, connect, Contract } from 'near-api-js'
import { useSetRecoilState } from 'recoil'
import { accountState } from '../state/account'
import { lensPath, set } from 'ramda'

const accountIdLens = lensPath(['accountId'])

const mapPathToProject = (path) => {
    switch (true) {
        case path.startsWith('/ml/1c'):
            return 'ml1c.ysn-1_0_0.ysn.testnet'
        case path.startsWith('/ml/1w'):
            return 'ml1w.ysn-1_0_0.ysn.testnet'
        case path.startsWith('/share'):
            return 'share.ysn-1_0_0.ysn.testnet'
    }
}

function useNear() {
    const [nearConnect, setNearConnect] = useState(null)
    const [nearWallet, setNearWallet] = useState(null)
    const [nearAccount, setNearAccount] = useState(null)

    const setAccount = useSetRecoilState(accountState)

    const router = useRouter()

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

    const switchProject = () => {
        const currentProject = mapPathToProject(router.asPath)
        const signedProject = localStorage.getItem('contractAddress')

        if (
            signedProject &&
            currentProject &&
            currentProject != signedProject
        ) {
            signOut()
        }
    }

    useEffect(switchProject, [router.asPath])

    const signIn = () => {
        const project = mapPathToProject(router.asPath)

        localStorage.setItem('contractAddress', project)

        nearWallet.requestSignIn(
            project,
            window.location.origin + router.asPath,
            window.location.origin + router.asPath
        )
    }

    const signOut = () => {
        localStorage.removeItem('contractAddress')
        nearWallet?.signOut()
        router.reload(window.location.origin + router.asPath)
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
