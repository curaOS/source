// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Box, Paragraph } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { utils, Contract } from 'near-api-js'
import Layout from 'containers/Layout'
import { useNearHooksContainer, useFTMethod } from '@cura/hooks'

const GradientText = ({ text }: { text: string }) => {
    return (
        <span
            sx={{
                fontWeight: 600,
                backgroundImage: (t) => `
        linear-gradient(
            to right,
            ${alpha('secondary', 1)(t)},
            ${alpha('text', 0.2)(t)}
        )
        `,
                backgroundClip: 'text',
                textFillColor: 'transparent',
            }}
        >
            {text}
        </span>
    )
}

const formatBalance = (data, loading) => {
    return loading ? '-' : utils.format.formatNearAmount(data, 5)
}

const Ysn = () => {
    const { accountId } = useNearHooksContainer()

    const { data: ftBalance, loading: loadingFTBalance } = useFTMethod(
        'ysn-1_0_0.ysn.testnet',
        'ft_balance_of',
        {
            account_id: accountId,
        }
    )

    const { data: ftSupply, loading: loadingFTSupply } = useFTMethod(
        'ysn-1_0_0.ysn.testnet',
        'ft_total_supply',
        {}
    )

    const { data: treasury, loading: loadingTreasury } = useFTMethod(
        'ysn-1_0_0.ysn.testnet',
        'get_treasury',
        {}
    )

    return (
        <Layout>
            <>
                <div style={{ minHeight: '100vh' }}>
                    <div
                        sx={{
                            marginBottom: `1.45rem`,
                            margin: `0 auto`,
                            maxWidth: 960,
                            padding: `0rem 2rem`,
                            minHeight: '70vh',
                        }}
                    >
                        <>
                            <div
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    mb: 3,
                                    textAlign: 'center',
                                }}
                            >
                                <Paragraph
                                    sx={{
                                        maxWidth: 300,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        mt: 2,
                                    }}
                                >
                                    You currently have accumulated
                                    <GradientText
                                        text={` ${formatBalance(
                                            ftBalance,
                                            loadingFTBalance
                                        )} YSN`}
                                    />
                                    .
                                </Paragraph>
                                <Paragraph
                                    sx={{
                                        maxWidth: 300,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        mt: 2,
                                    }}
                                >
                                    Contract has a current supply of
                                    <GradientText
                                        text={` ${formatBalance(
                                            ftSupply,
                                            loadingFTSupply
                                        )} YSN`}
                                    />
                                    .
                                </Paragraph>
                                <Paragraph
                                    sx={{
                                        maxWidth: 300,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        mt: 2,
                                    }}
                                >
                                    There is{' '}
                                    <GradientText
                                        text={`${formatBalance(
                                            treasury,
                                            loadingTreasury
                                        )} NEAR`}
                                    />{' '}
                                    locked in the contract.
                                </Paragraph>
                                <Box
                                    sx={{ borderTop: '1px solid black', mt: 5 }}
                                >
                                    <Paragraph
                                        sx={{
                                            maxWidth: 300,
                                            fontSize: 20,
                                            fontWeight: 400,
                                            pt: 5,
                                        }}
                                    >
                                        At the moment,{' '}
                                        <GradientText text={`YSN `} />
                                        is minted every time you interact with{' '}
                                        <GradientText text={` SHARE`} />. The{' '}
                                        <GradientText text={`NEAR`} /> treasury
                                        grows through{' '}
                                        <GradientText text={` SHARE`} /> sales
                                        and royalties.
                                    </Paragraph>
                                </Box>
                                <Paragraph
                                    sx={{
                                        maxWidth: 300,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        mt: 5,
                                    }}
                                >
                                    Features are coming soon.
                                </Paragraph>
                            </div>
                        </>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Ysn
