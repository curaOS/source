// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useContext } from 'react'
import { appStore } from '../../state/app'
import { getContract } from '../../utils/near-utils'
import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../components/Layout'
import CreatorShare from '../../components/CreatorShare'
import Design from '../../components/Design'
import Bidders from '../../components/Bidders'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTMethod } from 'hooks/useNFTContract'
import { useMarketMethod } from 'hooks/useMarketContract'

const CONTRACT_DESIGN_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const CONTRACT_CLAIM_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const MARKET_CONTRACT_NAME = process.env.SHARE_MARKET_ADDRESS
const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const getInstructions = (media) => {
    if (media) {
        const extra = JSON.parse(atob(media?.metadata?.extra))
        const instructions = extra?.instructions?.split(',')

        return instructions
    } else {
        return []
    }
}

const View = ({}) => {
    const { state } = useContext(appStore)
    const { account } = state
    const contract = getContract(account)

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { data: media } = useNFTMethod('view_media', {}, CONTRACT_DESIGN_GAS)

    const { data: bids } = useMarketMethod('get_bids', {
        token_id: media?.id,
    })

    console.log(media)

    async function acceptBid(bidder: string) {
        setIndexLoader(true)
        try {
            await contract.accept_bid(
                {
                    token_id: media?.id,
                    bidder: bidder,
                },
                MARKET_ACCEPT_BID_GAS,
                YOCTO_NEAR
            )
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    async function burnDesign() {
        setIndexLoader(true)
        try {
            await contract.burn_design({}, CONTRACT_BURN_GAS, YOCTO_NEAR)
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
                    <Design instructions={getInstructions(media)} />
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3,
                    }}
                >
                    <Bidders bidders={bids} onAcceptBid={acceptBid} />
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
