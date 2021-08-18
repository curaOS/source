// @ts-nocheck
/** @jsxImportSource theme-ui */
import { useBreakpointIndex } from '@theme-ui/match-media'
import dynamic from 'next/dynamic'

const CANVAS_WIDTH = [300, 400, 500, 600, 700] // 0-4

const design = (image = '', mediaIndex = 0, small = false) => (p) => {
    console.log(image)

    let c = ''
    let img
    const designDimension = CANVAS_WIDTH[mediaIndex] / (small ? 2 : 1)

    p.preload = () => {
        img = p.loadImage(image)
    }

    p.setup = () => {
        p.createCanvas(designDimension, designDimension)

        p.background(0)
        p.image(img, 0, 0, designDimension, designDimension)
        p.noLoop()
    }
}

const P5Wrapper = dynamic(import('react-p5-wrapper'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

export default function MediaImage({
    image,
    small,
}: {
    image: string
    small: boolean
}) {
    const mediaIndex = useBreakpointIndex()

    const renderP5 = (image: string) => {
        const sketch = design(image, mediaIndex, small)
        return <P5Wrapper sketch={sketch} />
    }

    return <div>{renderP5(image)}</div>
}
