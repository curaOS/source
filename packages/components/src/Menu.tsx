// @ts-nocheck
/** @jsxImportSource theme-ui */

import { Text, Box, Container, Button } from 'theme-ui'

export function Menu({ accountId, base }: { accountId: string; base: string }) {
    const Btn = ({ href, content }) => (
        <Button
            as="a"
            variant="navigation"
            sx={{ borderTop: 0, borderBottom: 0 }}
            href={`/${base}/${href}`}
        >
            {content}
        </Button>
    )
    if (accountId) {
        return (
            <Box
                sx={{ width: '100%', bg: 'bg', borderTop: 1, borderBottom: 1 }}
            >
                <Container
                    as="nav"
                    variant="wide"
                    px={[0, 0, 0]}
                    sx={{ display: 'flex' }}
                >
                    <Btn href={`/create`} content="create" />
                    <Btn href={`/`} content="view" />
                    <Btn href={`/explore`} content="explore" />
                </Container>
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
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
