// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box, Heading, Text } from 'theme-ui'

export function CreatorShare({
    address,
    share,
}: {
    address?: string
    share?: string
}) {
    return (
        <Box
            sx={{
                width: ['100%', '100%', 400],
                textAlign: 'left',
                py: 20,
                bg: 'bg',
            }}
        >
            <Heading variant="h3" mb={2}>ROYALTIES</Heading>
            <Text
                variant="body"
            >
                {address}  _________ {parseInt(share) / 100}%
            </Text>
        </Box>
    )
}
