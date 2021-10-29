import useSWR from 'swr'

export type ContentType =
    | 'image'
    | 'video'
    | 'audio'
    | 'text'
    | 'html'
    | 'other'

export type useNFTContentTypeType = {
    error?: string
    loading: boolean
    data?: ContentType
}

const fetchContentType = async (URI: string) => {
    const response = await fetch(URI, { method: 'HEAD' })
    const mimeType = response.headers.get('Content-type')

    let contentType: ContentType = 'other'
    if (mimeType?.includes('image')) contentType = 'image'
    if (mimeType?.includes('video')) contentType = 'video'
    if (mimeType?.includes('audio')) contentType = 'audio'
    if (mimeType?.includes('plain')) contentType = 'text'
    if (mimeType?.includes('html')) contentType = 'html'

    return contentType
}

/**
 * Hook to fetch NFT content type from uri
 *
 * @param {string} mediaURI - URI of the NFT media
 * @returns {useNFTContentTypeType} { error, loading, contentType }
 */

export function useNFTContentType(mediaURI: string): useNFTContentTypeType {
    const { data, error } = useSWR([mediaURI], fetchContentType)

    return {
        error: error,
        loading: !error && !data,
        data: data,
    }
}
