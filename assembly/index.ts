import { logging, context } from 'near-sdk-as';
import { generate } from './generate';
import { Design, designs } from './models';


export function claimMyDesign(seed: i32) : void {
    assert(seed >= 0, "Seed needs to be valid.");
    assert(!designs.contains(context.sender), "You can only own one design.")

    let instructions = generate(seed);

    let design = new Design(instructions);

    logging.log(`\n\n\t> ART / Seed: ${seed} \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    logging.log("\n\n\tClaimed Art")

    designs.set(context.sender, design);
}

export function viewMyDesign() : void {
    let design = designs.getSome(context.sender);

    logging.log(`\n\n\t> Your Art \n\n\t` + design.instructions.replaceAll("\n", "\n\t") + "\n")

}

export function burnMyDesign() : void {
    assert(designs.contains(context.sender), "No design to burn here.");

    designs.delete(context.sender);

    logging.log(`\n\n\t> Design burned \n\n\t`)
} 

export function design(seed : i32 = 0) : void {
    let instructions = generate(seed);

    logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")
}

// burn/delete user might want to do it to create new one


