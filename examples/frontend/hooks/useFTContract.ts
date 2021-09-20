import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'
import { alertMessageState } from 'state/recoil'
import { useNearHooksContainer } from '@cura/hooks'

const FT_CONTRACT_NAME = process.env.YSN_ADDRESS

export default function useFTContract() {
    const [contract, setContract] = useState({ account: null })
    const { getContract, accountId } = useNearHooksContainer()

    const setupContract = () => {
        const newContract = getContract(
            FT_CONTRACT_NAME,
            getContractMethods(FT_CONTRACT_NAME)
        )

        setContract(newContract)
    }

    // If contractName or accountId changes a new contract is setup
    useEffect(setupContract, [accountId])

    return { contract }
}

export const useFTMethod = (methodName, params, gas) => {
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const { contract } = useFTContract()

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

    if (error) {
        setAlertMessage(error.toString())
    }

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
