import { useEffect, useState } from 'react'
import { getContractMethods } from 'utils/near-utils'
import Near from 'containers/near'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { accountState } from 'state/account'
import useSWR from 'swr'
import { alertMessageState, indexLoaderState } from 'state/recoil'
import { utils } from 'near-api-js'

const FT_CONTRACT_NAME = process.env.YSN_ADDRESS
const GAS_CAP = utils.format.parseNearAmount('0.0000000003') // 300 Tgas

export default function useFTContract() {
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

export const useFTMethod = (methodName, params, gas) => {
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { contract } = useFTContract()

    const validParams = contract.account

    const fetcher = (methodName, serializedParams) => {
        const params = JSON.parse(serializedParams)
        return contract[methodName]({ ...params }, gas).then((res) => {
            return res
        })
    }

    const { data, error } = useSWR(
        validParams ? [methodName, JSON.stringify(params)] : null,
        fetcher,
        {
            dedupingInterval: 0,
        }
    )

    if (!error && !data) {
        setIndexLoader(true)
    } else {
        setIndexLoader(false)
    }

    if (error) {
        setAlertMessage(error.toString())
    }

    return {
        data: data,
        loading: !error && !data,
        error: error,
    }
}
