// @ts-nocheck
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'
import { NearHooksProvider } from '@cura/hooks'
import '@cura/components/assets/fonts/index.css'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/achrafismyname/cura-subgraph',
    cache: new InMemoryCache(),
})

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <RecoilRoot>
                    <NearHooksProvider>
                        <Component {...pageProps} />
                    </NearHooksProvider>
                </RecoilRoot>
            </ApolloProvider>
        </ThemeProvider>
    )
}

export default App
