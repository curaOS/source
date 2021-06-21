/** @jsxImportSource theme-ui */

import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { NavLink, Spinner } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Menu from '../components/Menu'
import { utils } from 'near-api-js'
import Head from 'next/head'
import { indexLoaderState } from '../state/recoil'
import { useRecoilValue } from 'recoil'
import { Near } from 'containers/index'
import { useFTBalance } from 'hooks/useFTContract'

import { accountState } from '../state/account'

export default function Layout({ children }) {
    const indexLoader = useRecoilValue(indexLoaderState)

    const { accountId } = useRecoilValue(accountState)
    const { signIn, signOut } = Near.useContainer()

    const { data: ftBalance, loading: loadingFTBalance } = useFTBalance()

    return (
        <>
            <Head>
                <title>Share</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <Header
                    accountId={accountId}
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
                                {loadingFTBalance
                                    ? '-'
                                    : utils.format.formatNearAmount(
                                          ftBalance,
                                          5
                                      )}{' '}
                                YSN
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
