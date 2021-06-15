// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useContext, useState, useEffect } from 'react'
import { appStore } from '../../state/app'
import { getContract } from '../../utils/near-utils'
import { Button } from 'theme-ui'
import { Contract, utils } from 'near-api-js'
import Layout from '../../components/Layout'
import CreatorShare from '../../components/CreatorShare'
import Design from '../../components/Design'
import Bidders from '../../components/Bidders'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const MARKET_CONTRACT_NAME = process.env.SHARE_MARKET_ADDRESS
const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const View = ({}) => {
    const { state } = useContext(appStore)
    const { account } = state
    const contract = getContract(account)
    const [bidders, setBidders] = useState({})
    const [myDesign, setMyDesign] = useState({
        id: '',
        owner_id: '',
        instructions: [],
        metadata: {
            title: '',
        },
    })

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    useEffect(() => {
        if (!account) return
        retrieveDesign()
    }, [account])

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

    const contractMarket = new Contract(account, MARKET_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['get_bids'],
    })

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
                    <Button sx={{ mt: 1 }} onClick={burnDesign} bg="secondary">
                        Burn
                    </Button>
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Design instructions={myDesign.instructions} />
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <Bidders bidders={bidders} onAcceptBid={acceptBid} />
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
        </Layout>
    )
}

export default View
