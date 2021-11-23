// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../containers/Layout'
import { CreatorShare, Bidders, MediaObject } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useSetRecoilState } from 'recoil'
import { useNFTMethod, useNFTContract } from '@cura/hooks'
import { getFrameWidth } from 'utils/frame-width'
import { useNearHooksContainer, useMarketMethod } from '@cura/hooks'
import { useStatusUpdate } from 'utils/hooks-helpers'
import { useRouter } from 'next/router'
import { mapPathToProject } from 'utils/path-to-project'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const View = ({}) => {
    const router = useRouter()
    const contractAdress = router && mapPathToProject(router.asPath)

    const { contract } = useNFTContract(contractAdress)

    const { updateStatus } = useStatusUpdate()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { accountId } = useNearHooksContainer()

    const { data: media } = useNFTMethod(
        `${contractAdress}`,
        'nft_tokens_for_owner',
        {
            account_id: accountId,
        },
        CONTRACT_VIEW_GAS,
        updateStatus
    )

    const { data: bids } = useMarketMethod(
        'market.share.ysn-1_0_0.ysn.testnet',
        'get_bids',
        {
            token_id: media?.[0]?.id,
        }
    )

    async function acceptBid(bidder: string) {
        setIndexLoader(true)
        try {
            await contract.accept_bid(
                {
                    token_id: media?.[0]?.id,
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
                { token_id: media?.[0]?.id },
                CONTRACT_BURN_GAS,
                YOCTO_NEAR
            )
        } catch (e) {
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    const mediaDimension = getFrameWidth()

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
                    <Button onClick={burnDesign} variant="red">
                        Burn
                    </Button>
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {media?.[0]?.metadata?.media && (
                        <MediaObject
                            mediaURI={`https://arweave.net/${media[0].metadata.media}`}
                            width={mediaDimension}
                            height={mediaDimension}
                        />
                    )}
                </div>
                {bids && (
                    <div
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 3,
                        }}
                    >
                        <Bidders bidders={bids} onAcceptBid={acceptBid} />
                    </div>
                )}

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
