import { logging, RNG, context } from 'near-sdk-as'

const SIZE = 22;
const HALF_SIZE = SIZE / 2;
const ONE = 1;

let schema = ["🟣", "🟡️️", "⚫️", "⭕️", "🔘"];

export function generate(seed: i32): string {
    let output: Array<string> = new Array<string>((SIZE + 1) * SIZE);

    let a: i32 = 0;

    // TODO move this to index
    if (seed == 0) {
        a = <i32>randomNum();
        logging.log(`\n\n\tCall claimMyDesign with the seed number ${a} to claim it.\n`)
    } else {
        a = <i32>seed;
    }

    let x: i32 = 0;
    let y: i32 = 0;
    let v: i32 = 0;
    let value: string = "";
    let mod = (a % 11) + 5;
    let pos = 0;

    for (let i = 0; i < SIZE; i++) {
        y = (2 * (i - HALF_SIZE) + 1);
        if (a % 3 == 1) {
            y = -y;
        } else if (a % 3 == 2) {
            y = <i32>abs(y);
        }
        y = y * a;
        for (let j = 0; j < SIZE; j++) {
            x = (2 * (j - HALF_SIZE) + 1);
            if (a % 2 == 1) {
                x = <i32>abs(x);
            }
            x = x * a;
            v = <i32>(abs(x * y / ONE) % mod);
            if (v < 5) {
                value = schema[v];
            } else {
                value = "⚪️";
            }
            output[pos++] = value;
        }
        output[pos++] = "\n";
    }
    return output.join("");
}

function abs(n: i32): i32 {
    if (n >= 0) return n;
    return -n;
}

function randomNum(): u32 {
    const rng = new RNG<u32>(1, <u32>context.blockIndex);
    return rng.next()
}
