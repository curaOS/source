// @ts-nocheck
/** @jsxImportSource theme-ui */
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Text,
    Divider,
    NavLink,
    Spinner,
    Alert,
    Close,
    Box,
    Paragraph,
} from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { appStore, onAppMount } from '../state/app'
import Link from 'next/link'
import Image from 'next/image'
import { utils, Contract } from 'near-api-js'
import { indexLoaderState } from '../state/recoil'
import { useRecoilState } from 'recoil'

const FT_CONTRACT_NAME = process.env.YSN_ADDRESS

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

const Index = () => {
    const [alertMessage, setAlertMessage] = useState('')
    const [ftBalance, setFTBalance] = useState(0)
    const [treasury, setTreasury] = useState(0)
    const [ftSupply, setFTSupply] = useState(0)
    const { state, dispatch } = useContext(appStore)
    const { wallet, account, loading } = state

    const [indexLoader, setIndexLoader] = useRecoilState(indexLoaderState)

    const contractFT = new Contract(account, FT_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['ft_balance_of', 'ft_total_supply', 'get_treasury'],
    })

    const signIn = () => {
        wallet.signIn()
    }
    const signOut = () => {
        wallet.signOut()
    }

    const onMount = () => {
        dispatch(onAppMount())
    }

    useEffect(() => {
        if (!account) return
        retrieveFTDetails()
    }, [account])

    useEffect(onMount, [])

    if (loading) {
        return null
    }

    async function retrieveFTDetails() {
        setIndexLoader(true)

        try {
            const balance: string = await contractFT.ft_balance_of({
                account_id: account?.accountId,
            })
            const supply: string = await contractFT.ft_total_supply({})
            const treasury: string = await contractFT.get_treasury({})

            setFTBalance(utils.format.formatNearAmount(balance, 5)) // decimals for YSN is same as NEAR
            setFTSupply(utils.format.formatNearAmount(supply, 5))
            setTreasury(utils.format.formatNearAmount(treasury, 5))

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    return (
        <>
            <Head>
                <title>Ysn</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <header
                    sx={{
                        marginBottom: `1.45rem`,
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `1rem 2rem 0 2rem`,
                    }}
                >
                    {alertMessage && (
                        <Alert>
                            <Text>{alertMessage.substring(0, 80)} ...</Text>
                            {console.log(alertMessage)}
                            <Close
                                ml="auto"
                                mr={-2}
                                sx={{ height: '2rem', width: '4rem' }}
                                onClick={() => setAlertMessage('')}
                            />
                        </Alert>
                    )}
                    <div
                        sx={{
                            margin: `1rem auto 0rem auto`,
                            background: `black`,
                            maxWidth: 960,
                            padding: `0.02rem 0rem`,
                        }}
                    />
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: ['column', 'row'],
                            justifyContent: ['space-between'],
                            alignItems: ['center'],
                            mt: [3, 0],
                            flexWrap: 'wrap',
                        }}
                    >
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mx: 3,
                                flexWrap: 'wrap',
                                flex: '1 1 0%',
                            }}
                        >
                            <>
                                {!account?.accountId ? (
                                    <Button onClick={signIn} bg="primary">
                                        {' '}
                                        Connect NEAR{' '}
                                    </Button>
                                ) : (
                                    <Button onClick={signOut} bg="secondary">
                                        {' '}
                                        Disconnect{' '}
                                    </Button>
                                )}
                            </>
                        </div>
                        <Link href="/ysn">
                            <Text
                                sx={{
                                    flex: 'none',
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontFamily: 'IBM Plex Sans, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '4rem',
                                    marginRight: '1rem',
                                }}
                            >
                                YSN
                            </Text>
                        </Link>
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mx: 3,
                                flexWrap: 'wrap',
                                flex: '1 1 0%',
                            }}
                        >
                            {account?.accountId ? (
                                <div>
                                    <p>{account?.accountId}</p>
                                </div>
                            ) : (
                                <div>[blank]</div>
                            )}
                        </div>
                    </div>
                </header>
                <div
                    sx={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0 1rem`,
                        textAlign: 'center',
                    }}
                >
                    <Link href="/">
                        <NavLink href="#!">
                            <span
                                sx={{
                                    fontSize: 22,
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
                                SHARE
                            </span>
                        </NavLink>
                    </Link>
                </div>
                <div
                    sx={{
                        marginBottom: `1.45rem`,
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0rem 2rem`,
                        minHeight: '70vh',
                    }}
                >
                    <Divider />
                    {indexLoader && (
                        <div
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                        >
                            <Spinner />
                        </div>
                    )}
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
                                <GradientText text={` ${ftBalance} YSN`} />.
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
                                <GradientText text={` ${ftSupply} YSN`} />.
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
                                <GradientText text={`${treasury} NEAR`} />{' '}
                                locked in the contract.
                            </Paragraph>
                            <Box sx={{ borderTop: '1px solid black', mt: 5 }}>
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
                                    <GradientText text={` SHARE`} /> sales and
                                    royalties.
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
                <div
                    sx={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `1rem 2rem`,
                    }}
                >
                    <div
                        sx={{
                            margin: `1rem auto`,
                            background: `black`,
                            maxWidth: 960,
                            padding: `0.02rem 0rem`,
                        }}
                    />
                    <footer
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            sx={{
                                marginTop: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                sx={{
                                    ':hover': {
                                        opacity: '0.5',
                                    },
                                }}
                                href="https://twitter.com/Yassine_2024"
                            >
                                <Image
                                    src="/twitter-logo-black.png"
                                    alt="Black logo"
                                    width={30}
                                    height={25}
                                />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

Index.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Index
