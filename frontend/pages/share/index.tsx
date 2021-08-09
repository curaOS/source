// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button } from 'theme-ui'
import { utils } from 'near-api-js'
import Layout from '../../components/Layout'
import CreatorShare from '../../components/CreatorShare'
import Bidders from '../../components/Bidders'
import { alertMessageState, indexLoaderState } from '../../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useNFTContract, { useNFTMethod } from 'hooks/useNFTContract'
import { useMarketMethod } from 'hooks/useMarketContract'
import { accountState } from 'state/account'
import RenderIframe from '../../components/RenderIframe'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const View = ({}) => {
    const { contract } = useNFTContract()

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const { accountId } = useRecoilValue(accountState)

    const { data: media } = useNFTMethod(
        '0.share-nft.testnet',
        'nft_tokens_for_owner',
        {
            account_id: accountId,
        },
        CONTRACT_VIEW_GAS
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
                    <RenderIframe
                        mediaURI={`https://arweave.net/${media?.[0].metadata.media}`}
                    />
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
