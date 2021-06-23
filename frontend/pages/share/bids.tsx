/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Spinner } from 'theme-ui'
import { utils } from 'near-api-js'
import BiddersBids from '../../components/BiddersBids'
import Layout from '../../components/Layout'
import { indexLoaderState } from '../../state/recoil'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useMarketMethod } from 'hooks/useMarketContract'
import useNFTContract from 'hooks/useNFTContract'
import { accountState } from 'state/account'
import { omit } from 'ramda'

const CONTRACT_REMOVE_BID_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas

const Bids = () => {
    const { contract } = useNFTContract()

    const { accountId } = useRecoilValue(accountState)
    const [removeBidLoader, setRemoveBidLoader] = useState(false)

    const { data: biddersBids, mutate: mutateBiddersBids } = useMarketMethod(
        'get_bidders_bids',
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
        <Layout>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                }}
            >
                {removeBidLoader && (
                    <div
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
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
            </div>
        </Layout>
    )
}

export default Bids
