// @ts-nocheck
import { useEffect, useState } from 'react'
import { getContractMethods } from './near-utils'
import useSWR from 'swr'
import { useNearHooksContainer } from '@cura/hooks'

export default function useFTContract(
    contractAddress: string = 'ysn-1_0_0.ysn.testnet'
) {
    const [contract, setContract] = useState({ account: null })
    const { getContract, accountId } = useNearHooksContainer()

    const setupContract = () => {
        if (contractAddress.includes('undefined')) {
            return
        }

        const newContract = getContract(
            contractAddress,
            getContractMethods('ft')
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId])

    return { contract }
}

export const useFTMethod = (
    contractAddress: string,
    methodName: string,
    params: {},
    gas: number
) => {
    const { contract } = useFTContract(contractAddress)

    const validParams = contract?.account?.accountId

    const fetcher = (methodName: string, serializedParams: string) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => {
            return res
        })
    }

    const { data, error } = useSWR(
        validParams ? [methodName, JSON.stringify(params)] : null,
        fetcher
    )

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
