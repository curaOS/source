// @ts-nocheck
/** @jsxImportSource theme-ui */
import {
    useNFT,
    useNFTContractMetadata,
    useNFTReference,
    useNFTContentType,
} from '@cura/hooks'

import { Container, Text } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Metadata } from './Metadata'
import { MediaObject } from './MediaObject'

export function NFTE({
    contract,
    tokenId,
}: {
    contract: string
    tokenId: string
}) {
    const canvasSizes = [290, 300, 400, 400, 400]
    const breakpointIndex = useBreakpointIndex()
    const canvasSize = canvasSizes[breakpointIndex]

    // Get NFT contract metadata
    const {
        error: NFTContractMetadataError,
        loading: NFTContractMetadataLoading,
        data: NFTContractMetadata,
    } = useNFTContractMetadata(contract)

    const baseURI = NFTContractMetadata?.base_uri || 'https://arweave.net/'

    // Get NFT token metadata
    const {
        error: NFTError,
        loading: NFTLoading,
        data: NFTMetadata,
    } = useNFT(contract, tokenId)

    const referenceURI = validateURI(NFTMetadata?.metadata?.reference, baseURI)

    // Get NFT reference
    const {
        error: NFTReferenceError,
        loading: NFTReferenceLoading,
        data: NFTReference,
    } = useNFTReference(referenceURI)

    // replace null values from NFTMetadata with values from the NFTReference
    const finalNFTMetadata = {
        ...NFTMetadata,
        metadata: {
            title: NFTMetadata?.metadata?.title || NFTReference?.title,
            description:
                NFTMetadata?.metadata?.description || NFTReference?.description,
            media: NFTMetadata?.metadata?.media || NFTReference?.media,
        },
        owner_id: NFTMetadata?.owner_id?.Account || NFTMetadata?.owner_id,
        creator_id:
            NFTMetadata?.creator_id?.Account ||
            NFTMetadata?.creator_id ||
            NFTMetadata?.creator ||
            NFTReference?.creator_id,
    }

    const mediaUri = validateURI(finalNFTMetadata?.metadata?.media, baseURI)

    // Determine media type
    const { loading: mediaTypeLoading, data: mediaType } = useNFTContentType(
        mediaUri || ''
    )

    let error =
        NFTContractMetadataError ||
        NFTError ||
        (!NFTMetadata && { type: 'invalid NFTMetadata' })

    let loading =
        NFTContractMetadataLoading || NFTLoading || NFTReferenceLoading
    loading = loading && error

    error && !loading && console.error(error)

    return (
        <Container
            p={[0,0,0]}
            sx={{
                width: canvasSize,
                bg: 'bg',
            }}
        >
            {error && !loading ? (
                <Text variant="h3" sx={{ color: 'red.6', lineHeight: 4 }}> ❌ Error: {error.type}</Text>
            ) : (
                <>
                    <MediaObject
                        mediaURI={mediaUri || ''}
                        type={mediaType}
                        width={canvasSize}
                        height={canvasSize}
                        loading={loading && mediaTypeLoading}
                    />
                    <Metadata
                        data={finalNFTMetadata}
                        width={canvasSize}
                        loading={loading}
                    />
                </>
            )}
        </Container>
    )
}

function validateURI(uri = '', base_uri = '') {
    if (!uri) return
    if (uri?.includes('http')) return uri

    return base_uri.replace(/\/$/, '') + '/' + uri.replace(/^\//, '')
}
