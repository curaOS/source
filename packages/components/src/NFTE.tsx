// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box } from 'theme-ui'
import { Metadata } from './Metadata'
import { RenderIframe } from './RenderIframe'
import { Placeholder } from './Placeholder'

import { useEffect, useState } from 'react'
import { connect, Contract } from 'near-api-js'

async function getNFT(
    contractAddress: string,
    tokenId: string
) {
    const config = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
    }

    const loadNfts = async () => {
        try {
            const near = await connect({ ...config, deps: { keyStore: null } })
            const account = await near.account(null)

            const contract = await new Contract(account, contractAddress, {
                viewMethods: ['nft_token'],
                changeMethods: [''],
            })

            const res = await contract.nft_token({ token_id: tokenId })
            return res
        } catch (e) {
            throw e
        }
    }

    const data = await loadNfts()

    return data
}

const tempNft = {
    id: '',
    owner_id: '',
    creator: '',
    prev_owner: '',
    metadata: {
        title: '',
        issued_at: '',
        copies: 0,
        media: '',
        extra: '',
        description: '',
        media_hash: '',
        expires_at: '',
        starts_at: '',
        updated_at: '',
        reference: '',
        reference_hash: '',
    },
}

export function NFTE({
    contract,
    tokenId,
    isDark = true,
}: {
    contract?: string
    tokenId?: string
    isDark?: boolean
}) {
    const [NFTData, setNFTData] = useState(tempNft)
    const [loading, setLoading] = useState(true)

    const width = 400

    useEffect(() => {
        getNFT(contract, tokenId).then((data) => {
            setNFTData(data)
            setLoading(false)
        })
    }, [])

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
                <RenderIframe
                    loading={loading}
                    mediaURI={`https://arweave.net/${NFTData.metadata.media}`}
                    width={width}
                    height={width}
                    sx={{
                        borderTopRightRadius: 2,
                        borderTopLeftRadius: 2,
                        bg: 'gray.3',
                    }}
                />
            ) : (
                <Placeholder width={width} height={width} style={{ my: 0 }} />
            )}

        <Metadata
                title={NFTData.metadata.title}
                description={NFTData.metadata.description}
                creator={NFTData.creator}
                owner={NFTData.owner_id}
                width={width}
                loading={loading}
            />
        </Box>
    )
}
