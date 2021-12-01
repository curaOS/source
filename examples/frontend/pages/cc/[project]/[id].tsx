// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import ViewLayout from '../../../containers/Layouts/View'
import { Bidders, CreatorShare, MediaObject } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { mapPathToProject } from 'utils/path-to-project'
import { getFrameWidth } from 'utils/frame-width'
import { useNFTContract, useNFTMethod, useMarketMethod } from '@cura/hooks'
import { useStatusUpdate } from 'utils/hooks-helpers'

const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const CCProjectID = ({}) => {
    const router = useRouter()

    const { updateStatus } = useStatusUpdate()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const project = `cc/${router.query.project}`
    const { contract } = useNFTContract(`${mapPathToProject(router.asPath)}`)

    const { data: media } = useNFTMethod(
        `${mapPathToProject(router.asPath)}`,
        'nft_token',
        {
            token_id: router.query.id,
            limit: 2,
        },
        undefined,
        updateStatus
    )

    const { data: bids } = useMarketMethod(
        `market.${mapPathToProject(router.asPath)}`,
        'get_bids',
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

    const frameDimension = getFrameWidth()

    return (
        <ViewLayout
            project={project}
            frameComponent={
                <>
                    {media && (
                        <MediaObject
                            mediaURI={`https://arweave.net/${media.metadata.media}`}
                            width={frameDimension}
                            height={frameDimension}
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

export default CCProjectID
