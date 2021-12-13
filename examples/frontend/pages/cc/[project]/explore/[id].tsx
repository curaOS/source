// @ts-nocheck
/** @jsxImportSource theme-ui */

import { utils } from 'near-api-js'
import { useRouter } from 'next/router'
import ExploreViewLayout from '../../../../containers/layouts/ExploreView'
import {
    CreatorShare,
    Metadata,
    MediaObject,
    BidCreate,
} from '@cura/components'
import { alertMessageState, indexLoaderState } from '../../../../state/recoil'
import { useSetRecoilState } from 'recoil'
import {
    useNFTContract,
    useNFTMethod,
    useNearHooksContainer,
} from '@cura/hooks'
import { useStatusUpdate } from 'utils/hooks-helpers'
import { mapPathToProject } from 'utils/path-to-project'

const MARKET_SET_BID_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas

const HARDCODED_ROYALTY_ADDRESS = process.env.YSN_ADDRESS
const HARDCODED_ROYALTY_SHARE = '2500'

const ExploreToken = () => {
    const router = useRouter()
    const { updateStatus } = useStatusUpdate()
    const setAlertMessage = useSetRecoilState(alertMessageState)
    const setIndexLoader = useSetRecoilState(indexLoaderState)

    const contractAdress = router && mapPathToProject(router.asPath)
    const project = `cc/${router.query.project}`

    const { contract } = useNFTContract(contractAdress)
    const { accountId } = useNearHooksContainer()

    const { data: media } = useNFTMethod(
        `${contractAdress}`,
        'nft_token',
        {
            token_id: router.query.id,
            limit: 2,
        },
        undefined,
        updateStatus
    )

    async function setBid(amount, resale) {
        setIndexLoader(true)

        try {
            await contract.set_bid(
                {
                    token_id: media.id,
                    amount: utils.format.parseNearAmount(amount),
                    bidder: accountId,
                    recipient: media.owner_id,
                    sell_on_share: parseInt(resale) * 100,
                    currency: 'near',
                },
                MARKET_SET_BID_GAS,
                utils.format.parseNearAmount(amount)
            )
        } catch (e) {
            console.error(e)
            setIndexLoader(false)
            setAlertMessage(e.toString())
        }
    }

    return (
        <ExploreViewLayout
            project={project}
            frameComponent={
                <>
                    {media && (
                        <MediaObject
                            mediaURI={`https://arweave.net/${media?.metadata?.media}`}
                            width={'100%'}
                            height={'100%'}
                        />
                    )}
                </>
            }
            metaComponent={
                <>
                    {media && (
                        <Metadata
                            data={media}
                            loading={false}
                            width={'100%'}
                            variant={1}
                        />
                    )}
                </>
            }
            royaltiesComponent={
                <CreatorShare
                    address={HARDCODED_ROYALTY_ADDRESS}
                    share={HARDCODED_ROYALTY_SHARE}
                />
            }
            bidCreateComponent={
                <BidCreate
                    title={media?.metadata.title}
                    creator={media?.owner_id}
                    onBid={setBid}
                />
            }
        />
    )
}

export default ExploreToken
