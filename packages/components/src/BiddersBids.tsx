// @ts-nocheck
/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Button } from 'theme-ui'
import { utils } from 'near-api-js'

export function BiddersBids({
    biddersBids = [],
    onRemoveBid,
}: {
    biddersBids: {
        [key: string]: {
            amount: string
            bidder: string
            recipient: string
            sell_on_share: number
            currency: string
        }
    }
    onRemoveBid: (bidder: string) => void
}) {
    return (
        <Box
            sx={{
                width: [300, 360, 400],
                bg: 'bg',
                p: 3,
            }}
        >
            <Heading mb={3} variant="h3">
                BIDS
            </Heading>
            {!Object.entries(biddersBids).length && (
                <Box>
                    <Heading as="h5">-</Heading>
                </Box>
            )}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 50,
                }}
            >
                {Object.entries(biddersBids).map(([token_id, bid]) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Heading as="h5" variant="body" mb={2}>
                                    {token_id}
                                </Heading>
                                <Button
                                    sx={{ fontSize: 13 }}
                                    onClick={() =>
                                        onRemoveBid(token_id, bid.bidder)
                                    }
                                >
                                    remove
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    minWidth: 120,
                                }}
                            >
                                <Box
                                    sx={{
                                        lineHeight: 1,
                                    }}
                                >
                                    <Text
                                        mr="2"
                                        variant="monospace"
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {utils.format.formatNearAmount(
                                            bid.amount,
                                            5
                                        )}
                                    </Text>
                                    <Text variant="currency">Ⓝ</Text>
                                </Box>
                                <Text sx={{ fontSize: 0 }} mt="2">
                                    Resale Fee{' '}
                                    {parseInt(bid.sell_on_share) / 100}%
                                </Text>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
