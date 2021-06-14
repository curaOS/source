// @ts-nocheck
/** @jsxImportSource theme-ui */

import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// import Header from "../../components/header"
// import Footer from "../../components/footer"
import CreatorShare from '../components/CreatorShare'
import Bidders from '../components/Bidders'
import Metadata from '../components/Metadata'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
    Button,
    Text,
    Divider,
    Flex,
    NavLink,
    Spinner,
    Alert,
    Close,
} from 'theme-ui'
import { alpha } from '@theme-ui/color'
import { appStore, onAppMount } from '../state/app'
import Link from 'next/link'
import Image from 'next/image'
import { utils, Contract } from 'near-api-js'
import { getContract } from '../utils/near-utils'
import { useBreakpointIndex } from '@theme-ui/match-media'
import BidCreate from 'components/BidCreate'
import { alertMessageState } from '../state/recoil'
import { useSetRecoilState } from 'recoil'

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const ALLOWED_EMOJIS = [
    128995, // 🟣
    128993, // 🟡️
    9899, // ⚫️
    9898, // ⚪️
    128308, // 🔴
    128992, // 🟠
    128994, // 🟢
    128309, // 🔵
    128996, // 🟤
    128999, // 🟧
    129000, // 🟨
    11035, // ⬛
    128997, // 🟥
    129001, // 🟩
    128998, // 🟦
    129002, // 🟪
    129003, // 🟫
    11036, // ⬜
]

const SCHEMA_SIZE = 5

const CustomEmojiPicker = ({ onEmojiPick }) => {
    return (
        <div>
            {ALLOWED_EMOJIS.map((emojiCode) => {
                return (
                    <Text
                        mx="2"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => onEmojiPick(emojiCode)}
                    >
                        {String.fromCodePoint(emojiCode)}
                    </Text>
                )
            })}
        </div>
    )
}

