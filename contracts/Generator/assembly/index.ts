import { RNG, context } from 'near-sdk-as'

const SIZE = 32
const HALF_SIZE = SIZE / 2
const ONE = 1
const SPACE = 32
const schema: Array<u32> = [128995, 128993, 9899, 11093, 128280]

@nearBindgen
export class GenerateReturn {
    constructor(public instructions: string = '', public seed: u32 = 0) {}
}

/** Generate
 * In case art is generated on-chain, Autoglyphs as an example here
 */
export function generate(): GenerateReturn {
    const seed = <i32>randomNum()

    let encodedOutput: Array<u32> = []

    let a: i32 = seed

    let x: i32 = 0
    let y: i32 = 0
    let v: i32 = 0
    let value: u32 = 0
    let mod = (a % 11) + 5

    for (let i = 0; i < SIZE; i++) {
        y = 2 * (i - HALF_SIZE) + 1
        if (a % 3 == 1) {
            y = -y
        } else if (a % 3 == 2) {
            y = <i32>abs(y)
        }
        y = y * a
        for (let j = 0; j < SIZE; j++) {
            x = 2 * (j - HALF_SIZE) + 1
            if (a % 2 == 1) {
                x = <i32>abs(x)
            }
            x = x * a
            v = <i32>(abs((x * y) / ONE) % mod)
            if (v < 5) {
                value = schema[v]
            } else {
                value = SPACE
            }
            encodedOutput.push(value)
        }
    }

    const instructions = encodedOutput.toString()

    return new GenerateReturn(instructions, seed)
}

function abs(n: i32): i32 {
    if (n >= 0) return n
    return -n
}

function randomNum(max: u32 = <u32>context.blockIndex): u32 {
    const rng = new RNG<u32>(1, max)
    return rng.next()
}
