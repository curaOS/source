import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import Near from 'containers/near'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'

const NFT_CONTRACT_NAME = process.env.SHARE_ADDRESS

export default function useNFTContract() {
    const [contract, setContract] = useState({ account: null })
    const { getContract } = Near.useContainer()
    const { accountId } = useRecoilValue(accountState)

    const setupContract = () => {
        const newContract = getContract(
            NFT_CONTRACT_NAME,
            getContractMethods(NFT_CONTRACT_NAME)
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId])

    return { contract }
}

export const useNFTMethod = (methodName, params, gas) => {
    const { contract } = useNFTContract()

    const fetcher = (methodName, serializedParams) => {
        console.log(methodName, serializedParams)
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => res)
    }

    const { data, error } = useSWR(
        contract.account ? [methodName, JSON.stringify(params)] : null,
        fetcher
    )

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
