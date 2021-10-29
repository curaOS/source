// @ts-nocheck
import { useNFTContract } from './useNFTContract'
import useSWR from 'swr'

/**
 * Execute an NFT contract method
 *
 * @param {string} contractAddress - contract adress
 * @param {string} methodName - the view method to execute
 * @param {object} params - method parameters
 * @param {number} gas - gas limit
 * @returns {object} { error, loading, data }
 */

export function useNFTMethod(
    contractAddress: string,
    methodName: string,
    params: {},
    gas: number,
    updateStatus: () => void
) {
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
