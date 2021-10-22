// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useState, useEffect } from 'react'
import { Placeholder } from './Placeholder'

export function RenderIframe({
    mediaURI,
    code,
    width,
}: {
    mediaURI?: string
    code?: string
    width?: number
}) {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            {isLoading && (
                <Placeholder width={width} height={width} style={{ my: 0 }} />
            )}
            <iframe
                sx={{
                    position: isLoading && 'absolute',
                    top: isLoading && '-10000px',
                }}
                src={mediaURI ? mediaURI : null}
                srcDoc={code ? code : null}
                width={width}
                height={width}
                frameBorder="0"
                scrolling="no"
                onLoad={() => {
                    setIsLoading(false)
                }}
            ></iframe>
        </>
    )
}