const P5Wrapper = dynamic(import('react-p5-wrapper'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const MARKET_SET_BIG_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_PRICE = utils.format.parseNearAmount('1') // 1N
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const MARKET_CONTRACT_NAME = process.env.SHARE_MARKET_ADDRESS
const FT_CONTRACT_NAME = process.env.YSN_ADDRESS

const SIZE = 32

const CANVAS_WIDTH = [300, 400, 500, 600, 700] // 0-4

const design = (instructions = [], mediaIndex = 0) => (p) => {
    let c = ''
    const designDimension = CANVAS_WIDTH[mediaIndex]

    const canvasStep = [
        designDimension / (SIZE * 1.1),
        designDimension / (SIZE * 1.1),
    ]
    const canvasTextSize = designDimension / (SIZE * 1.7)

    const canvasStart = [
        (designDimension - canvasStep[0] * (SIZE - 0.2)) / 2,
        (designDimension - canvasStep[1] * (SIZE - 1.5)) / 2,
    ]

    p.setup = () => {
        p.createCanvas(designDimension, designDimension)
        p.noLoop()
        if (instructions.length > 0) {
            p.background(0)
            p.textSize(canvasTextSize)
            for (let i = 0; i < SIZE; i++) {
                for (let j = 0; j < SIZE; j++) {
                    c = String.fromCodePoint(instructions[j + i * SIZE])

                    p.text(
                        c,
                        canvasStart[0] + j * canvasStep[0],
                        canvasStart[1] + i * canvasStep[1]
                    )
                }
            }
        }
    }
}

const Design = ({ instructions }: { instructions: Array<number> }) => {
    const mediaIndex = useBreakpointIndex()

    const renderP5 = (instructions: Array<number>) => {
        const sketch = design(instructions, mediaIndex)
        return <P5Wrapper sketch={sketch} />
    }

    return <div>{renderP5(instructions)}</div>
}

const Index = ({ children }) => {
    const setAlertMessage = useSetRecoilState(alertMessageState)

    const [indexLoader, setIndexLoader] = useState(false)
    const [section, setSection] = useState(2)
    const [seed, setSeed] = useState()
    const [schema, setSchema] = useState(new Set())
    const [designInstructions, setDesignInstructions] = useState()
    const [myDesign, setMyDesign] = useState({
        id: '',
        owner_id: '',
        instructions: [],
        metadata: {
            title: '',
        },
    })
    const [totalSupply, setTotalSupply] = useState(0)
    const [bidders, setBidders] = useState({})
    const [ftBalance, setFTBalance] = useState(0)
    const [randomDesign, setRandomDesign] = useState({
        id: '',
        owner_id: '',
        instructions: [],
        metadata: {
            title: '',
        },
    })
    const { state, dispatch, update } = useContext(appStore)
    const { near, wallet, account, localKeys, loading } = state
    const contract = getContract(account)

    const contractFT = new Contract(account, FT_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['ft_balance_of'],
    })

    const contractMarket = new Contract(account, MARKET_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['get_bids'],
    })

    const moveToSection = (s: number) => {
        setSection(s)
    }

    const pickEmoji = (code: number) => {
        if (schema.has(code)) {
            setSchema((oldSchema) => {
                const newSchema = new Set(oldSchema)
                newSchema.delete(code)
                return newSchema
            })
        } else if (schema.size < SCHEMA_SIZE) {
            setSchema((oldSchema) => {
                const newSchema = new Set(oldSchema)
                newSchema.add(code)
                return newSchema
            })
        } else {
            // schema complete
            return
        }
    }

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
        retrieveDesign()
        retrieveTotalSupply()
        retrieveBalanceOfFT()
    }, [account])

    useEffect(onMount, [])

    if (loading) {
        return null
    }

    async function setBid(amount, resale) {
        try {
            await contract.set_bid(
                {
                    token_id: randomDesign.id,
                    amount: utils.format.parseNearAmount(amount),
                    bidder: account?.accountId,
                    recipient: randomDesign.owner_id,
                    sell_on_share: parseInt(resale) * 100,
                    currency: 'near',
                },
                MARKET_SET_BIG_GAS,
                utils.format.parseNearAmount(amount)
            )
        } catch (e) {}
    }

    async function acceptBid(bidder: string) {
        try {
            await contract.accept_bid(
                {
                    token_id: myDesign.id,
                    bidder: bidder,
                },
                MARKET_ACCEPT_BID_GAS,
                YOCTO_NEAR
            )
        } catch (e) {}
    }

    async function retrieveBalanceOfFT() {
        try {
            const result: string = await contractFT.ft_balance_of({
                account_id: account?.accountId,
            })

            setFTBalance(utils.format.formatNearAmount(result, 5)) // decimals for YSN is same as NEAR
        } catch (e) {
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    async function retrieveBidders(token_id) {
        try {
            const result: string = await contractMarket.get_bids({
                token_id: token_id,
            })

            setBidders(result)
        } catch (e) {
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    async function retrieveTotalSupply() {
        try {
            const result: string = await contract.nft_total_supply({})

            setTotalSupply(parseInt(result))
        } catch (e) {
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    async function retrieveDesign() {
        setIndexLoader(true)

        try {
            const result = await contract.view_media({}, CONTRACT_DESIGN_GAS)

            const extra = JSON.parse(atob(result?.metadata?.extra))

            setMyDesign({
                id: result?.id,
                owner_id: result?.owner_id,
                metadata: {
                    title: result?.metadata?.title,
                },
                instructions: extra?.instructions?.split(','),
            })

            retrieveBidders(result?.id)

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    async function exploreDesign() {
        setIndexLoader(true)

        try {
            const randomDesign = Math.floor(Math.random() * totalSupply)
            const result = await contract.nft_tokens(
                { from_index: randomDesign.toString(), limit: 1 },
                CONTRACT_RANDOM_GAS
            )

            const extra = JSON.parse(atob(result[0]?.metadata?.extra))

            setRandomDesign({
                id: result[0]?.id,
                owner_id: result[0]?.owner_id,
                metadata: {
                    title: result[0]?.metadata?.title,
                },
                instructions: extra?.instructions?.split(','),
            })

            retrieveBalanceOfFT()

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function retrieveData() {
        setIndexLoader(true)

        try {
            const result = await contract.design(
                { schema: Array.from(schema) },
                CONTRACT_DESIGN_GAS
            )

            setDesignInstructions(result?.instructions?.split(','))
            setSeed(result?.seed)

            retrieveBalanceOfFT()

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function claimDesign() {
        setIndexLoader(true)

        try {
            await contract.claim_media(
                { seed, schema: Array.from(schema) },
                CONTRACT_CLAIM_GAS,
                CONTRACT_CLAIM_PRICE
            )

            retrieveDesign()

            setTimeout(() => {
                setIndexLoader(false)
                setAlertMessage('Design claimed!')
            }, 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function burnDesign() {
        setIndexLoader(true)

        try {
            await contract.burn_design({}, CONTRACT_CLAIM_GAS)

            setMyDesign({
                id: '',
                owner_id: '',
                instructions: [],
                metadata: {
                    title: '',
                },
            })

            retrieveBalanceOfFT()

            setTimeout(() => {
                setIndexLoader(false)
                setAlertMessage('Design burned!')
            }, 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    return (
        <>
            <Head>
                <title>Share</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <Header
                    accountId={account?.accountId}
                    onSignIn={signIn}
                    onSignOut={signOut}
                />
                <div
                    sx={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0 1rem`,
                        textAlign: 'center',
                    }}
                >
                    <Link href="/ysn">
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
                                {ftBalance} YSN
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
                    <Flex as="nav" sx={{ justifyContent: 'space-around' }}>
                        {account?.accountId ? (
                            <>
                                <NavLink
                                    href="#!"
                                    p={1}
                                    onClick={() => moveToSection(1)}
                                >
                                    Create
                                </NavLink>
                                <NavLink
                                    href="#!"
                                    p={1}
                                    onClick={() => moveToSection(2)}
                                >
                                    View
                                </NavLink>
                                <NavLink
                                    href="#!"
                                    p={1}
                                    onClick={() => moveToSection(3)}
                                >
                                    Explore
                                </NavLink>
                            </>
                        ) : (
                            <Text>Please connect to use dapp.</Text>
                        )}
                    </Flex>
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
                    {section === 1 && account?.accountId && !indexLoader && (
                        <div
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                sx={{
                                    mb: 3,
                                    px: 10,
                                    textAlign: 'center',
                                }}
                            >
                                <CustomEmojiPicker onEmojiPick={pickEmoji} />
                            </div>
                            <div
                                sx={{
                                    textAlign: 'center',
                                    mb: 3,
                                }}
                            >
                                <Button
                                    sx={{ mx: 2, mt: 1 }}
                                    onClick={retrieveData}
                                >
                                    Design
                                </Button>
                                <Button
                                    sx={{ mx: 2, mt: 1 }}
                                    onClick={claimDesign}
                                    bg="secondary"
                                >
                                    Claim
                                </Button>
                            </div>
                            <div
                                sx={{
                                    textAlign: 'center',
                                    mb: 3,
                                }}
                            >
                                {Array.from(schema).map((emojiCode) => {
                                    return (
                                        <Text mx="1">
                                            {String.fromCodePoint(emojiCode)}
                                        </Text>
                                    )
                                })}
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Design instructions={designInstructions} />
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 3,
                                }}
                            >
                                <CreatorShare
                                    address={HARDCODED_ROYALTY_ADDRESS}
                                    share={HARDCODED_ROYALTY_SHARE}
                                />
                            </div>
                        </div>
                    )}
                    {section === 2 &&
                        account?.accountId &&
                        !indexLoader &&
                        myDesign.id && (
                            <>
                                <div
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mb: 3,
                                    }}
                                >
                                    <Button
                                        sx={{ mt: 1 }}
                                        onClick={burnDesign}
                                        bg="secondary"
                                    >
                                        Burn
                                    </Button>
                                </div>
                                <div
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Design
                                        instructions={myDesign.instructions}
                                    />
                                </div>
                                <div
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 3,
                                    }}
                                >
                                    <Bidders
                                        bidders={bidders}
                                        onAcceptBid={acceptBid}
                                    />
                                </div>
                                <div
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        mt: 3,
                                    }}
                                >
                                    <CreatorShare
                                        address={HARDCODED_ROYALTY_ADDRESS}
                                        share={HARDCODED_ROYALTY_SHARE}
                                    />
                                </div>
                            </>
                        )}
                    {section === 3 && account?.accountId && !indexLoader && (
                        <>
                            <div
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 3,
                                }}
                            >
                                <Button sx={{ mt: 1 }} onClick={exploreDesign}>
                                    Explore
                                </Button>
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <Design
                                    instructions={randomDesign?.instructions}
                                />
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Metadata
                                    title={randomDesign?.metadata.title}
                                    creator={randomDesign?.owner_id}
                                />
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mt: 3,
                                }}
                            >
                                <CreatorShare
                                    address={HARDCODED_ROYALTY_ADDRESS}
                                    share={HARDCODED_ROYALTY_SHARE}
                                />
                            </div>
                            <div
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mt: 3,
                                    mb: 3,
                                }}
                            >
                                <Divider sx={{ width: 300 }} />
                                <BidCreate
                                    title={randomDesign?.metadata.title}
                                    creator={randomDesign?.owner_id}
                                    onBid={setBid}
                                />
                            </div>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}

Index.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Index
