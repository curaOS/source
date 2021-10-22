// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Box, Link } from 'theme-ui'
import { Placeholder } from './Placeholder'

export function Metadata({
    title,
    description,
    creator,
    owner,
    loading = false,
    width = 300,
}: {
    title?: string
    description?: string
    creator?: string
    owner?: string
    loading?: boolean
    width?: number
}) {
    return (
        <Box
            sx={{
                width: width + 'px',
                px: 20,
                fontFamily: 'inherit',
            }}
        >
            {loading ? (
                <Placeholder width={width * 0.4} style={{mt: 3}}/>
            ) : (
                title && (
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
                )
            )}

            {loading ? (
                <Box mt={3}>
                    <Placeholder width={width * 0.8} />
                    <Placeholder width={width * 0.5} style={{mb: 0}} />
                </Box>
            ) : (
                description && (
                    <p
                        sx={{
                            fontSize: 16,
                            opacity: 0.8,
                            my: 0,
                        }}
                    >
                        {description}
                    </p>
                )
            )}

            {(creator || loading) && (
                <div
                    sx={{
                        mt: 3,
                        display: 'inline-block',
                    }}
                >
                    <p
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            my: 0,
                        }}
                    >
                        Created by
                    </p>
                    {loading ? (
                        <Placeholder width={width * 0.3} />
                    ) : (
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
                    )}
                </div>
            )}

            {(owner || loading) && (
                <div
                    sx={{
                        mt: 3,
                        float: 'right',
                    }}
                >
                    <p
                        sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            my: 0,
                        }}
                    >
                        Owned by
                    </p>
                    {loading ? (
                        <Placeholder width={width * 0.3} />
                    ) : (
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
                    )}
                </div>
            )}
        </Box>
    )
}