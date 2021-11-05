import { useNFTViewMethod } from './useNFTViewMethod'

export type useNFTType = {
    error?: string
    loading: boolean
    data?: object
}

/**
 * Fetches on-chain NFT metadata for the given ContractAdress and TokenID
 *
 * @param contractAddress address of the contract
 * @param tokenId id of the NFT
 * @returns {useNFTType} results include loading, error, and on-chain NFT token metadata
 */

export function useNFT(contractAdress: string, tokenId: string): useNFTType {
    const NFT = useNFTViewMethod(contractAdress, 'nft_token', {
        token_id: tokenId,
    })

    return {
        error: NFT?.error,
        loading: NFT.loading,
        data: NFT?.data,
    }
}
