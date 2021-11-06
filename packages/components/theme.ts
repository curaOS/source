import { tailwind } from '@theme-ui/presets'

// when updating components use text variants for typography (e.g. text.body, text.navigation...) and add more variants if there is any missing
export const theme = {
    ...tailwind,
    fonts: {
        body: 'Acumin Pro, Helvetica, Arial, sans-serif',
        heading: 'Acumin Pro, Helvetica, Arial, sans-serif',
        monospace: 'Neue Machina, monospace',
    },
    fontSizes: [17, 19, 21, 26, 52],
    fontWeights: {
        body: 400,
        normal: 400,
        extrabold: 800,
    },
    lineHeights: {
        body: 1,
    },
    text: {
        body: {
            fontFamily: 'body',
            lineHeight: 'body',
            fontWeight: 'body',
            fontSize: 2,
        },
        navigation: {
            fontFamily: 'monospace',
            fontWeight: 'normal',
            fontSize: 2,
            textTransform: 'lowercase',
        },
        buttons: {
            0: {
                fontFamily: 'monospace',
                fontWeight: 'normal',
                fontSize: 0,
            },
            1: {
                fontFamily: 'monospace',
                fontWeight: 'extrabold',
                fontSize: 2,
                textTransform: 'uppercase',
            },
        },
        currency: {
            fontFamily: 'monospace',
            fontWeight: 'extrabold',
            fontSize: 3,
        },
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
