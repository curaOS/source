// @ts-nocheck
/** @jsxImportSource theme-ui */
import { useNFT, useNFTContractMetadata, useNFTReference } from '@cura/hooks'

import { Container } from 'theme-ui'
import { useBreakpointIndex } from '@theme-ui/match-media'
import { Metadata } from './Metadata'
import { MediaObject } from './MediaObject'

export function NFTE({
    contract,
    tokenId,
    isDark = false,
}: {
    contract: string
    tokenId: string
    isDark: boolean
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
            sx={{
                pb: 12,
                border: '2px solid',
                width: canvasSize + 4,
                borderRadius: 4,
                borderColor: isDark ? 'gray.4' : 'muted',
                backgroundColor: isDark ? 'gray.9' : 'white',
                color: isDark ? 'white' : 'gray.9',
            }}
        >
            {error && !loading ? (
                <p sx={{ color: 'red.6' }}> ❌ Error: {error.type}</p>
            ) : (
                <>
                    <MediaObject
                        mediaURI={mediaUri || ''}
                        width={canvasSize}
                        height={canvasSize}
                        loading={loading}
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
