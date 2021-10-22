// @ts-nocheck
/** @jsxImportSource theme-ui */

import { keyframes } from '@emotion/react'

const animateph = keyframes`
from {
  opacity: .7;
}
to {
  opacity: 1;
}
`

export function Placeholder({
    height = 20,
    width = 160,
    style
}: {
    height?: number
    width?: number
    style?: object
}) {
    return (
        <div
            sx={{
                height: height + 'px',
                width: width + 'px',
                bg: 'gray.3',
                borderRadius: 3,
                my: 2,
                animation: `${animateph} 1.2s ease-in infinite alternate`,
                ...style,
            }}
        ></div>
    )
}
