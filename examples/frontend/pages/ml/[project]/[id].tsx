// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import ViewLayout from '../../../containers/layouts/View'
import { CreatorShare, Bidders, MediaObject } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTContract, useNFTViewMethod, useMarketMethod } from '@cura/hooks'
import { useStatusUpdate } from 'utils/hooks-helpers'
const CONTRACT_BURN_GAS = utils.format.parseNearAmount(`0.00000000029`) // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount(`0.00000000025`) // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount(`0.000000000000000000000001`)

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = `2500`

const MLProject = () => {
    const router = useRouter()

    const { updateStatus } = useStatusUpdate()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const project = `ml/${router.query.project}`
    const { contract } = useNFTContract(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`
    )

    const { data: media } = useNFTViewMethod(
        `ml${router.query.project}.ysn-1_0_0.ysn.testnet`,
        `nft_token`,
        {
            token_id: router.query.id,
            limit: 2,
        },
        updateStatus
    )

    const { data: bids } = useMarketMethod(
        `market.ml${router.query.project}.ysn-1_0_0.ysn.testnet`,
        `get_bids`,
        {
            token_id: media?.id,
        }
    )

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
            await contract.burn_design(
                {
                    token_id: router.query.id,
                },
                CONTRACT_BURN_GAS,
                YOCTO_NEAR
            )
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    return (
        <ViewLayout
            project={project}
            frameComponent={
                <>
                    {media && (
                        <MediaObject
                            mediaURI={`https://arweave.net/${media.metadata.media}`}
                            type="image"
                            width={`100%`}
                            height={`100%`}
                        />
                    )}
                </>
            }
            biddersComponent={
                <>
                    {bids && <Bidders bidders={bids} onAcceptBid={acceptBid} />}
                </>
            }
            royaltiesComponent={
                <CreatorShare
                    address={HARDCODED_ROYALTY_ADDRESS}
                    share={HARDCODED_ROYALTY_SHARE}
                />
            }
            burnDesign={burnDesign}
        />
    )
}

export default MLProject
