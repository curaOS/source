import { tailwind } from '@theme-ui/presets'

export const theme = {
    ...tailwind,
    fonts: {
        ...tailwind.fonts,
        body: 'IBM Plex Sans, sans-serif',
        heading: 'IBM Plex Sans, sans-serif',
    },
    buttons: {
        uno: {
            cursor: 'pointer',
            bg: 'gray.3',
            color: 'gray.8',
            borderRadius: 'sm',
            px: 4,
            ':hover': {
                bg: 'gray.7',
                color: 'gray.3',
            },
        },
        due: {
            cursor: 'pointer',
            bg: 'gray.8',
            color: 'gray.3',
            borderRadius: 'sm',
            px: 4,
            ':hover': {
                bg: 'gray.2',
                color: 'gray.8',
            },
        },
        red: {
            cursor: 'pointer',
            bg: 'red.4',
            color: 'red.1',
            borderRadius: 'sm',
            px: 5,
            ':hover': {
                bg: 'red.8',
                color: 'red.5',
            },
        },
        orange: {
            cursor: 'pointer',
            bg: 'orange.4',
            color: 'orange.1',
            borderRadius: 'sm',
            px: 5,
            ':hover': {
                bg: 'orange.5',
                color: 'orange.2',
            },
        },
    },
}
