// @ts-nocheck
/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Box, IconButton, Link, Text, Heading } from 'theme-ui'

export function List({ data = [], width, title }) {
    return (
        <>
            <Box
                sx={{
                    width: width ? width : ['100%', '100%', 400],
                    bg: 'bg',
                    py: 3,
                }}
            >
                {title && (
                    <Heading variant="h3" mb={3}>
                        {title}
                    </Heading>
                )}
                {data.map((v, i) => (
                    <Row item={v} key={i} />
                ))}
            </Box>
        </>
    )
}

function Row({ item }) {
    const [showCopyMsg, setShowCopyMsg] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(item.content)
        setShowCopyMsg(true)
        setTimeout(() => {
            setShowCopyMsg(false)
        }, 1000)
    }

    const trimString = (string, length) => {
        return string.length > length
            ? string.substring(0, length) + '...'
            : string
    }

    const content = trimString(item.content, 22)
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
                pr: !item.copiable && 37,
            }}
        >
            <Text
                variant="body"
                sx={{
                    fontWeight: 'bold',
                    mr: 'auto',
                }}
            >
                {item.title}
            </Text>
            {item.link ? (
                <Link
                    href={item.link}
                    target="_blank"
                    sx={{
                        textAlign: 'right',
                    }}
                >
                    <Text variant="buttons.0">{content}</Text>
                </Link>
            ) : (
                <Text
                    variant="buttons.0"
                    sx={{
                        textAlign: 'right',
                    }}
                >
                    {content}
                </Text>
            )}
            {item.copiable && (
                <IconButton
                    sx={{
                        border: 0,
                        position: 'relative',
                        ':hover': {
                            opacity: 0.6,
                        },
                        ':active': {
                            opacity: 0.8,
                        },
                    }}
                    onClick={handleCopy}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height="17px"
                        width="17px"
                    >
                        <g>
                            <path
                                sx={{
                                    fill: 'gray.7',
                                }}
                                d="M48 512a48 48 0 0 1-48-48V176a48 48 0 0 1 48-48h48v208a80.09 80.09 0 0 0 80 80h208v48a48 48 0 0 1-48 48H48z"
                            ></path>
                            <path
                                sx={{
                                    fill: 'gray.8',
                                }}
                                d="M512 48v288a48 48 0 0 1-48 48H176a48 48 0 0 1-48-48V48a48 48 0 0 1 48-48h288a48 48 0 0 1 48 48z"
                            ></path>
                        </g>
                    </svg>
                    <Text
                        sx={{
                            position: 'absolute',
                            fontSize: 14,
                            top: '-10px',
                            opacity: showCopyMsg ? 1 : 0,
                            transitionDuration: '300ms',
                            pointerEvents: 'none',
                        }}
                    >
                        COPIED
                    </Text>
                </IconButton>
            )}
        </Box>
    )
}
