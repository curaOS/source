// @ts-nocheck
import { useEffect, useState } from 'react'
import { useNearHooksContainer } from './near'
import { getContractMethods } from './near-utils'
import useSWR from 'swr'

export default function useNFTContract(
    contractAddress: string = '0.share-nft.testnet'
) {
    const [contract, setContract] = useState({ account: null })
    const { getContract, accountId } = useNearHooksContainer()

    const setupContract = () => {
        if (contractAddress.includes('undefined')) {
            return
        }

        const newContract = getContract(
            contractAddress,
            getContractMethods('nft')
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId, contractAddress])

    return { contract }
}

export const useNFTMethod = (
    contractAddress: string,
    methodName: string,
    params: {},
    gas: number,
    updateStatus: () => void
) => {
    const { contract } = useNFTContract(contractAddress)

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

    updateStatus && updateStatus(error, data, validParams)

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
