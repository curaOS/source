// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Spinner } from 'theme-ui'
import { utils } from 'near-api-js'
import { BiddersBids } from '@cura/components'
import BidsLayout from '../../../containers/layouts/Bids'
import { omit } from 'ramda'
import { useRouter } from 'next/router'
import { mapPathToProject } from 'utils/path-to-project'
import {
    useNearHooksContainer,
    useNFTContract,
    useMarketMethod,
} from '@cura/hooks'

const CONTRACT_REMOVE_BID_GAS = utils.format.parseNearAmount(`0.00000000020`) // 200 Tgas

const Bids = () => {
    const router = useRouter()

    const { contract } = useNFTContract(`${mapPathToProject(router.asPath)}`)

    const project = `cc/${router.query.project}`

    const { accountId } = useNearHooksContainer()

    const [removeBidLoader, setRemoveBidLoader] = useState(false)

    const { data: biddersBids, mutate: mutateBiddersBids } = useMarketMethod(
        `market.${mapPathToProject(router.asPath)}`,
        `get_bidders_bids`,
        {
            account_id: accountId,
        }
    )

    async function removeBid(token_id: string, bidder: string) {
        setRemoveBidLoader(true)

        try {
            await contract.remove_bid(
                { token_id: token_id, bidder: bidder },
                CONTRACT_REMOVE_BID_GAS
            )

            mutateBiddersBids(omit(token_id, biddersBids))

            setTimeout(() => {
                setRemoveBidLoader(false)
            }, 200)
        } catch (e) {
            console.log(e)
            setRemoveBidLoader(false)
        }
    }

    return (
        <BidsLayout project={project}>
            <>
                {removeBidLoader && (
                    <div
                        sx={{
                            display: `flex`,
                            justifyContent: `center`,
                            mb: 3,
                        }}
                    >
                        <Spinner />
                    </div>
                )}
                {!removeBidLoader && (
                    <BiddersBids
                        biddersBids={biddersBids}
                        onRemoveBid={removeBid}
                    />
                )}
            </>
        </BidsLayout>
    )
}

export default Bids
