// @ts-nocheck
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'
import NearProvider from '@containers/index'

function App({ Component, pageProps }: AppProps) {
    return (
        // @ts-ignore: Unreachable code error
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <NearProvider>
                    <Component {...pageProps} />
                </NearProvider>
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default App
