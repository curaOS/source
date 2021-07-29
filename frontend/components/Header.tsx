// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Alert, Button, Close } from 'theme-ui'
import Link from 'next/link'
import { alertMessageState } from '../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const Header = ({
    base,
    accountId,
    onSignIn,
    onSignOut,
    alertMessage,
    setAlertMessage,
    title,
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    alertMessage: string
    setAlertMessage: () => void
    title: string
}) => {
    return (
        <div>
            <header
                sx={{
                    marginBottom: `1.45rem`,
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1rem 2rem 0 2rem`,
                }}
            >
                {alertMessage && (
                    <Alert>
                        <Text>{alertMessage.substring(0, 80)} ...</Text>
                        <Close
                            ml="auto"
                            mr={-2}
                            sx={{ height: '2rem', width: '4rem' }}
                            onClick={() => setAlertMessage('')}
                        />
                    </Alert>
                )}
                <div
                    sx={{
                        margin: `1rem auto 0rem auto`,
                        background: `black`,
                        maxWidth: 960,
                        padding: `0.02rem 0rem`,
                    }}
                />
                <div
                    sx={{
                        display: 'flex',
                        flexDirection: ['column', 'row'],
                        justifyContent: ['space-between'],
                        alignItems: ['center'],
                        mt: [3, 0],
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: 3,
                            flexWrap: 'wrap',
                            flex: '1 1 0%',
                        }}
                    >
                        <>
                            {!accountId ? (
                                <Button onClick={onSignIn} variant="due">
                                    Connect NEAR
                                </Button>
                            ) : (
                                <Button onClick={onSignOut} variant="uno">
                                    Disconnect
                                </Button>
                            )}
                        </>
                    </div>
                    <Link href="/">
                        <Text
                            sx={{
                                flex: 'none',
                                color: 'black',
                                textDecoration: 'none',
                                fontFamily: 'IBM Plex Sans, sans-serif',
                                fontWeight: 600,
                                fontSize: '4rem',
                                marginRight: '1rem',
                            }}
                        >
                            {title}
                        </Text>
                    </Link>
                    <div
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: 3,
                            flexWrap: 'wrap',
                            flex: '1 1 0%',
                        }}
                    >
                        {accountId ? (
                            <div>
                                <Link href={`/${base}/bids`}>{accountId}</Link>
                            </div>
                        ) : (
                            <div>[blank]</div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default function HeaderContainer({
    base,
    accountId,
    onSignIn,
    onSignOut,
    title,
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    title: string
}) {
    const alertMessage = useRecoilValue(alertMessageState)
    const setAlertMessage = useSetRecoilState(alertMessageState)

    return (
        <Header
            base={base}
            accountId={accountId}
            onSignIn={onSignIn}
            onSignOut={onSignOut}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            title={title}
        />
    )
}
