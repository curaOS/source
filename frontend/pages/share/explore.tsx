// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useContext, useState, useEffect } from 'react'
import { appStore } from '../../state/app'
import { getContract } from '../../utils/near-utils'
import { Button, Divider } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../components/Layout'
import CreatorShare from '../../components/CreatorShare'
import Design from '../../components/Design'
import Metadata from '../../components/Metadata'
import BidCreate from 'components/BidCreate'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_RANDOM_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const MARKET_SET_BIG_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const Explore = ({}) => {
    const { state } = useContext(appStore)
    const { account } = state
    const contract = getContract(account)
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const [randomDesign, setRandomDesign] = useState({
        id: '',
        owner_id: '',
        instructions: [],
        metadata: {
            title: '',
        },
    })
    const [totalSupply, setTotalSupply] = useState(0)

    useEffect(() => {
        if (!account) return
        retrieveDesign()
        retrieveTotalSupply()
    }, [account])

    const setIndexLoader = useSetRecoilState(indexLoaderState)

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

            setTimeout(() => setIndexLoader(false), 200)
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    return (
        <Layout>
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
                    <Design instructions={randomDesign?.instructions} />
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
        </Layout>
    )
}

export default Explore
