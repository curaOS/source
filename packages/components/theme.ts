import { tailwind, baseColors } from '@theme-ui/preset-tailwind'

// Theme colors + Tailwand base colors
const colors = {
    colors: {
        ...baseColors,
        text: `#101010`,
        bg: `#D7D7D7`,
        primary: `#3C38ED`,
        modes: {
            dark: {
                text: `#FFFFFF`,
                bg: `#101010`,
                primary: `#EDB4EE`,
            },
        },
    },
}

// typography
const typography = {
    fonts: {
        body: `"Acumin Pro",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
        heading: `inherit`,
        monospace: `"Neue Machina",Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
    },
    fontSizes: [17, 19, 21, 26, 30, 52],
    fontWeights: {
        body: 400,
        normal: 400,
        bold: 700,
        extrabold: 800,
    },
    lineHeights: {
        body: 1,
        heading: 1.2,
    },
    text: {
        body: {
            fontFamily: `body`,
            lineHeight: `body`,
            fontWeight: `body`,
            fontSize: [1, 2],
        },
        navigation: {
            fontFamily: `monospace`,
            fontWeight: `normal`,
            fontSize: 2,
            textTransform: `lowercase`,
        },
        buttons: {
            0: {
                fontFamily: `monospace`,
                fontWeight: `normal`,
                fontSize: 0,
            },
            1: {
                fontFamily: `monospace`,
                fontWeight: `extrabold`,
                fontSize: 2,
                textTransform: `uppercase`,
            },
        },
        currency: {
            fontFamily: `monospace`,
            fontWeight: `extrabold`,
            fontSize: 3,
        },
        h2: {
            fontFamily: `heading`,
            fontWeight: `bold`,
            fontSize: [3, 4],
        },
    },
}

// Elements
const elements = {
    buttons: {
        navigation: {
            variant: `text.navigation`,
            cursor: `pointer`,
            bg: `bg`,
            color: `text`,
            borderRadius: 0,
            borderWidth: 1,
            borderColor: `text`,
            borderStyle: `solid`,
            borderLeft: 0,
            flex: 1,
            py: 12,
            transitionDuration: `0.1s`,
            ':last-child': {
                borderRight: 0,
            },
            ':hover': {
                bg: `primary`,
                color: `bg`,
            },
        },
        uno: {
            cursor: `pointer`,
            bg: `gray.3`,
            color: `gray.8`,
            borderRadius: `sm`,
            px: 4,
            ':hover': {
                bg: `gray.7`,
                color: `gray.3`,
            },
        },
        due: {
            cursor: `pointer`,
            bg: `gray.8`,
            color: `gray.3`,
            borderRadius: `sm`,
            px: 4,
            ':hover': {
                bg: `gray.2`,
                color: `gray.8`,
            },
        },
        red: {
            cursor: `pointer`,
            bg: `red.4`,
            color: `red.1`,
            borderRadius: `sm`,
            px: 5,
            ':hover': {
                bg: `red.8`,
                color: `red.5`,
            },
        },
        orange: {
            cursor: `pointer`,
            bg: `orange.4`,
            color: `orange.1`,
            borderRadius: `sm`,
            px: 5,
            ':hover': {
                bg: `orange.5`,
                color: `orange.2`,
            },
        },
    },
    badges: {
        tag: {
            variant: `text.buttons.0`,
            bg: `text`,
            color: `bg`,
            borderRadius: `full`,
            px: 2,
            py: 1,
        },
    },
}

export const theme = {
    ...tailwind,
    ...colors,
    ...typography,
    ...elements,
}
