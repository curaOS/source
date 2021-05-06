import { logging, RNG, context } from 'near-sdk-as';
import { generate } from './generate';
import { Design, designs, owners } from './models';
import { NFTContractMetadata } from './models'

// 🟣 = 128995
// 🟡️ = 128993
// ⚫️ = 9899
// ⭕️ = 11093
// 🔘 = 128280
// ⚪️ = 9898

const SCHEMA_SIZE : i8 = 5;
const defaultCodePoints : Array<i32> = [128995, 128993, 9899, 11093, 128280];


export function claimMyDesign(seed: i32, schema : Array<i32> = defaultCodePoints) : void {
    assert(schema.length == SCHEMA_SIZE, "Wrong schema size dimension.");
    assert(seed >= 0, "Seed needs to be valid.");
    assert(!designs.contains(context.sender), "You can only own one design.")

    let instructions = generate(seed, schema);

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

export function design(seed : i32 = 0, schema : Array<i32> = defaultCodePoints) : Design {
    assert(schema.length == SCHEMA_SIZE, "Wrong schema size dimension.");
    
    if (seed == 0) {
        seed = <i32>randomNum();
        logging.log(`\n\n\tCall claimMyDesign with the seed number ${seed} to claim it.\n`)
    }
    
    let instructions = generate(seed, schema);

    let design = new Design(instructions, seed)

    // logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    return design;
}

export function viewRandomDesign() : Design {
    const ownersValues : Array<string> = owners.values();
    let randomDesignIndex : u32 = randomNum(owners.size); 

    logging.log(randomDesignIndex);
    
    let design : Design = designs.getSome(ownersValues[randomDesignIndex]);
    // logging.log(`\n\n\t> Owner : ${design.owner_id} \n\n\t` + design.instructions.replaceAll("\n", "\n\t") + "\n")

    return design;
}

export function nft_token(token_id: string): Design | null { // token_id == owner_id
    return designs.getSome(token_id);
}

function randomNum(max : u32 = <u32>context.blockIndex): u32 {
    const rng = new RNG<u32>(1, max);
    return rng.next()
}


export function nft_metadata(): NFTContractMetadata {
    return new NFTContractMetadata();
}


export function nft_total_supply(): string {
    return owners.size.toString();
}


export function nft_tokens(
    from_index: string = "0",
    limit: number = 0,
  ): Design[] {
    const start = <u32>parseInt(from_index);
    const end = (limit > 0 ? parseInt(nft_total_supply()) : limit) + start;

    const ownersValues : Array<string> = owners.values();

    let tokens : Array<Design> = [];
    
    for (let i = start; i < end; i++) {
        tokens.push(designs.getSome(ownersValues[i]))
    }

    return tokens;
  }

 export function nft_supply_for_owner(
    account_id: string,
  ): string {
      return designs.contains(account_id) ? "1" : "0"; 
  }


  export function nft_tokens_for_owner(
    account_id: string,
    from_index: string = "0",
    limit: number = 0,
  ): Design[] {
    limit = 1;
    return designs.contains(account_id) ? [designs.getSome(account_id)] : [];
  }