// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Box, Container, Button } from 'theme-ui'

export function Menu({
    base,
    nextLinkWrapper,
    activeLink,
    isDisconnected = false,
}: {
    base: string
    nextLinkWrapper: (link: string, children: JSX.Element) => JSX.Element
    activeLink: string
    isDisconnected: boolean
}) {
    const Btn = ({ href, content }) => {
        return nextLinkWrapper(
            `/${base}/${href}`,
            <Button
                variant="navigation"
                sx={{
                    borderTop: 0,
                    borderBottom: 0,
                    width: '100%',
                    bg: href === activeLink && 'primary',
                    color: href === activeLink && 'bg',
                }}
            >
                {content}
            </Button>
        )
    }

    if (!isDisconnected) {
        return (
            <Box
                sx={{ width: '100%', bg: 'bg', borderTop: 1, borderBottom: 1 }}
            >
                <Container
                    as="nav"
                    variant="wide"
                    px={[0, 0, 0]}
                    sx={{ display: 'flex', '>*': { flex: 1 } }}
                >
                    <Btn href={`create`} content="create" />
                    <Btn href={``} content="view" />
                    <Btn href={`explore`} content="explore" />
                </Container>
            </Box>
        )
    }
    if (isDisconnected) {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: 'inherit',
                    maxHeight: 'inherit',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                }}
                variant="images.gradient"
            >
                <Text variant="buttons.1">Please connect to use dapp</Text>
            </Box>
        )
    }
}
