import { theme as curaTheme } from '@cura/components'

const gradientLarge = `/gradientLarge.webp`
const gradientSmall = `/gradientSmall.webp`

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

// Theme variants specific to this frontend that override curaTheme
const variants = {
    images: {
        ...curaTheme.images,
        gradient: {
            backgroundImage: [`url(${gradientSmall})`, `url(${gradientLarge})`],
            backgroundPosition: `center`,
            backgroundSize: `cover`,
        },
    },
}

export const theme = {
    ...curaTheme,
    ...variants,
    ...styles,
}
