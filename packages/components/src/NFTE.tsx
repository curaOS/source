// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'
import { Metadata } from './Metadata'
import { MediaObject } from './MediaObject'
import { Placeholder } from './Placeholder'

import { useEffect, useState } from 'react'
import { useViewNFTMethod } from '@cura/hooks'

export function NFTE({
    contract,
    tokenId,
    isDark = true,
}: {
    contract: string
    tokenId: string
    isDark: boolean
}) {
    const [NFTData, setNFTData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const width = 400

    const { loading, data } = useViewNFTMethod(contract, 'nft_token', {
        token_id: tokenId,
    })
    useEffect(() => {
        setNFTData(data)
        setIsLoading(loading)
    }, [contract, tokenId, data])

    return (
        <Box
            sx={{
                pb: 12,
                width: width + 4,
                border: '2px solid',
                borderRadius: 4,
                borderColor: isDark ? 'gray.4' : 'muted',
                backgroundColor: isDark ? 'gray.9' : 'white',
                color: isDark ? 'white' : 'gray.9',
            }}
        >
            {!loading && NFTData?.metadata?.media ? (
                <MediaObject
                    mediaURI={`https://arweave.net/${NFTData?.metadata?.media}`}
                    width={width}
                />
            ) : (
                <Placeholder width={width} height={width} style={{ my: 0 }} />
            )}

            <Metadata
                title={NFTData?.metadata?.title}
                description={NFTData?.metadata?.description}
                creator={NFTData?.creator}
                owner={NFTData?.owner_id}
                width={width}
                loading={loading}
            />
        </Box>
    )
}
