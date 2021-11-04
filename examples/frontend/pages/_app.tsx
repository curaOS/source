// @ts-nocheck
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'
import { NearHooksProvider } from '@cura/hooks'
import '../public/fonts/style.css'

function App({ Component, pageProps }: AppProps) {
    return (
        // @ts-ignore: Unreachable code error
        <ThemeProvider theme={theme}>
            <RecoilRoot>
                <NearHooksProvider>
                    <Component {...pageProps} />
                </NearHooksProvider>
            </RecoilRoot>
        </ThemeProvider>
    )
}

export default App
