// @ts-nocheck
import { useEffect, useState } from 'react'
import { useNearHooksContainer } from '../near'
import { getContractMethods } from '../near-utils'

/**
 * Load and returns NFT contract from given ContractAddress
 *
 * @param {string} contractAddress - contract adress
 * @returns {object} { contract }
 */

export function useNFTContract(
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
