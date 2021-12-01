// @ts-nocheck
/** @jsxImportSource theme-ui */

import Header from './Header'
import Link from 'next/link'
import { Box, Container, Spinner } from 'theme-ui'
import Menu from './Menu'
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
            <Box style={{ minHeight: '100vh' }}>
                <Header
                    base={project}
                    accountId={accountId}
                    onSignIn={preSignIn}
                    onSignOut={preSignOut}
                    title={project.toUpperCase()}
                    logo={`/logo.svg`}
                    nextLinkWrapper={(href, children) => (
                        <Link href={href}>{children}</Link>
                    )}
                />
                <Box
                    sx={{
                        margin: `0 auto`,
                        minHeight: '80.5vh',
                    }}
                >
                    <Menu
                        base={project}
                        nextLinkWrapper={(href, children) => (
                            <Link href={href}>{children}</Link>
                        )}
                    />
                    <Container variant="medium">
                        {indexLoader ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    my: 3,
                                }}
                            >
                                <Spinner />
                            </Box>
                        ) : accountId ? (
                            children
                        ) : null}
                    </Container>
                </Box>
            </Box>
        </>
    )
}
