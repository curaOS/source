import { logging, RNG } from'near-sdk-as'

const SIZE = 24;
const HALF_SIZE = SIZE / 2;
const ONE = 1;

let schema = ["🟣", "🟡️️", "⚫️", "⭕️", "🔘"];
  
export function generate(seed: i32) : string {
    let output : string = "";
    
    let a : i32 = 0;
    
    if (seed == 0) {
        a = <i32>randomNum();
    } else {
        a = <i32>seed;
    }

    logging.log(a);

    let x : i32 = 0;
    let y : i32 = 0;
    let v : i32 = 0;
    let value : string = "";
    let mod = (a % 11) + 5;

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
            output = output + value + "";
        }
        output = output + value + "\n";
    }

    return output;
}

function abs(n: i32) : i32 {
    if (n >= 0) return n;
    return -n;
}
 
function randomNum(): u8 {
    const rng = new RNG<u8>(1, 10000000)
    return rng.next()
}