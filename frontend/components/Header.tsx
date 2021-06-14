// @ts-nocheck
/** @jsxImportSource theme-ui */

import React from 'react'
import { Text, Alert, Button, Close } from 'theme-ui'
import Link from 'next/link'
import { alertMessageState } from '../state/recoil'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export default function Header({
    accountId,
    onSignIn,
    onSignOut,
}: {
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
}) {
    const alertMessage = useRecoilValue(alertMessageState)
    const setAlertMessage = useSetRecoilState(alertMessageState)

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
                                <Button onClick={onSignIn} bg="primary">
                                    {' '}
                                    Connect NEAR{' '}
                                </Button>
                            ) : (
                                <Button onClick={onSignOut} bg="secondary">
                                    {' '}
                                    Disconnect{' '}
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
                                fontWeight: 500,
                                fontSize: '4rem',
                                marginRight: '1rem',
                            }}
                        >
                            SHARE
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
                                <Link href="/bids">{accountId}</Link>
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
