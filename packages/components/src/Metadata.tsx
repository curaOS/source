// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Box, Heading, Text } from 'theme-ui'

export function Metadata({
    title,
    creator,
}: {
    title?: string
    creator?: string
}) {
    return (
        <Box
            sx={{
                width: 300,
                px: 20,
            }}
        >
            <Heading
                as="h2"
                sx={{
                    mt: 2,
                    letterSpacing: 8,
                }}
            >
                {title}
            </Heading>
            <Text
                sx={{
                    color: 'secondary',
                    fontSize: 12,
                }}
            >
                TITLE
            </Text>
            <Heading
                as="h3"
                sx={{
                    mt: 2,
                }}
            >
                {creator}
            </Heading>
            <Text
                sx={{
                    color: 'secondary',
                    fontSize: 12,
                }}
            >
                CREATOR
            </Text>
        </Box>
    )
}
