import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap"
            />
            <div
                sx={{
                    backgroundColor: 'gray.2',
                }}
            >
                <Story />
            </div>
        </ThemeProvider>
    ),
]
