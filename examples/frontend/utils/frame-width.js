import { useBreakpointIndex } from '@theme-ui/match-media'

const CANVAS_WIDTH = [300, 400, 500, 600, 700] // 0-4

export function getFrameWidth(small) {
    const mediaIndex = useBreakpointIndex()
    const designDimension = CANVAS_WIDTH[mediaIndex] / (small ? 2 : 1)
    return designDimension
}
