import { useNFTViewMethod } from './useNFTViewMethod'

export type useNFTContractMetadataType = {
    error?: string
    loading: boolean
    data?: object
}

/**
 * Fetches on-chain NFT contract metadata for the given Contract
 *
 * @param contractAddress address of the contract
 * @returns results include loading, error, and on-chain NFT contract metadata
 */

export function useNFTContractMetadata(
    contractAdress: string
): useNFTContractMetadataType {
    const NFTMeta = useNFTViewMethod(contractAdress, 'nft_metadata', {})

    return {
        error: NFTMeta?.error,
        loading: NFTMeta.loading,
        data: NFTMeta?.data,
    }
}
