// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState } from 'react'
import {
    Text,
    Alert,
    Button,
    IconButton,
    Close,
    Box,
    Container,
} from 'theme-ui'

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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <a
                        href="/"
                        sx={{
                            variant: 'images.navLogo',
                            display: 'block',
                        }}
                    ></a>
                    <Box
                        sx={{
                            display: ['block', 'none'],
                        }}
                    >
                        <IconButton
                            sx={{
                                position: 'relative',
                                zIndex: 11,
                                borderColor: isMenuOpen ? 'white' : 'initial',
                                transitionDuration: '0.3s',
                                transform: isMenuOpen
                                    ? 'rotate(135deg)'
                                    : 'rotate(0deg)',
                                ':hover': {
                                    bg: 'transparent',
                                },
                            }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                sx={{
                                    fill: isMenuOpen ? 'white' : 'text',
                                    stroke: isMenuOpen ? 'white' : 'text',
                                    height: '100%',
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 12L25 12M12.0001 0V12.5L12.0001 25"
                                    strokeWidth="1.3"
                                />
                            </svg>
                        </IconButton>
                        {isMenuOpen && (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    zIndex: 10,
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    bg: 'primary',
                                    py: 100,
                                    px: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Button onClick={onSignIn} variant="mobileMenu">
                                    connect NEAR
                                </Button>
                                <Button
                                    as="a"
                                    href="https://twitter.com/CuraNear"
                                    target="_blank"
                                    variant="mobileMenu"
                                >
                                    twitter ↗
                                </Button>
                            </Box>
                        )}
                    </Box>
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
                        variant="monospace"
                        sx={{
                            display: ['block', 'none'],
                            pb: '8px',
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
                        variant="monospace"
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
