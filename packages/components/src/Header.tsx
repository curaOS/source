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
    logo,
    nextLinkWrapper,
    mode,
    setMode,
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    alertMessage: string
    setAlertMessage: () => void
    title: string
    logo: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
    mode: string
    setMode: () => void
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const titleArray = title.split('/')

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
                pt={[0, 25]}
                pb={[0, 25]}
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
                        flex: ['unset', 'unset', 'unset', 1],
                        textAlign: 'left',
                        borderBottom: [1, 0],
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {nextLinkWrapper(
                        `/`,
                        <a
                            sx={{
                                variant: 'images.navLogo',
                                display: 'block',
                                backgroundImage: `url(${logo})`,
                                cursor: 'pointer',
                            }}
                        ></a>
                    )}
                    <Box
                        sx={{
                            display: ['block', 'none'],
                        }}
                    >
                        <IconButton
                            sx={{
                                position: 'relative',
                                zIndex: 11,
                                borderColor: isMenuOpen
                                    ? mode == 'dark'
                                        ? 'black'
                                        : 'white'
                                    : 'initial',
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
                                    stroke: isMenuOpen
                                        ? mode == 'dark'
                                            ? 'black'
                                            : 'white'
                                        : 'inherit',
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
                                {accountId ? (
                                    nextLinkWrapper(
                                        `/${base}/bids`,
                                        <Button
                                            variant="mobileMenu"
                                            sx={{
                                                color:
                                                    mode == 'dark'
                                                        ? 'black'
                                                        : 'white',
                                                borderColor:
                                                    mode == 'dark'
                                                        ? 'black'
                                                        : 'white',
                                            }}
                                        >
                                            bids
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        onClick={onSignIn}
                                        variant="mobileMenu"
                                        sx={{
                                            color:
                                                mode == 'dark'
                                                    ? 'black'
                                                    : 'white',
                                            borderColor:
                                                mode == 'dark'
                                                    ? 'black'
                                                    : 'white',
                                        }}
                                    >
                                        connect NEAR
                                    </Button>
                                )}
                                <Button
                                    as="a"
                                    href="https://twitter.com/CuraNear"
                                    target="_blank"
                                    variant="mobileMenu"
                                    sx={{
                                        color:
                                            mode == 'dark' ? 'black' : 'white',
                                        borderColor:
                                            mode == 'dark' ? 'black' : 'white',
                                    }}
                                >
                                    twitter ↗
                                </Button>
                                {accountId && (
                                    <Button
                                        onClick={onSignOut}
                                        variant="mobileMenu"
                                        sx={{
                                            color:
                                                mode == 'dark'
                                                    ? 'black'
                                                    : 'white',
                                            borderColor:
                                                mode == 'dark'
                                                    ? 'black'
                                                    : 'white',
                                        }}
                                    >
                                        disconnect
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
                <a
                    href="#nothing"
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
                        {titleArray[1] && titleArray[0] + '/'}
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
                    {accountId ? (
                        <>
                            {nextLinkWrapper(
                                `/${base}/bids`,
                                <Button variant="outline">{accountId}</Button>
                            )}
                            <IconButton
                                onClick={onSignOut}
                                p={0}
                                ml={2}
                                sx={{
                                    width: 31,
                                    height: 31,
                                }}
                            >
                                <svg
                                    width="14"
                                    height="16"
                                    viewBox="0 0 14 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 1H13V15H2" strokeWidth="1.3" />
                                    <path d="M0 8H8" strokeWidth="1.3" />
                                    <path d="M4 4L8 8L4 12" strokeWidth="1.3" />
                                </svg>
                            </IconButton>
                        </>
                    ) : (
                        <Button onClick={onSignIn} variant="primary">
                            Connect NEAR
                        </Button>
                    )}
                </Box>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: [0, 'unset'],
                        textAlign: ['center', 'initial'],
                        p: 50,
                        flexDirection: ['row', 'column'],
                        zIndex: 11,
                        justifyContent: 'center',
                        display: [isMenuOpen ? 'flex' : 'none', 'flex'],
                    }}
                >
                    <IconButton
                        sx={{
                            mb: 15,
                            bg: mode == 'dark' ? 'white' : 'text',
                            fill: mode == 'dark' ? 'bg' : 'white',
                            display: ['none', 'flex'],
                        }}
                        as="a"
                        href="https://twitter.com/CuraNear"
                        target="_blank"
                    >
                        <svg
                            width="24"
                            height="20"
                            viewBox="0 0 24 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7.60879 19.1194C16.2533 19.1194 20.9807 12.0128 20.9807 5.85031C20.9807 5.64849 20.9766 5.44759 20.9674 5.24752C21.8873 4.58706 22.6811 3.76931 23.3117 2.8326C22.4696 3.20409 21.5635 3.45413 20.6128 3.56686C21.5832 2.98953 22.3281 2.07616 22.6795 0.98743C21.757 1.5305 20.7477 1.91333 19.6952 2.11943C18.8376 1.21294 17.6166 0.645996 16.2646 0.645996C13.6693 0.645996 11.5646 2.7345 11.5646 5.3089C11.5646 5.67491 11.6059 6.03079 11.6866 6.37227C7.7805 6.17724 4.31689 4.3215 1.99887 1.49974C1.58137 2.21145 1.36177 3.02031 1.3625 3.84373C1.3625 5.46172 2.19218 6.89004 3.45393 7.72568C2.70759 7.70306 1.97763 7.50302 1.32544 7.14238C1.32474 7.16196 1.32474 7.18104 1.32474 7.20196C1.32474 9.46047 2.94471 11.3462 5.09517 11.7735C4.69129 11.8826 4.27452 11.9378 3.85591 11.9376C3.55361 11.9376 3.25898 11.908 2.97265 11.8535C3.57097 13.7065 5.30594 15.0549 7.36296 15.0926C5.7544 16.3436 3.72811 17.0888 1.52583 17.0888C1.15119 17.0891 0.776864 17.0676 0.404785 17.0242C2.48476 18.3471 4.95452 19.119 7.60902 19.119" />
                        </svg>
                    </IconButton>
                    <IconButton
                        sx={{
                            borderBottomLeftRadius: ['100%', 0],
                            borderBottomRightRadius: `0px !important`,
                            borderTopRightRadius: [0, '100%'],
                            bg: mode == 'dark' ? ['bg', 'white'] : 'tranparent',
                            borderColor:
                                mode == 'dark'
                                    ? ['bg', 'white']
                                    : ['white', 'text'],
                        }}
                        onClick={() => setMode('dark')}
                        disabled={mode == 'dark'}
                    >
                        <svg
                            width="18"
                            height="24"
                            viewBox="0 0 18 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            sx={{
                                stroke:
                                    mode == 'dark'
                                        ? ['white', 'bg']
                                        : ['white', 'text'],
                            }}
                        >
                            <path
                                d="M7.23539 12.1805C7.23539 7.32563 10.4538 3.22987 14.8584 1.93372C13.9153 1.65621 12.917 1.50439 11.8847 1.50439C6.03133 1.50439 1.28638 6.28414 1.28638 12.1805C1.28638 18.0768 6.03133 22.8565 11.8847 22.8565C12.917 22.8565 13.9153 22.7047 14.8584 22.4272C10.4538 21.1311 7.23539 17.0353 7.23539 12.1805Z"
                                strokeWidth="1.3"
                                strokeMiterlimit="10"
                            />
                        </svg>
                    </IconButton>
                    <IconButton
                        sx={{
                            borderTopRightRadius: ['100%', 0],
                            borderTopLeftRadius: `0px !important`,
                            borderBottomLeftRadius: [0, '100%'],
                            borderTop: [1, 0],
                            borderLeft: [0, 1],
                            bg:
                                mode == 'dark'
                                    ? ['transparent', 'bg']
                                    : 'white',
                            borderColor:
                                mode == 'dark'
                                    ? ['bg', 'white']
                                    : ['white', 'text'],
                        }}
                        onClick={() => setMode('light')}
                        disabled={mode == 'light'}
                    >
                        <svg
                            width="23"
                            height="22"
                            viewBox="0 0 23 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            sx={{
                                stroke:
                                    mode == 'dark'
                                        ? ['bg', 'white']
                                        : ['black', 'text'],
                            }}
                        >
                            <path
                                d="M17.8749 10.7245L22.3138 10.7125M0.826917 10.7703L5.26581 10.7583M11.5878 16.9988L11.5997 21.4071M11.5424 0.0750909L11.5543 4.48344M15.7498 15.4249L18.6936 18.7258M4.44737 2.75581L7.39117 6.0568M15.7253 6.0336L18.6512 2.71674M4.49178 18.7651L7.41768 15.4483M11.5832 15.114C9.1507 15.1206 7.17348 13.1684 7.16695 10.7536C7.16042 8.3388 9.12705 6.37591 11.5595 6.36933C13.992 6.36275 15.9692 8.31498 15.9758 10.7298C15.9823 13.1445 14.0157 15.1074 11.5832 15.114Z"
                                strokeWidth="1.3"
                                strokeMiterlimit="10"
                            />
                        </svg>
                    </IconButton>
                </Box>
                {alertMessage && (
                    <Alert sx={{ width: '100%' }} mt={3}>
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
