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
    height = '20px',
    width = '160px',
    style,
}: {
    height?: number | string
    width?: number | string
    style?: object
}) {
    return (
        <div
            sx={{
                height: height,
                width: width,
                bg: 'gray.3',
                borderRadius: 3,
                my: 2,
                animation: `${animateph} 1.2s ease-in infinite alternate`,
                ...style,
            }}
        ></div>
    )
}
