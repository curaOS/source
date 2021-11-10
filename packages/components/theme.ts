import { tailwind } from '@theme-ui/presets'

export const theme = {
    ...tailwind,
    fonts: {
        ...tailwind.fonts,
        body: 'IBM Plex Sans, sans-serif',
        heading: 'IBM Plex Sans, sans-serif',
    },
    buttons: {
        primary: {
            cursor: 'pointer',
            bg: 'rgba(16, 16, 16, 1)',
            color: '#fff',
            borderRadius: '36px',
            paddingTop: '2px',
            paddingBottom: '2px',
            px: 4,
        },
        secondary: {
            cursor: 'pointer',
            bg: '#fff',
            color: 'rgba(16, 16, 16, 1)',
            border: '1px solid rgba(16, 16, 16, 1)',
            borderRadius: '36px',
            paddingTop: '2px',
            paddingBottom: '2px',
            px: 4,
        },
        borderless: {
            cursor: 'pointer',
            bg: '#fff',
            color: 'rgba(16, 16, 16, 1)',
            paddingTop: '2px',
            paddingBottom: '2px',
            px: 4,
        },
    },
}
