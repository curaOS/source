// @ts-nocheck
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { AppProvider } from '../state/app.js'
import { RecoilRoot } from 'recoil'
import NearProvider from '@containers/index'

function App({ Component, pageProps }: AppProps) {
    return (
        // @ts-ignore: Unreachable code error
        <ThemeProvider theme={theme}>
            <AppProvider>
                <RecoilRoot>
                    <NearProvider>
                        <Component {...pageProps} />
                    </NearProvider>
                </RecoilRoot>
            </AppProvider>
        </ThemeProvider>
    )
}

export default App
