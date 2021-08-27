// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Button, Text } from 'theme-ui'
import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import { Bidders, RenderIframe, CreatorShare } from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import useNFTContract, { useNFTMethod } from 'hooks/useNFTContract'
import { useMarketMethod } from 'hooks/useMarketContract'
import { mapPathToProject } from 'containers/near'

const CONTRACT_VIEW_GAS = utils.format.parseNearAmount('0.00000000010') // 100 Tgas
const CONTRACT_BURN_GAS = utils.format.parseNearAmount('0.00000000029') // 290 Tgas
const MARKET_ACCEPT_BID_GAS = utils.format.parseNearAmount('0.00000000025') // 250 Tgas
const YOCTO_NEAR = utils.format.parseNearAmount('0.000000000000000000000001')

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const CCProjectID = ({}) => {
    const router = useRouter()

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
        CONTRACT_VIEW_GAS
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

    return (
        <Layout project={project}>
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
                    {media && (
                        <RenderIframe
                            mediaURI={`https://arweave.net/${media.metadata.media}`}
                        />
                    )}
                </div>
                <div
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <a
                        sx={{ textDecoration: 'none' }}
                        href={`https://viewblock.io/arweave/tx/${media?.metadata.media}`}
                    >
                        <Text
                            sx={{
                                fontSize: 2,
                            }}
                        >
                            Arweave ↗
                        </Text>
                    </a>
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

export default CCProjectID
