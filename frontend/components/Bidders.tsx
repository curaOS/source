// @ts-nocheck
/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Heading, Text, Button } from 'theme-ui'
import { utils } from 'near-api-js'

export default function CreatorShare({
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
    console.log(bidders)
    return (
        <Box
            sx={{
                width: 300,
                pb: 12,
                pt: 1,
                px: 20,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: 'muted',
                borderRadius: 4,
            }}
        >
            <Text sx={{ color: 'secondary', fontSize: 12 }}>BIDS</Text>
            {!Object.entries(bidders).length && (
                <div>
                    <Heading as="h5" sx={{ color: 'text' }}>
                        -
                    </Heading>
                </div>
            )}
            {Object.entries(bidders).map(([bidder, bid]) => {
                return (
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <div>
                            <Heading as="h5" sx={{ color: 'text' }}>
                                {bid.bidder}
                            </Heading>
                        </div>
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'right',
                            }}
                        >
                            <Heading as="h5" sx={{ color: 'text' }}>
                                {utils.format.formatNearAmount(bid.amount, 5)}Ⓝ
                            </Heading>
                            <Text sx={{ fontSize: 12 }}>
                                Resale Fee{' '}
                                <b>{parseInt(bid.sell_on_share) / 100}%</b>
                            </Text>
                            <Button
                                sx={{ pt: 0, pb: 0, fontSize: 12 }}
                                onClick={() => onAcceptBid(bidder)}
                            >
                                Accept
                            </Button>
                        </div>
                    </div>
                )
            })}
        </Box>
    )
}
