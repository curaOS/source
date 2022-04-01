// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Box, Select, Label, Input, Button, Text } from 'theme-ui'

export function BidCreate({
    onBid,
    maxResale
}: {
    onBid: (amount: string, resale: string) => void,
    maxResale?: number
}) {
    const [amount, setAmount] = useState(null)
    const [resale, setResale] = useState('0')

    return (
        <Box
            sx={{
                variant: 'forms.primary',
            }}
            as="form"
            onSubmit={(e) => {
                e.preventDefault()
                onBid(amount, resale)
            }}
        >
            <Box sx={{ variant: 'forms.primary.row' }}>
                <Label htmlFor="currency">CURRENCY</Label>
                <Box sx={{ variant: 'forms.primary.selectParent' }}>
                    <Select
                        name="currency"
                        id="currency"
                        arrow={
                            <Box
                                as="svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="13"
                                viewBox="0 0 8 13"
                                fill="none"
                                sx={{
                                    stroke: 'text',
                                    ml: -16,
                                    alignSelf: 'center',
                                    pointerEvents: 'none',
                                }}
                            >
                                <path
                                    strokeWidth="0.863309"
                                    d="M0.849742 12.0426L6.46348 6.41633L0.855148 1.0071"
                                />
                            </Box>
                        }
                    >
                        <option>NEAR</option>
                    </Select>
                </Box>
            </Box>
            <Box sx={{ variant: 'forms.primary.row' }}>
                <Label htmlFor="amount">AMOUNT</Label>
                <Input
                    type="number"
                    step="0.01"
                    name="amount"
                    id="amount"
                    value={amount}
                    min={0}
                    autoComplete="off"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Box>
            <Box sx={{ variant: 'forms.primary.row' }}>
                <Label htmlFor="resale">RESALE FEE</Label>
                <Input
                    type="number"
                    step="1"
                    name="resale"
                    id="resale"
                    value={resale}
                    min={0}
                    max={100}
                    autoComplete="off"
                    onChange={(e) => {
                        if(e.target.value <= 100){
                            setResale(e.target.value)
                        }
                    }}
                />
            </Box>

            {((maxResale || maxResale === 0) && resale > maxResale) &&
                <Box
                    sx={{
                        variant: 'forms.primary.row',
                        borderBottom: 'none !important',
                        paddingTop: 2
                    }}
                >
                    <Text sx={{ variant: 'error' }}>Must be no more than {maxResale}% to respect contract resale royalty</Text>
                </Box>
            }
            <Button
                disabled={!amount || Number(resale) > maxResale}
                mt={24}
                sx={{
                    width: ['100%', '100%', '100%', 'unset'],
                }}
            >
                {amount ? (
                    <>
                        {amount} <Text variant="currency">Ⓝ</Text> + {resale}%
                    </>
                ) : (
                    'bid'
                )}
            </Button>
        </Box>
    )
}
