// @ts-nocheck
/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from '@theme-ui/match-media'
import dynamic from 'next/dynamic'

const SIZE = 32

const CANVAS_WIDTH = [300, 400, 500, 600, 700] // 0-4

const design = (instructions = [], mediaIndex = 0) => (p) => {
    let c = ''
    const designDimension = CANVAS_WIDTH[mediaIndex]

    const canvasStep = [
        designDimension / (SIZE * 1.1),
        designDimension / (SIZE * 1.1),
    ]
    const canvasTextSize = designDimension / (SIZE * 1.7)

    const canvasStart = [
        (designDimension - canvasStep[0] * (SIZE - 0.2)) / 2,
        (designDimension - canvasStep[1] * (SIZE - 1.5)) / 2,
    ]

    p.setup = () => {
        p.createCanvas(designDimension, designDimension)
        p.noLoop()
        if (instructions.length > 0) {
            p.background(0)
            p.textSize(canvasTextSize)
            for (let i = 0; i < SIZE; i++) {
                for (let j = 0; j < SIZE; j++) {
                    c = String.fromCodePoint(instructions[j + i * SIZE])

                    p.text(
                        c,
                        canvasStart[0] + j * canvasStep[0],
                        canvasStart[1] + i * canvasStep[1]
                    )
                }
            }
        }
    }
}

const P5Wrapper = dynamic(import('react-p5-wrapper'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
})

export default function Design({
    instructions,
}: {
    instructions: Array<number>
}) {
    const mediaIndex = useBreakpointIndex()

    const renderP5 = (instructions: Array<number>) => {
        const sketch = design(instructions, mediaIndex)
        return <P5Wrapper sketch={sketch} />
    }

    return <div>{renderP5(instructions)}</div>
}
