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

const gradients = {
    primary: [
        `linear-gradient(192deg, rgba(60,55,233,1) 3%, rgba(213,168,235,1) 57%, rgba(233,180,234,1) 100%)`,
        `linear-gradient(45deg, rgba(60,55,233,1) 0%, rgba(213,168,235,1) 50%, rgba(233,180,234,1) 100%)`,
    ],
}

// typography
const typography = {
    fonts: {
        body: `"Acumin Pro",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
        heading: `inherit`,
        monospace: `"Neue Machina",Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
    },
    fontSizes: [17, 19, 21, 26, 30, 36, 52],
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
            fontSize: [0, 1],
        },
        monospace: {
            fontFamily: `monospace`,
            lineHeight: `body`,
            fontWeight: `body`,
            fontSize: [0, 1],
        },
        buttons: {
            0: {
                fontFamily: `monospace`,
                fontWeight: `normal`,
                fontSize: 0,
            },
            1: {
                fontFamily: `monospace`,
                fontWeight: `normal`,
                fontSize: 2,
            },
            2: {
                fontFamily: `monospace`,
                fontWeight: `extrabold`,
                fontSize: 2,
            },
            3: {
                fontFamily: `monospace`,
                fontWeight: `normal`,
                fontSize: 5,
            },
        },
        currency: {
            fontFamily: `sans-serif`,
            fontWeight: `extrabold`,
            fontSize: 1,
        },
        h2: {
            fontFamily: `heading`,
            fontWeight: `bold`,
            fontSize: [3, 4],
        },
        h3: {
            fontFamily: `body`,
            lineHeight: `body`,
            fontWeight: `body`,
            fontSize: [0, 1],
            color: `white`,
        },
        h4: {
            fontFamily: `heading`,
            fontWeight: `normal`,
            fontSize: [0, 3],
        },
        h5: {
            fontFamily: `heading`,
            fontWeight: `bold`,
            fontSize: [1, 2],
        },
        title: {
            fontFamily: `heading`,
            fontWeight: `bold`,
            fontSize: [5, 6],
        },

    },
}

// Elements
const elements = {
    buttons: {
        navigation: {
            variant: `text.buttons.1`,
            cursor: `pointer`,
            bg: `bg`,
            color: `text`,
            borderRadius: 0,
            border: 1,
            borderLeft: 0,
            flex: 1,
            py: 12,
            paddingTop: '0.75rem',
            paddingBottom: '0.5rem',
            lineHeight: '25px',
            transitionDuration: `0.2s`,
            ':last-child': {
                borderRight: 0,
            },
            ':hover': {
                bg: `primary`,
                color: `bg`,
            },
        },
        primary: {
            variant: `text.buttons.1`,
            cursor: `pointer`,
            bg: `text`,
            color: `bg`,
            border: 1,
            borderRadius: 36,
            px: 3,
            py: 1,
            paddingTop: '0.5rem',
            transitionDuration: `0.2s`,
            ':hover': {
                opacity: 0.9,
            },
        },
        outline: {
            variant: `text.buttons.1`,
            cursor: `pointer`,
            bg: `transparent`,
            color: `text`,
            border: 1,
            borderRadius: 36,
            px: 3,
            py: 1,
            paddingTop: '0.5rem',
            transitionDuration: `0.2s`,
            ':hover': {
                borderColor: `primary`,
                color: `primary`,
            },
        },
        borderless: {
            variant: `text.buttons.2`,
            cursor: `pointer`,
            bg: `transparent`,
            color: `text`,
            p: 1,
            pl: 0,
            paddingTop: '0.75rem',
            transitionDuration: `0.2s`,
            ':hover': {
                textDecoration: `underline`,
            },
        },
        mobileMenu: {
            variant: `text.buttons.3`,
            cursor: `pointer`,
            borderRadius: 100,
            border: 1,
            borderColor: `white`,
            color: `white`,
            px: 1,
            py: `22px`,
        },
        icon: {
            variant: `text.buttons.1`,
            cursor: `pointer`,
            border: 1,
            width: [`2.5rem`, `2.3rem`],
            height: [`2.5rem`, `2.3rem`],
            borderBottomLeftRadius: [`40px`, `45px`],
            borderBottomRightRadius: [`40px`, `45px`],
            borderTopRightRadius: [`40px`, `45px`],
            borderTopLeftRadius: [`40px`, `45px`],
            transitionDuration: `0.2s`,
            stroke: `text`,
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
            lineHeight: 0,
            paddingTop: `0.75rem`,
            paddingBottom: `0.6rem`,
        },
    },
    images: {
        navLogo: {
            width: `48px`,
            height: `48px`,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundSize: `contain`,
        },
        gradient: {
            backgroundImage: gradients.primary,
            backgroundColor: `bg`,
            backgroundSize: `cover`,
        },
    },
    links: {
        navigation: {
            variant: `buttons.navigation`,
            borderTop: 0,
            borderBottom: 0,
            ':last-child': {
                borderRight: 1,
            },
            ':first-child': {
                borderLeft: 1,
            },
        },
        explorer: {
            variant: `text.body`,
            fontSize: 0,
            fontWeight: `extrabold`,
            color: `text`,
            textDecoration: `none`,
            '&:hover': {
                opacity: 0.9,
            },
        },
    },
    forms: {
        primary: {
            width: [`100%`, `100%`, 400],
            bg: `bg`,
            py: 20,
            row: {
                borderTop: 1,
                display: `flex`,
                justifyContent: `space-between`,
                alignItems: `center`,
                ':last-of-type': {
                    borderBottom: 1,
                },
            },
            label: {
                variant: `text.monospace`,
                width: `auto`,
            },
            input: {
                variant: `text.monospace`,
                flex: 1,
                textAlign: `right`,
                outline: `none`,
                border: 0,
                ml: 1,
                '&[type=number]::-webkit-inner-spin-button': {
                    ml: 1,
                },
                '&:focus': {
                    bg: `gray.4`,
                },
            },
            selectParent: {
                flex: 1,
            },
            select: {
                bg: `bg`,
                border: 0,
                cursor: `pointer`,
                outline: `none`,
                variant: `text.monospace`,
                fontWeight: `extrabold`,
                ':focus': {
                    bg: `gray.4`,
                },
            },
        },
    },
    error:{
        color:'red.7',
        fontSize:14
    }
}

// Layout containers
const layout = {
    layout: {
        container: {
            px: [2, 3, 4],
            maxWidth: 1024,
        },
        medium: {
            px: [2, 3, 4],
            maxWidth: 1324,
        },
        wide: {
            px: [2, 3, 4],
            maxWidth: 1536,
        },
    },
}

// Misc variants
const misc = {
    borders: {
        0: 0,
        1: `1px solid var(--theme-ui-colors-text)`, //getting color from css variable because border color doesn`t get parsed
    },
}

export const theme = {
    ...tailwind,
    ...colors,
    ...typography,
    ...elements,
    ...layout,
    ...misc,

    config: {
        useColorSchemeMediaQuery: false, // fix react hydration error
    },
}
