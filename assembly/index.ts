import { logging, Context } from 'near-sdk-as';
import { generate } from './generate';
import { Design, designs } from './models';


export function claimMyDesign(seed: i32): void {
    assert(seed >= 0, "Seed needs to be valid.");
    const sender = Context.sender
    assert(!designs.contains(sender), "You can only own one design.")

    let design = Design.generate(seed);

    logMessage(`ART / Seed: ${seed}`, design.instructions)

    logging.log("\n\n\tClaimed Art")

    designs.set(sender, design);
}

export function viewMyDesign(): void {
    const sender = Context.sender
    assert(designs.contains(sender), `[Account ${sender}] has no registered designs.`)
    let design = designs.getSome(sender);

    logMessage("Your Art", design.instructions)
}

export function burnMyDesign(): void {
    const sender = Context.sender
    assert(designs.contains(sender), "No design to burn here.");

    designs.delete(sender);

    logging.log(`\n\n\t> Design burned \n\n\t`)
}

export function design(seed: i32 = 0): void {
    let instructions = generate(seed);

    logMessage("ART", instructions)
}

export function viewDesigns(start: i32 = 0, end: i32 = design.length): void {
    const ownersValues = designs.values(start, end)
    let design: Design;

    for (let i = 0; i < ownersValues.length; i++) {
        design = ownersValues[i];
        logMessage(`Owner : ${design.owner}`, design.instructions)
    }
}

function logMessage(prefix: string, instructions: string): void {
    logging.log(`\n\n\t> ${prefix} \n\n\t${instructions.replaceAll("\n", "\n\t")}\n`)
}


// burn/delete user might want to do it to create new one
