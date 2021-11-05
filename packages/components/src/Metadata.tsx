/** @jsxImportSource theme-ui */

import { Box, Flex } from 'theme-ui'
import { Placeholder } from './Placeholder'

type NFTMetadataType = {
    creator_id?: string
    owner_id?:
        | string
        | {
              Account: string
          }
    metadata: {
        title?: string
        description?: string
    }
}

export function Metadata({
    data,
    loading = true,
    width = 400,
}: {
    data: NFTMetadataType
    loading: boolean
    width: number | string
}) {
    return (
        <Box
            sx={{
                width: width,
                maxWidth: '90vw',
                px: 20,
                fontFamily: 'inherit',
            }}
        >
            {loading ? <MetadataLoading /> : <MetadataLoaded {...data} />}
        </Box>
    )
}
function MetadataLoaded({
    metadata: { title, description },
    creator_id: creator,
    owner_id: owner,
}: NFTMetadataType) {
    return (
        <>
            {title && (
                <p
                    sx={{
                        mt: 2,
                        mb: 1,
                        fontWeight: 700,
                        fontSize: 20,
                    }}
                >
                    {title}
                </p>
            )}

            {description && (
                <p
                    sx={{
                        fontSize: 16,
                        opacity: 0.8,
                        my: 0,
                    }}
                >
                    {description}
                </p>
            )}
            <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {creator && (
                    <Box mt={3}>
                        <p
                            sx={{
                                fontSize: 14,
                                fontWeight: 500,
                                my: 0,
                            }}
                        >
                            Created by
                        </p>
                        <a
                            href={`https://explorer.testnet.near.org/accounts/${creator}`}
                            target="_blank"
                            sx={{
                                fontSize: 16,
                                fontWeight: 600,
                                my: 0,
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    opacity: 0.8,
                                },
                            }}
                        >
                            {creator}
                        </a>
                    </Box>
                )}

                {owner && (
                    <Box mt={3}>
                        <p
                            sx={{
                                fontSize: 14,
                                fontWeight: 500,
                                my: 0,
                            }}
                        >
                            Owned by
                        </p>
                        <a
                            href={`https://explorer.testnet.near.org/accounts/${owner}`}
                            target="_blank"
                            sx={{
                                fontSize: 16,
                                fontWeight: 600,
                                my: 0,
                                color: 'inherit',
                                textDecoration: 'none',
                                '&:hover': {
                                    opacity: 0.8,
                                },
                            }}
                        >
                            {owner}
                        </a>
                    </Box>
                )}
            </Flex>
        </>
    )
}
function MetadataLoading() {
    return (
        <>
            <Placeholder width="40%" style={{ mt: 3 }} />
            <Box mt={3}>
                <Placeholder width="70%" />
                <Placeholder width="50%" style={{ mb: 0 }} />
            </Box>
            <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Box mt={3}>
                    <p
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            my: 0,
                        }}
                    >
                        Created by
                    </p>
                    <Placeholder width="120%" />
                </Box>

                <Box mt={3}>
                    <p
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            my: 0,
                        }}
                    >
                        Owned by
                    </p>
                    <Placeholder width="120%" />
                </Box>
            </Flex>
        </>
    )
}
