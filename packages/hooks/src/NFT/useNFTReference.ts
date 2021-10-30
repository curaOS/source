import useSWR from 'swr'

export type useNFTReferenceType = {
    error?: string
    loading: boolean
    data?: object
}

const fetchNFTReference = async (URI: string) => {
    const response = await fetch(URI)

    const data = await response.json()
    return data
}

/**
 * Fetches off-chain NFT metadata from the reference for the given URI
 *
 * @param uri NFT reference URI
 * @returns results include loading, error, and off-chain NFT metadata
 */

export function useNFTReference(uri: string): useNFTReferenceType {
    let { data, error } = useSWR(uri ? [uri] : null, fetchNFTReference)
    error =
        error || (!uri && 'provided reference URI is not valid') || undefined
    return {
        error: error,
        loading: !error && !data,
        data: data,
    }
}
