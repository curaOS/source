// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Spinner } from 'theme-ui'
import { utils } from 'near-api-js'
import { BiddersBids } from '@cura/components'
import BidsLayout from '../../containers/layouts/Bids'
import { omit } from 'ramda'
import {
    useNFTContract,
    useNearHooksContainer,
    useMarketMethod,
} from '@cura/hooks'
import { useRouter } from 'next/router'
import { mapPathToProject } from 'utils/path-to-project'

const CONTRACT_REMOVE_BID_GAS = utils.format.parseNearAmount(`0.00000000020`) // 200 Tgas

const Bids = () => {
    const router = useRouter()
    const contractAdress = router && mapPathToProject(router.asPath)

    const { contract } = useNFTContract(contractAdress)

    const { accountId } = useNearHooksContainer()

    const [removeBidLoader, setRemoveBidLoader] = useState(false)

    const { data: biddersBids, mutate: mutateBiddersBids } = useMarketMethod(
        `market.share.ysn-1_0_0.ysn.testnet`,
        `get_bidders_bids`,
        {
            account_id: accountId,
        }
    )

    console.log(biddersBids)

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
        <BidsLayout project={`share`}>
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
