/** @jsxImportSource theme-ui */
import { Box, Heading, Text, Button } from 'theme-ui'
import { utils } from 'near-api-js'

export function Bidders({
    bidders = {},
    onAcceptBid,
}: {
    bidders: {
        [key: string]: {
            amount: string
            bidder: string
            recipient: string
            sell_on_share: number
            currency: string
        }
    }
    onAcceptBid: (bidder: string) => void
}) {
    return (
        <Box
            sx={{
                width: [300, 360, 400],
                bg: 'bg',
                p: 3,
            }}
        >
            <Heading sx={{ color: 'white', mb: 2 }} variant="body">
                BIDS
            </Heading>
            {!Object.entries(bidders).length && (
                <div>
                    <Heading as="h5" sx={{ color: 'text' }}>
                        -
                    </Heading>
                </div>
            )}
            <div
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 50,
                }}
            >
                {Object.entries(bidders).map(([bidder, bid]) => {
                    return (
                        <div
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div>
                                <Heading as="h4" variant="body" mb={2}>
                                    {bid.bidder}
                                </Heading>
                                <Button
                                    sx={{ fontSize: 13 }}
                                    onClick={() => onAcceptBid(bidder)}
                                >
                                    accept
                                </Button>
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    minWidth: 120,
                                }}
                            >
                                <div
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
                                </div>
                                <Text sx={{ fontSize: 0 }} mt="2">
                                    Resale Fee {bid.sell_on_share / 100}%
                                </Text>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Box>
    )
}
