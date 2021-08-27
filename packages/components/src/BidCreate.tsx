// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Box, Heading, Select, Label, Input, Button } from 'theme-ui'

export function BidCreate({
    onBid,
}: {
    onBid: (amount: string, resale: string) => void
}) {
    const [amount, setAmount] = useState(null)
    const [resale, setResale] = useState('0')

    return (
        <Box
            sx={{
                width: 300,
                px: 20,
            }}
            as="form"
            onSubmit={(e) => {
                e.preventDefault()
                onBid(amount, resale)
            }}
        >
            <Label htmlFor="currency" sx={{ mb: 1 }}>
                Currency
            </Label>
            <Select name="currency" id="currency" mb={1}>
                <option>NEAR</option>
            </Select>
            <Label htmlFor="amount" sx={{ mb: 1 }}>
                Amount
            </Label>
            <Input
                type="number"
                step="0.01"
                name="amount"
                id="amount"
                mb={3}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Label htmlFor="amount" sx={{ mb: 1 }}>
                Resale fee
            </Label>
            <Input
                type="number"
                step="1"
                name="resale"
                id="resale"
                mb={3}
                value={resale}
                onChange={(e) => setResale(e.target.value)}
            />
            <Button sx={{ width: '100%' }} disabled={!amount} variant="uno">
                <b>
                    {amount ? `${amount} Ⓝ` : 'Bid'}{' '}
                    {amount ? `+ ${resale}%` : ''}
                </b>
            </Button>
        </Box>
    )
}
