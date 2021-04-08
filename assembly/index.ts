import { logging, math } from'near-sdk-as'

const SIZE = 28;
const HALF_SIZE = SIZE / 2;

const ONE = 1;

let schema = ["🟣", "🟡️️", "⚫️", "⭕️", "🔘"];
  
export function draw() : void{ // Array<string> 
    let output = Array.create<string>(SIZE * SIZE);
    
    let a : i32 = <i32>randomNum();

    let c : i32 = 0;
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
            output[c] = value + "";
            c++;
        }
        output[c] = "\n";
        c++;
    }

    logging.log("Art")
    logging.log(`\n\n > ART / Seed: ${a} \n\n` + output.join("") + "\n")
    // return output;
}

function abs(n: i32) : i32 {
    if (n >= 0) return n;
    return -n;
}


function randomNum(): u32 {
    let buf = math.randomBuffer(5);
    return (
      (0xff & buf[0]) << 32 |
      (0xff & buf[1]) << 24 |
      (0xff & buf[2]) << 16 |
      (0xff & buf[3]) << 8  |
      (0xff & buf[3]) << 0
    ) % 100;
}
  