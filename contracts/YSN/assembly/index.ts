import { logging, storage, u128, context } from 'near-sdk-as';
import { FTContractMetadata, INITIAL_SUPPLY, balances } from './model';
import { AccountId } from '../../utils'


export const SUPPLY_KEY = "minted_supply";

const whitelist : Array<AccountId> = ["share.ysn.testnet"];

export function ft_total_supply(): string {
  if (storage.hasKey(SUPPLY_KEY)) {
    return storage.getSome<u128>(SUPPLY_KEY).toString();
  } else {
    return "0";
  }
}

export function ft_balance_of(
    account_id: string
): string {
  if (balances.contains(account_id)) {
    return balances.getSome(account_id).toString();
  } else {
    return "0";
  }
}

export function ft_metadata(): FTContractMetadata {
  return new FTContractMetadata();
}


export function ft_mine_to(
  account_id: string,
  amount: u128,
  ): string {
    assert(whitelist.includes(context.predecessor), "Caller not whitelisted");

    let newBalance : u128 = u128.Zero;
    
    if (balances.contains(account_id)) {
      newBalance = u128.add(balances.getSome(account_id), amount);
    } else {
      newBalance = amount;
    }

    balances.set(account_id, newBalance);

    return newBalance.toString();
  }

/** INIT */

export function init(): void {
  assert(storage.get<string>("init") == null, "Already initialized");

  storage.set(SUPPLY_KEY, INITIAL_SUPPLY);

  storage.set("init", "done");
}