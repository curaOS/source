import { theme as curaTheme } from '@cura/components'

//  Default Styles
const styles = {
    styles: {
        root: {
            variant: `text.body`,
            bg: `bg`,
        },
        a: {
            variant: `text.buttons.1`,
        },
    },
}

export const theme = {
    ...curaTheme,
    ...styles,
}
