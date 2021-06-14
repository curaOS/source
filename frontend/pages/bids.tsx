// @ts-nocheck
/** @jsxImportSource theme-ui */

import React, { useContext, useState, useEffect } from 'react'
import { appStore, onAppMount } from '../state/app'
import { getContract } from '../utils/near-utils'
import { Spinner } from 'theme-ui'
import { Contract, utils } from 'near-api-js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BiddersBids from '../components/BiddersBids'

const CONTRACT_REMOVE_BID_GAS = utils.format.parseNearAmount('0.00000000020') // 200 Tgas
const MARKET_CONTRACT_NAME = process.env.SHARE_MARKET_ADDRESS

const Layout = ({ children }) => {
    const { state, dispatch } = useContext(appStore)
    const { wallet, account } = state

    const onMount = () => {
        dispatch(onAppMount())
    }

    useEffect(onMount, [])

    const signIn = () => {
        wallet.signIn()
    }
    const signOut = () => {
        wallet.signOut()
    }

    return (
        <div>
            <Header
                accountId={account?.accountId}
                onSignIn={signIn}
                onSignOut={signOut}
            />
            {children}
            <Footer />
        </div>
    )
}

const Bids = () => {
    const { state } = useContext(appStore)
    const { account } = state
    const contract = getContract(account)

    const [biddersBids, setBiddersBids] = useState({})
    const [indexLoader, setIndexLoader] = useState(false)

    const contractMarket = new Contract(account, MARKET_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['get_bidders_bids'],
    })

    async function retrieveBiddersBids() {
        setIndexLoader(true)
        try {
            const result: string = await contractMarket.get_bidders_bids({
                account_id: account?.accountId,
            })

            setBiddersBids(result)

            setTimeout(() => {
                setIndexLoader(false)
            }, 200)
        } catch (e) {
            setIndexLoader(false)
        }
    }

    async function removeBid(token_id: string, bidder: string) {
        setIndexLoader(true)

        try {
            await contract.remove_bid(
                { token_id: token_id, bidder: bidder },
                CONTRACT_REMOVE_BID_GAS
            )

            retrieveBiddersBids()

            setTimeout(() => {
                setIndexLoader(false)
            }, 200)
        } catch (e) {
            console.log(e)
            setIndexLoader(false)
        }
    }

    useEffect(() => {
        if (!account) return
        retrieveBiddersBids()
    }, [account])

    return (
        <Layout>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                }}
            >
                {indexLoader && (
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
                {!indexLoader && (
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
