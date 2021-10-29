import useSWR from 'swr'
import { networkId, nodeUrl } from '../near-utils'
import { connect, Contract } from 'near-api-js'

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
    const near = await connect({
        networkId,
        nodeUrl,
        deps: {
            //@ts-ignore
            keyStore: undefined,
        },
    })
    //@ts-ignore
    const account = await near.account(null)

    const contract = await new Contract(account, contractAddress, {
        viewMethods: [
            'nft_token',
            'nft_total_supply',
            'nft_tokens',
            'nft_supply_for_owner',
            'nft_tokens_for_owner',
            'nft_metadata',
        ],
        changeMethods: [''],
    })

    const params = JSON.parse(serializedParams)
    //@ts-ignore
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
 * @returns {useNFTViewMethodType} { error, loading, data }
 */

export function useNFTViewMethod(
    contractAddress: string,
    methodName: string,
    params?: object
): useNFTViewMethodType {
    const { data, error } = useSWR(
        [contractAddress, methodName, JSON.stringify(params || {})],
        fetchNFTView
    )

    return {
        error: error,
        loading: !error && !data,
        data: data,
    }
}
