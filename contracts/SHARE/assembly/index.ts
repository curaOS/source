import { logging, RNG, context, u128, ContractPromise } from 'near-sdk-as';
import { generate } from './generate';
import { Design, TemporaryDesign, designs, owners, DESIGN_PRICE, FT_CONTRACT } from './models';
import { NFTContractMetadata } from './models';
import { xcc_market_set_bid_shares } from './xcc_market';

// 🟣 = 128995
// 🟡️ = 128993
// ⚫️ = 9899
// ⭕️ = 11093
// 🔘 = 128280
// ⚪️ = 9898


const SCHEMA_SIZE : i8 = 5;
const defaultCodePoints : Array<u32> = [128995, 128993, 9899, 11093, 128280];

const XCC_FT_MINE_TO_GAS = 25000000000000;

const ONE_YSN = u128.from("1000000000000000000000000");

const YSN_FOR_DESIGN = u128.div(ONE_YSN, u128.from(10)); // 0.1 YSN
const YSN_FOR_CLAIM = u128.div(ONE_YSN, u128.from(1)); // 1 YSN
const YSN_FOR_EXPLORE = u128.div(ONE_YSN, u128.from(20)); // 0.05 YSN


export function claimMyDesign(seed: i32, schema : Array<u32> = defaultCodePoints) : Design {
    assert(schema.length == SCHEMA_SIZE, "Wrong schema size dimension.");
    assert(seed >= 0, "Seed needs to be valid.");
    assert(u128.eq(context.attachedDeposit, DESIGN_PRICE), "Deposit is one NEAR.");
    assert(!designs.contains(context.sender), "You can only own one design.");

    let instructions = generate(seed, schema);
    let design = new Design(instructions.toString() , seed);

    // logging.log(`\n\n\t> ART / Seed: ${seed} \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    logging.log("\n\n\tClaimed Art")

    designs.set(context.sender, design);
    owners.add(context.sender);

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_CLAIM, DESIGN_PRICE);

    // Market
    xcc_market_set_bid_shares(design.id, 0, 1000, 9000);

    return design;
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

export function design(seed : i32 = 0, schema : Array<u32> = defaultCodePoints) : TemporaryDesign {
    assert(schema.length == SCHEMA_SIZE, "Wrong schema size dimension.");
    
    if (seed == 0) {
        seed = <i32>randomNum();
        logging.log(`\n\n\tCall claimMyDesign with the seed number ${seed} to claim it.\n`)
    }
    
    let instructions = generate(seed, schema);

    let design = new TemporaryDesign(instructions.toString(), seed);

    // logging.log(`\n\n\t> ART \n\n\t` + instructions.replaceAll("\n", "\n\t") + "\n")

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_DESIGN);

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
    limit: u8 = 0,
  ): Design[] {
    const start = <u32>parseInt(from_index);
    const end = (limit > 0 ? parseInt(nft_total_supply()) : limit) + start;

    const ownersValues : Array<string> = owners.values();

    let tokens : Array<Design> = [];
    
    for (let i = start; i < end; i++) {
        tokens.push(designs.getSome(ownersValues[i]))
    }

    xcc_ft_mine_to_and_transfer(context.sender, YSN_FOR_EXPLORE);

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
    limit: u8 = 0,
): Design[] {
    limit = 1;  
    return designs.contains(account_id) ? [designs.getSome(account_id)] : [];
}

/* XCC ft_mine_to */

@nearBindgen
export class FTMineToArgs {
    account_id: string;
    amount: u128;
}

function xcc_ft_mine_to_and_transfer(
    account_id: string,
    amount: u128,
    near_amount_to_deposit: u128 = u128.Zero,
): void {
    const remoteMethod = "ft_mine_to";

    let remoteMethodArgs: FTMineToArgs = {
        account_id: account_id,
        amount: amount,
    };

    const promise = ContractPromise.create(
        FT_CONTRACT,
        remoteMethod,
        remoteMethodArgs,
        XCC_FT_MINE_TO_GAS,
        near_amount_to_deposit
    )
      
    promise.returnAsResult();
}