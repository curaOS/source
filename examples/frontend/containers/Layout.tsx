// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Footer } from '@cura/components'
import Header from './Header'
import Link from 'next/link'
import { NavLink, Spinner } from 'theme-ui'
import { alpha } from '@theme-ui/color'
import Menu from './Menu'
import { utils } from 'near-api-js'
import Head from 'next/head'
import { indexLoaderState } from '../state/recoil'
import { useRecoilValue } from 'recoil'
import { useFTMethod, useNearHooksContainer } from '@cura/hooks'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { mapPathToProject } from 'utils/path-to-project'

export default function Layout({ children, project = 'share' }) {
    const indexLoader = useRecoilValue(indexLoaderState)

    const router = useRouter()

    const { signIn, signOut, accountId } = useNearHooksContainer()

    const { data: ftBalance, loading: loadingFTBalance } = useFTMethod(
        'ysn-1_0_0.ysn.testnet',
        'ft_balance_of',
        {
            account_id: accountId,
        }
    )

    const switchProject = () => {
        const currentProject = mapPathToProject(router.asPath)
        const signedProject = localStorage.getItem('contractAddress')

        if (
            signedProject &&
            currentProject &&
            currentProject != signedProject
        ) {
            preSignOut()
        }
    }

    const preSignIn = () => {
        const project = mapPathToProject(router.asPath)
        localStorage.setItem('contractAddress', project)

        signIn(
            project,
            window.location.origin + router.asPath,
            window.location.origin + router.asPath
        )
    }

    const preSignOut = () => {
        localStorage.removeItem('contractAddress')
        signOut()
        router.reload(window.location.origin + router.asPath)
    }

    useEffect(switchProject, [router.asPath])

    return (
        <>
            <Head>
                <title>CURA</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ minHeight: '100vh' }}>
                <Header
                    base={project}
                    accountId={accountId}
                    onSignIn={preSignIn}
                    onSignOut={preSignOut}
                    title={project.toUpperCase()}
                    nextLinkWrapper={(href, children) => (
                        <Link href={href}>{children}</Link>
                    )}
                />
                <div
                    sx={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `0 1rem`,
                        textAlign: 'center',
                    }}
                >
                    <Link href="/">
                        <NavLink href="#!">
                            <span
                                sx={{
                                    fontSize: 22,
                                    fontWeight: 600,
                                    backgroundImage: (t) => `
                                        linear-gradient(
                                            to right,
                                            ${alpha('gray.4', 1)(t)},
                                            ${alpha('gray.5', 1)(t)}
                                        )
                                    `,
                                    backgroundClip: 'text',
                                    textFillColor: 'transparent',
                                }}
                            >
                                PROJECTS
                                {/* {loadingFTBalance
                                    ? '-'
                                    : utils.format.formatNearAmount(
                                          ftBalance,
                                          5
                                      )}{' '} */}
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
                    <Menu
                        base={project}
                        nextLinkWrapper={(href, children) => (
                            <Link href={href}>{children}</Link>
                        )}
                    />
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
                    ) : accountId ? (
                        children
                    ) : null}
                </div>
                <Footer />
            </div>
        </>
    )
}
