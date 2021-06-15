/** @jsxImportSource theme-ui */

import { useContext, useEffect, useState } from 'react'
import { appStore, onAppMount } from '../state/app'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { NavLink, Spinner } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Menu from '../components/Menu'
import { utils, Contract } from 'near-api-js'
import Head from 'next/head'
import { indexLoaderState } from '../state/recoil'
import { useRecoilState } from 'recoil'

const FT_CONTRACT_NAME = process.env.YSN_ADDRESS

import { alertMessageState } from '../state/recoil'
import { useSetRecoilState } from 'recoil'

export default function Layout({ children }) {
    const { state, dispatch } = useContext(appStore)
    const { wallet, account, loading } = state
    const [ftBalance, setFTBalance] = useState('0')

    const setAlertMessage = useSetRecoilState(alertMessageState)
    const [indexLoader] = useRecoilState(indexLoaderState)

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

    useEffect(() => {
        if (!account) return
        retrieveBalanceOfFT()
    }, [account])

    const contractFT = new Contract(account, FT_CONTRACT_NAME, {
        changeMethods: [],
        viewMethods: ['ft_balance_of'],
    })

    async function retrieveBalanceOfFT() {
        try {
            const result: string = await contractFT.ft_balance_of({
                account_id: account?.accountId,
            })

            setFTBalance(utils.format.formatNearAmount(result, 5)) // decimals for YSN is same as NEAR
        } catch (e) {
            if (!/not present/.test(e.toString())) {
                setAlertMessage(e.toString())
            }
        }
    }

    if (loading) {
        return null
    }

    return (
        <>
            <Head>
                <title>Share</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <Header
                    accountId={account?.accountId}
                    onSignIn={signIn}
                    onSignOut={signOut}
                />
                <div
                    sx={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0 1rem`,
                        textAlign: 'center',
                    }}
                >
                    <Link href="/ysn">
                        <NavLink href="#!">
                            <span
                                sx={{
                                    fontSize: 22,
                                    fontWeight: 600,
                                    backgroundImage: (t) => `
                                        linear-gradient(
                                            to right,
                                            ${alpha('secondary', 1)(t)},
                                            ${alpha('text', 0.2)(t)}
                                        )
                                    `,
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                }}
                            >
                                {ftBalance} YSN
                            </span>
                        </NavLink>
                    </Link>
                </div>
                <div
                    sx={{
                        marginBottom: `1.45rem`,
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0rem 2rem`,
                        minHeight: '70vh',
                    }}
                >
                    <Menu />
                    {indexLoader ? (
                        <div
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 3,
                            }}
                        >
                            <Spinner />
                        </div>
                    ) : (
                        children
                    )}
                </div>
                <Footer />
            </div>
        </>
    )
}
