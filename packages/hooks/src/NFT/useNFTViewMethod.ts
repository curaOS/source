// @ts-nocheck
import useSWR from 'swr'
import { networkId, nodeUrl } from '../near-utils'
import { connect, Contract } from 'near-api-js'
import { getContractMethods } from '../near-utils'

export type useNFTViewMethodType = {
    error?: string
    loading: boolean
    data?: any
}

const fetchNFTView = async (
    contractAddress: string,
    methodName: string,
    serializedParams: string
) => {
    let contract

    if (window.near_contracts && window.near_contracts[contractAddress]) {
        contract = window.near_contracts[contractAddress]
        console.log('using cached contract')
    } else {
        console.log('setting new contract')
        const near = await connect({
            networkId,
            nodeUrl,
            deps: {
                keyStore: undefined,
            },
        })
        const account = await near.account(null)
        contract = await new Contract(
            account,
            contractAddress,
            getContractMethods('nft')
        )
        if (!window.near_contracts) {
            window.near_contracts = {}
        }
        window.near_contracts[contractAddress] = contract
    }

    const params = JSON.parse(serializedParams)
    return await contract[methodName]({ ...params }).then((res) => {
        return res
    })
}

/**
 * Execute an NFT contract view method without an account
 *
 * @param {string} contractAddress - contract adress
 * @param {string} methodName - the view method to execute
 * @param {object} params - method parameters
 * @param {object} updateStatus
 * @returns {useNFTViewMethodType} { error, loading, data }
 */

export function useNFTViewMethod(
    contractAddress: string,
    methodName: string,
    params?: object,
    updateStatus?: () => void
): useNFTViewMethodType {
    const { data, error } = useSWR(
        [contractAddress, methodName, JSON.stringify(params || {})],
        fetchNFTView
    )

    updateStatus && updateStatus(error, data)

    return {
        error: error,
        loading: !error && !data,
        data: data,
    }
}
