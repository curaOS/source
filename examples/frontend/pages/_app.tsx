// @ts-nocheck
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { RecoilRoot } from 'recoil'
import { NearHooksProvider } from '@cura/hooks'
import '@cura/components/assets/fonts/index.css'

function App({ Component, pageProps }: AppProps) {
    return (
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
