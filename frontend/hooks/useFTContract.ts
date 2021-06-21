import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import Near from 'containers/near'
import { useRecoilValue } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'

const FT_CONTRACT_NAME = process.env.YSN_ADDRESS

export default function useftContract() {
    const [contract, setContract] = useState({ account: null })
    const { getContract } = Near.useContainer()
    const { accountId } = useRecoilValue(accountState)

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

export const useFTBalance = () => {
    const methodName = 'ft_balance_of'

    const { contract } = useftContract()
    const { accountId } = useRecoilValue(accountState)

    const fetcher = (methodName, serializedParams) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }).then((res) => res)
    }

    const { data, error } = useSWR(
        contract.account
            ? [methodName, JSON.stringify({ account_id: accountId })]
            : null,
        fetcher
    )

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
