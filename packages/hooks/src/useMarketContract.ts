// @ts-nocheck
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useNearHooksContainer } from './near'
import { getContractMethods } from './near-utils'

export default function useMarketContract(contractAddress: string) {
    const [contract, setContract] = useState({ account: null })
    const { getContract, accountId } = useNearHooksContainer()

    const setupContract = () => {
        if (contractAddress.includes('undefined')) {
            return
        }

        const newContract = getContract(
            contractAddress,
            getContractMethods('market')
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId, contractAddress])

    return { contract }
}

export const useMarketMethod = (
    contractAddress: string,
    methodName: string,
    params: {},
    gas: number,
    updateStatus: () => void
) => {
    const { contract } = useMarketContract(contractAddress)

    const validParams = params?.token_id || params?.account_id

    const fetcher = (methodName: string, serializedParams: string) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => {
            return res
        })
    }

    const { data, error, mutate } = useSWR(
        contract?.account?.accountId && validParams
            ? [methodName, JSON.stringify(params)]
            : null,
        fetcher
    )

    updateStatus && updateStatus(error, data, validParams)

    return {
        data: data,
        loading: !error && !data,
        error: error,
        mutate: mutate,
    }
}
