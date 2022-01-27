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
    twitter = 'https://twitter.com/CuraOnNear',
    nextLinkWrapper,
    isInitial,
    mode,
    setMode,
    twitter = 'https://twitter.com/curaonnear?s=21',
    discord = 'https://discord.gg/r649VD5TwD',
    telegram = 'https://t.me/creative_coding_guild',
}: {
    base: string
    accountId?: string
    onSignIn: () => void
    onSignOut: () => void
    alertMessage: string
    setAlertMessage: () => void
    title: string
    logo: string
    twitter: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
    isInitial: boolean
    mode: string
    setMode: () => void,
    twitter?: string,
    discord?: string,
    telegram?: string,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isButtonGrpOpen, setIsButtonGrpOpen] = useState(false)
    const titleArray = title ? title.split('/') : ''

    return (
        <Box
            sx={{
                width: '100%',
                bg: 'bg',
                borderBottom: accountId || isInitial ? 0 : 1,
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
                        borderBottom: [(isInitial ? 0 : 1), 0],
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
                                {accountId &&
                                    !isInitial &&
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
                                    )}
                                {!isInitial && (
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
                                    href={twitter}
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
                                <Button
                                    as="a"
                                    href={discord}
                                    target="_blank"
                                    variant="mobileMenu"
                                    sx={{
                                        color:
                                            mode == 'dark' ? 'black' : 'white',
                                        borderColor:
                                            mode == 'dark' ? 'black' : 'white',
                                    }}
                                >
                                    discord
                                </Button>
                                <Button
                                    as="a"
                                    href={telegram}
                                    target="_blank"
                                    variant="mobileMenu"
                                    sx={{
                                        color:
                                            mode == 'dark' ? 'black' : 'white',
                                        borderColor:
                                            mode == 'dark' ? 'black' : 'white',
                                    }}
                                >
                                    telegram
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
                {!isInitial && (
                    <Text
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
                    </Text>
                )}
                {!isInitial && (
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
                                    <Button variant="outline">
                                        {accountId}
                                    </Button>
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
                                        <path
                                            d="M2 1H13V15H2"
                                            strokeWidth="1.3"
                                        />
                                        <path d="M0 8H8" strokeWidth="1.3" />
                                        <path
                                            d="M4 4L8 8L4 12"
                                            strokeWidth="1.3"
                                        />
                                    </svg>
                                </IconButton>
                            </>
                        ) : (
                            <Button onClick={onSignIn} variant="primary">
                                Connect NEAR
                            </Button>
                        )}
                    </Box>
                )}
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
                    <Box>
                        <IconButton
                            sx={{
                                mb: 10,
                                bg: mode == 'dark' ? 'white' : 'text',
                                fill: mode == 'dark' ? 'bg' : 'white',
                                display: ['none', 'flex'],
                                transitionDuration: '0.5s',
                                transform: isButtonGrpOpen
                                    ? 'translate(0px,162px) rotate(60deg)'
                                    : 'translate(0,0) rotate(0deg)',
                                opacity: !isButtonGrpOpen ? '1' : '0',
                            }}
                            as="a"
                            href={discord}
                            target="_blank"
                        >
                            <svg 
                                width="25" 
                                height="18" 
                                viewBox="0 0 25 18" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M21.1482 1.49027C19.5281 0.789803 17.8192 0.289294 16.0638 0.0010782C16.048 -0.00151998 16.0317 0.000604817 16.0172 0.00715718C16.0027 0.0137095 15.9907 0.0243646 15.9829 0.0376434C15.7485 0.436553 15.5371 0.847119 15.3495 1.26756C13.4569 0.994997 11.5315 0.994997 9.63886 1.26756C9.44837 0.84669 9.23341 0.436094 8.99496 0.0376434C8.98646 0.0249819 8.97437 0.0148364 8.96006 0.00836942C8.94574 0.00190244 8.92979 -0.000624576 8.91403 0.0010782C7.15817 0.287555 5.44911 0.788132 3.82966 1.49027C3.81492 1.49652 3.80261 1.50699 3.79448 1.52019C0.557373 6.09081 -0.332831 10.5484 0.103474 14.9528C0.106834 14.9736 0.118092 14.9925 0.135142 15.006C2.02108 16.3286 4.13035 17.3401 6.37361 17.9977C6.38976 18.0014 6.40672 18.0006 6.42237 17.9953C6.43802 17.99 6.45166 17.9804 6.46157 17.9678C6.94512 17.3492 7.37239 16.6932 7.73882 16.0066C7.74346 15.9972 7.74604 15.9871 7.74642 15.9768C7.7468 15.9664 7.74496 15.9561 7.74101 15.9465C7.73707 15.9369 7.7311 15.9281 7.72346 15.9207C7.71583 15.9133 7.70669 15.9075 7.6966 15.9035C7.02257 15.6617 6.37062 15.3682 5.7473 15.026C5.73641 15.0189 5.7275 15.0095 5.72135 14.9985C5.71519 14.9875 5.71197 14.9752 5.71197 14.9628C5.71197 14.9503 5.71519 14.9381 5.72135 14.9271C5.7275 14.9161 5.73641 14.9067 5.7473 14.8996C5.87748 14.8099 6.00767 14.7135 6.13434 14.6138C6.14611 14.6074 6.15946 14.604 6.17305 14.604C6.18663 14.604 6.19998 14.6074 6.21175 14.6138C8.17651 15.485 10.3203 15.9366 12.4907 15.9366C14.6611 15.9366 16.8048 15.485 18.7696 14.6138C18.7818 14.6067 18.7958 14.603 18.8101 14.603C18.8244 14.603 18.8384 14.6067 18.8505 14.6138C18.9737 14.7102 19.1074 14.8099 19.2376 14.8996C19.2485 14.9067 19.2574 14.9161 19.2635 14.9271C19.2697 14.9381 19.2729 14.9503 19.2729 14.9628C19.2729 14.9752 19.2697 14.9875 19.2635 14.9985C19.2574 15.0095 19.2485 15.0189 19.2376 15.026C18.6154 15.3703 17.9633 15.6638 17.2883 15.9035C17.2778 15.9071 17.2683 15.9127 17.2604 15.92C17.2525 15.9273 17.2463 15.9362 17.2423 15.9459C17.2383 15.9557 17.2365 15.9662 17.2372 15.9766C17.2378 15.9871 17.2409 15.9973 17.2461 16.0066C17.619 16.689 18.0448 17.3445 18.5198 17.9678C18.53 17.9801 18.5437 17.9894 18.5592 17.9947C18.5748 18 18.5916 18.001 18.6077 17.9977C20.8555 17.3431 22.9688 16.3314 24.8568 15.006C24.8662 15.0002 24.8739 14.9923 24.8794 14.9831C24.885 14.9738 24.888 14.9634 24.8884 14.9528C25.4095 10.1996 24.0936 5.4287 21.1834 1.52019C21.1752 1.50699 21.1629 1.49652 21.1482 1.49027ZM8.34754 12.2703C7.11955 12.2703 6.10267 11.2033 6.10267 9.89356C6.10267 8.58387 7.09843 7.51352 8.34754 7.51352C9.59663 7.51352 10.6135 8.59052 10.5924 9.89356C10.5713 11.1966 9.60015 12.2703 8.34754 12.2703ZM16.6514 12.2703C15.4199 12.2703 14.4066 11.2033 14.4066 9.89356C14.4066 8.58387 15.3988 7.51352 16.6514 7.51352C17.904 7.51352 18.9139 8.59052 18.8963 9.89356C18.8787 11.1966 17.9251 12.2703 16.6514 12.2703Z" />
                            </svg>
                        </IconButton>
                        
                        <IconButton
                            sx={{
                                mb: 10,
                                bg: mode == 'dark' ? 'white' : 'text',
                                fill: mode == 'dark' ? 'bg' : 'white',
                                display: ['none', 'flex'],
                                transitionDuration: '0.5s',
                                transform: isButtonGrpOpen
                                    ? 'translate(0px,108px) rotate(40deg)'
                                    : 'translate(0,0) rotate(0deg)',
                                opacity: !isButtonGrpOpen ? '1' : '0',
                            }}
                            as="a"
                            href={telegram}
                            target="_blank"
                        >
                            <svg 
                                width="24" 
                                height="20" 
                                viewBox="1 -1 24 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8.85087 11.8377L8.54895 16.3975C8.54142 16.4893 8.5645 16.581 8.61508 16.6603C8.66566 16.7396 8.74131 16.8026 8.83184 16.841C8.92237 16.8793 9.02344 16.8911 9.12143 16.8747C9.21941 16.8583 9.30961 16.8145 9.37987 16.7493L12.1492 14.1891L17.4772 17.7685C17.6549 17.8877 17.8622 17.9639 18.08 17.99C18.2978 18.016 18.5192 17.9912 18.7239 17.9176C18.9286 17.8441 19.1101 17.7243 19.2518 17.5692C19.3934 17.414 19.4908 17.2285 19.5348 17.0296L22.9726 1.41508C23.0201 1.20731 23.0056 0.991526 22.9308 0.790755C22.856 0.589984 22.7236 0.411762 22.5478 0.275107C22.372 0.138453 22.1593 0.0484934 21.9325 0.0148303C21.7057 -0.0188327 21.4733 0.00506217 21.2601 0.0839672L0.39837 7.63321C0.279185 7.67614 0.177104 7.75182 0.105891 7.85006C0.034678 7.94829 -0.00224477 8.06434 0.000105633 8.18258C0.00245604 8.30081 0.0439652 8.41553 0.119034 8.51128C0.194104 8.60703 0.299123 8.67919 0.419933 8.71804L5.8748 10.489L18.4996 3.21766C18.5415 3.19399 18.5913 3.18551 18.6395 3.19386C18.6877 3.20221 18.7308 3.2268 18.7605 3.26287C18.7902 3.29894 18.8043 3.34391 18.8002 3.38908C18.7961 3.43425 18.774 3.47639 18.7381 3.50734L8.85087 11.8377Z"/>
                            </svg>

                        </IconButton>
                        
                        <IconButton
                            sx={{
                                mb: 10,
                                bg: mode == 'dark' ? 'white' : 'text',
                                fill: mode == 'dark' ? 'bg' : 'white',
                                display: ['none', 'flex'],
                                transitionDuration: '0.5s',
                                transform: isButtonGrpOpen
                                    ? 'translate(0px,54px) rotate(50deg)'
                                    : 'translate(0,0) rotate(0deg)',
                                opacity: !isButtonGrpOpen ? '1' : '0',
                            }}
                            as="a"
                            href={twitter}
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
                    </Box>
                    
                    <IconButton
                        sx={{
                            mb: 15,
                            display: ['none', 'flex'],
                            borderColor: mode == 'dark'
                                    ? 'white'
                                    : 'black',
                            transitionDuration: '0.3s',
                            transform: !isButtonGrpOpen
                                ? 'rotate(-135deg)'
                                : 'rotate(0deg)',
                            ':hover': {
                                bg: 'transparent',
                            },
                        }}
                        onClick={() => setIsButtonGrpOpen(!isButtonGrpOpen)}
                        as="a"
                        href={twitter}
                        target="_blank"
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            sx={{
                                fill: 'text',
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
