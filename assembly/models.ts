import { context, PersistentMap, PersistentSet } from "near-sdk-as";

type AccountId = string;

@nearBindgen
export class Design {
    owner: string;
    constructor(
        public instructions: string
    ) {
        this.owner = context.sender;
    }
}

export const designs = new PersistentMap<AccountId, Design>("d");

export const owners = new PersistentSet<AccountId>("o")