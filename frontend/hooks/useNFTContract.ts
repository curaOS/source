import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import Near from 'containers/near'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'
import { useSetRecoilState } from 'recoil'
import { indexLoaderState, alertMessageState } from '../state/recoil'

export default function useNFTContract(
    contractAddress: string = '0.share-nft.testnet'
) {
    const [contract, setContract] = useState({ account: null })
    const { getContract } = Near.useContainer()
    const { accountId } = useRecoilValue(accountState)

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

export const useNFTMethod = (contractAddress, methodName, params, gas) => {
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { contract } = useNFTContract(contractAddress)

    const validParams = contract?.account?.accountId

    const fetcher = (methodName, serializedParams) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => {
            return res
        })
    }

    const { data, error } = useSWR(
        validParams ? [methodName, JSON.stringify(params)] : null,
        fetcher
    )

    if (!error && !data && validParams) {
        setIndexLoader(true)
    }

    if (error) {
        setAlertMessage(error.toString())
        setIndexLoader(false)
    }

    if (data) {
        setIndexLoader(false)
    }

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
