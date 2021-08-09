// @ts-nocheck
/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media'

const CANVAS_WIDTH = [300, 400, 500, 600, 700] // 0-4

export default function RenderIframe({
    mediaURI,
    small,
}: {
    mediaURI: string
    small: boolean
}) {
    const mediaIndex = useBreakpointIndex()

    const designDimension = CANVAS_WIDTH[mediaIndex] / (small ? 2 : 1)

    return (
        <iframe
            src={mediaURI}
            width={designDimension}
            height={designDimension}
            frameBorder="0"
        ></iframe>
    )
}
