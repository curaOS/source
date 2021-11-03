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
    content?: string
}

const fetchContentType = async (URI: string) => {
    const response = await fetch(URI)
    const mimeType = await response.headers.get('Content-type')

    let contentType: ContentType = 'other',
        content: string = ''

    if (mimeType?.includes('image')) contentType = 'image'
    if (mimeType?.includes('video')) contentType = 'video'
    if (mimeType?.includes('audio')) contentType = 'audio'
    if (mimeType?.includes('plain')) contentType = 'text'
    if (mimeType?.includes('html')) contentType = 'html'

    if (contentType == 'text') content = await response.text()

    return { contentType, content }
}

/**
 * Hook to fetch NFT content type from URI,
 * and returns the content if contentType='text'
 * @param {string} mediaURI - URI of the NFT media
 * @returns {useNFTContentTypeType} { error, loading, data, content }
 */

export function useNFTContentType(mediaURI: string): useNFTContentTypeType {
    const { data, error } = useSWR([mediaURI], fetchContentType)

    return {
        error: error,
        loading: !error && !data,
        data: data?.contentType,
        content: data?.content,
    }
}
