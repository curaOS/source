import { logging, RNG, context } from 'near-sdk-as';
import { generate } from './generate';
import { Design, designs, owners } from './models';


export function claimMyDesign(seed: i32) : void {
    assert(seed >= 0, "Seed needs to be valid.");
    assert(!designs.contains(context.sender), "You can only own one design.")

    let instructions = generate(seed);

    let design = new Design(instructions, seed);

    // logging.log(`\n\n\t> ART / Seed: ${seed} \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    logging.log("\n\n\tClaimed Art")

    designs.set(context.sender, design);
    owners.add(context.sender);
}

export function viewMyDesign() : Design {
    let design = designs.getSome(context.sender);

    // logging.log(`\n\n\t> Your Art \n\n\t` + design.instructions.replaceAll("\n", "\n\t") + "\n")
    
    return design;
}

export function burnMyDesign() : void {
    assert(designs.contains(context.sender), "No design to burn here.");

    designs.delete(context.sender);
    owners.delete(context.sender);

    logging.log(`\n\n\t> Design burned \n\n\t`)
} 

export function design(seed : i32 = 0) : Design {
    if (seed == 0) {
        seed = <i32>randomNum();
        logging.log(`\n\n\tCall claimMyDesign with the seed number ${seed} to claim it.\n`)
    }
    
    let instructions = generate(seed);

    let design = new Design(instructions, seed)

    // logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    return design;
}

export function viewRandomDesign() : Design {
    const ownersValues : Array<string> = owners.values();
    let randomDesignIndex : u32 = randomNum(owners.size); 

    logging.log(randomDesignIndex);
    
    let design : Design = designs.getSome(ownersValues[randomDesignIndex]);
    // logging.log(`\n\n\t> Owner : ${design.owner} \n\n\t` + design.instructions.replaceAll("\n", "\n\t") + "\n")

    return design;
}


function randomNum(max : u32 = <u32>context.blockIndex): u32 {
    const rng = new RNG<u32>(1, max);
    return rng.next()
}


