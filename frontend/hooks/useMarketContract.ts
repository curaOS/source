import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import Near from 'containers/near'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'
import { has } from 'ramda'
import { useSetRecoilState } from 'recoil'
import { indexLoaderState, alertMessageState } from '../state/recoil'

const marketParams = has()

const MARKET_CONTRACT_NAME = process.env.SHARE_MARKET_ADDRESS

export default function useMarketContract() {
    const [contract, setContract] = useState({ account: null })
    const { getContract } = Near.useContainer()
    const { accountId } = useRecoilValue(accountState)

    const setupContract = () => {
        const newContract = getContract(
            MARKET_CONTRACT_NAME,
            getContractMethods(MARKET_CONTRACT_NAME)
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId])

    return { contract }
}

export const useMarketMethod = (methodName, params, gas) => {
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { contract } = useMarketContract()

    const validParams = params?.token_id || params?.account_id

    const fetcher = (methodName, serializedParams) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => {
            setIndexLoader(false)
            return res
        })
    }

    const { data, error } = useSWR(
        contract.account && validParams
            ? [methodName, JSON.stringify(params)]
            : null,
        fetcher
    )

    if (!error && !data) {
        setIndexLoader(true)
    } else {
        setIndexLoader(false)
    }

    if (error) {
        setAlertMessage(error.toString())
    }

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
