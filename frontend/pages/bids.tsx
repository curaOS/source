// @ts-nocheck
/** @jsxImportSource theme-ui */

import React, { useContext, useState, useEffect } from 'react'
import { appStore, onAppMount } from '../state/app'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Bidders from '../components/Bidders'

const Layout = ({ children }) => {
    const { state, dispatch } = useContext(appStore)
    const { wallet, account } = state

    const onMount = () => {
        dispatch(onAppMount())
    }

    useEffect(onMount, [])

    const [alertMessage, setAlertMessage] = useState('')

    const signIn = () => {
        wallet.signIn()
    }
    const signOut = () => {
        wallet.signOut()
    }

    return (
        <div>
            <Header
                message={alertMessage}
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
    return (
        <Layout>
            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3,
                }}
            >
                <Bidders bidders={{}} onAcceptBid={console.log} />
            </div>
        </Layout>
    )
}

export default Bids
