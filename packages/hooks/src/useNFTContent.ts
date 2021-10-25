// @ts-nocheck
import useSWR from 'swr'

type NFTContentType = 'image' | 'video' | 'audio' | 'text' | 'html' | 'other'

type useNFTContentType = {
    error: string | undefined
    loading: boolean | undefined
    contentType: NFTContentType | undefined
}

/**
 * Hook to fetch NFT content type from uri
 *
 * @param {string} mediaURI - URI of the NFT media
 * @returns {useNFTContentType} { error, loading, contentType }
 */

export function useNFTContentType(mediaURI: string): useNFTContentType {
    const fetchContentType = async (URI: string) => {
        const response = await fetch(URI, { method: 'HEAD' }).then((r) => {
            const mimeType = r.headers.get('Content-type')

            let contentType: NFTContentType = 'other'
            if (mimeType.includes('image')) contentType = 'image'
            if (mimeType.includes('video')) contentType = 'video'
            if (mimeType.includes('audio')) contentType = 'audio'
            if (mimeType.includes('plain')) contentType = 'text'
            if (mimeType.includes('html')) contentType = 'html'

            return contentType
        })

        return response
    }

    const { data, error } = useSWR([mediaURI], fetchContentType)

    return {
        error: error,
        loading: !error && !data,
        contentType: data,
    }
}
