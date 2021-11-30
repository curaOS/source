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
}: {
    data: NFTMetadataType
    loading: boolean
    width: number | string
}) {
    return (
        <Box
            sx={{
                width: width || [360, 360, 400],
                maxWidth: '90vw',
                bg: 'bg',
                p: 20,
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
                <Heading my={3} variant="h2">
                    {title}
                </Heading>
            )}

            {description && <Text variant="body">{description}</Text>}
            <Flex
                mt={40}
                sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
                {creator && (
                    <Box>
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
                    <Box>
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
        </>
    )
}
function MetadataLoading() {
    return (
        <>
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
        </>
    )
}
