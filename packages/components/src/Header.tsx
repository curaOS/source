// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import { Text, Alert, Button, Close, Box, Container } from 'theme-ui'

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
    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const titleArray = title.split(/(?<=\/)/)

    const UserButton = () => {
        if (!accountId) {
            return (
                <Button onClick={onSignIn} variant="primary">
                    Connect NEAR
                </Button>
            )
        }

        if (isButtonHovered) {
            return (
                <Button
                    onClick={onSignOut}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    variant="outline"
                >
                    Disconnect
                </Button>
            )
        }

        return (
            <Button
                onMouseEnter={() => setIsButtonHovered(true)}
                variant="outline"
            >
                {accountId}
            </Button>
        )
    }
    return (
        <Box
            sx={{
                width: '100%',
                bg: 'bg',
                borderBottom: accountId ? 0 : 1,
            }}
        >
            <Container
                as="header"
                variant="wide"
                pt={[2, 60]}
                pb={[0, 36]}
                px={0}
                sx={{
                    display: 'flex',
                    flexDirection: ['column', 'row'],
                    alignItems: ['left', 'center'],
                    flexWrap: 'wrap',
                }}
            >
                <Box
                    p={3}
                    sx={{
                        flex: 1,
                        textAlign: 'left',
                        borderBottom: [1, 0],
                    }}
                >
                    <a
                        href="/"
                        sx={{
                            variant: 'images.navLogo',
                            display: 'block',
                        }}
                    ></a>
                </Box>
                <a
                    href={`/${base}/bids`}
                    sx={{
                        p: 3,
                        flex: 1,
                        textAlign: ['left', 'center'],
                        textDecoration: 'none',
                        color: 'text',
                    }}
                >
                    <Text
                        sx={{
                            display: ['block', 'none'],
                        }}
                    >
                        {accountId ? accountId : 'blank'}
                    </Text>
                    <Text
                        variant="title"
                        sx={{
                            fontWeight: 'normal',
                            display: 'inline-block',
                        }}
                    >
                        {titleArray[1] && titleArray[0]}
                    </Text>
                    <Text
                        variant="title"
                        sx={{
                            display: 'inline-block',
                        }}
                    >
                        {titleArray[1] ? titleArray[1] : titleArray[0]}
                    </Text>
                    <Text
                        variant="body"
                        m={[0, 2]}
                        sx={{
                            display: 'inline-block',
                        }}
                    >
                        /PROJECTS
                    </Text>
                </a>
                <Box
                    sx={{
                        flex: 1,
                        textAlign: 'right',
                        display: ['none', 'block'],
                    }}
                >
                    <UserButton />
                </Box>
                {alertMessage && (
                    <Alert mt={2}>
                        <Text>{alertMessage.substring(0, 80)} ...</Text>
                        <Close
                            ml="auto"
                            mr={-2}
                            sx={{ height: '2rem', width: '4rem' }}
                            onClick={() => setAlertMessage('')}
                        />
                    </Alert>
                )}
            </Container>
        </Box>
    )
}
