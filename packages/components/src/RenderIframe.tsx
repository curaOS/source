// @ts-nocheck
/** @jsxImportSource theme-ui */

export function RenderIframe({
    mediaURI,
    code,
    width,
}: {
    mediaURI?: string
    code?: string
    width?: number
}) {
    if (code) {
        return (
            <iframe
                srcDoc={code}
                width={width}
                height={width}
                frameBorder="0"
            ></iframe>
        )
    }

    if (mediaURI) {
        return (
            <iframe
                src={mediaURI}
                width={width}
                height={width}
                frameBorder="0"
            ></iframe>
        )
    }

    return null
}
