import { Context, PersistentUnorderedMap } from "near-sdk-as";
import { generate } from './generate';

type AccountId = string;

@nearBindgen
export class Design {
    owner: string = Context.sender;
    constructor(
        public instructions: string
    ) { }

    static generate(seed: i32): Design {
        return new Design(generate(seed))
    }
}

export const designs = new PersistentUnorderedMap<AccountId, Design>("d");
