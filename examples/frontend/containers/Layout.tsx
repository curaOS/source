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
import { useEffect, useState } from 'react'
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
    );

    const [currentProject, setCurrentProject] = useState('');
    const [signedProject, setSignedProject] = useState('');

    const switchProject = () => {
        setCurrentProject(mapPathToProject(router.asPath));
        setSignedProject(localStorage.getItem('contractAddress'))

        if (
            signedProject &&
            currentProject &&
            currentProject != signedProject
        ) {
            preSignOut()
        }
    }

    const preSignIn = async () => {
        const project = mapPathToProject(router.asPath)
        if(localStorage.getItem('contractAddress')){
            await signOut();
        }
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

    // get the last part of the path (e.g. create, view, explore)
    const lastPath = router.pathname.split('/').slice(-1)[0]

    // if lastPath is a project's homepage (e.g. /share, /cc/squiggle...) set activeLink to an empty string
    const activeLink =
        lastPath === '[project]' || lastPath === project ? '' : lastPath
        
    return (
        <>
            <Head>
                <title>CURA</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <Box style={{ minHeight: '100vh' }}>
                <Header
                    base={project}
                    accountId={currentProject == signedProject ? accountId : null}
                    onSignIn={preSignIn}
                    onSignOut={preSignOut}
                    title={project.toUpperCase()}
                    nextLinkWrapper={(href, children) => (
                        <Link href={href}>{children}</Link>
                    )}
                />
                <Box
                    sx={{
                        margin: `0 auto`,
                        minHeight: ['80vh', '94vh'],
                    }}
                >
                    <Menu
                        accountId={currentProject == signedProject ? accountId : null}
                        base={project}
                        nextLinkWrapper={(href, children) => (
                            <Link href={href}>{children}</Link>
                        )}
                        activeLink={activeLink}
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
