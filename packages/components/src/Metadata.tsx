/** @jsxImportSource theme-ui */

import { Box, Flex, Heading, Text, Link } from 'theme-ui'
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
    width,
    variant = 0,
}: {
    data: NFTMetadataType
    loading: boolean
    width: number | string
    variant: number
}) {
    return (
        <Box
            sx={{
                width: width || [360, 360, 800],
                maxWidth: '90vw',
                bg: 'bg',
            }}
        >
            {loading ? (
                <MetadataLoading />
            ) : variant == 0 ? (
                <MetadataLoaded {...data} />
            ) : (
                <MetadataLoadedSecondary {...data} />
            )}
        </Box>
    )
}
function MetadataLoaded({
    metadata: { title, description },
    creator_id: creator,
    owner_id: owner,
}: NFTMetadataType) {
    return (
        <Box p={20}>
            {title && (
                <Heading mb={3} variant="h2">
                    {title}
                </Heading>
            )}

            {description && <Text variant="body">{description}</Text>}
            <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {creator && (
                    <Box mt={30}>
                        <Heading variant="h3" mb={2}>
                            CREATED BY
                        </Heading>
                        <Link
                            href={`https://explorer.testnet.near.org/accounts/${creator}`}
                            target="_blank"
                            variant="explorer"
                        >
                            {creator}
                        </Link>
                    </Box>
                )}

                {owner && (
                    <Box mt={30}>
                        <Heading variant="h3" mb={2}>
                            OWNED BY
                        </Heading>
                        <Link
                            href={`https://explorer.testnet.near.org/accounts/${owner}`}
                            target="_blank"
                            variant="explorer"
                        >
                            {owner}
                        </Link>
                    </Box>
                )}
            </Flex>
        </Box>
    )
}
function MetadataLoadedSecondary({
    metadata: { title, description },
    creator_id: creator,
    owner_id: owner,
}: NFTMetadataType) {
    return (
        <Flex
            sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: [24, 34],
            }}
        >
            {title && (
                <Box>
                    <Heading variant="h3" mb={2}>
                        TITLE
                    </Heading>
                    <Heading variant="h4">{title}</Heading>
                </Box>
            )}
            {description && (
                <Box>
                    <Heading variant="h3" mb={2}>
                        DESCRIPTION
                    </Heading>
                    <Heading variant="h4">{description}</Heading>
                </Box>
            )}
            {creator && (
                <Box>
                    <Heading variant="h3" mb={2}>
                        CREATOR
                    </Heading>
                    <Heading variant="h4">{creator}</Heading>
                </Box>
            )}
            {owner && (
                <Box>
                    <Heading variant="h3" mb={2}>
                        OWNER
                    </Heading>
                    <Heading variant="h4">{owner}</Heading>
                </Box>
            )}
        </Flex>
    )
}
function MetadataLoading() {
    return (
        <Box p={20}>
            <Placeholder height={6} width="40%" style={{ mt: 3 }} />
            <Box mt={3}>
                <Placeholder height={4} width="70%" />
                <Placeholder height={4} width="50%" style={{ mb: 0 }} />
            </Box>
            <Flex
                mt={40}
                sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
                <Box>
                    <Heading variant="h3" mb={2}>
                        CREATED BY
                    </Heading>
                    <Placeholder height={4} width={120} />
                </Box>

                <Box>
                    <Heading variant="h3" mb={2}>
                        OWNED BY
                    </Heading>
                    <Placeholder height={4} width={120} />
                </Box>
            </Flex>
        </Box>
    )
}
