import { storage, u128 } from 'near-sdk-as';
import { FTContractMetadata, INITIAL_SUPPLY, balances } from './model';


export const SUPPLY_KEY = "minted_supply";

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

/** INIT */

export function init(): void {
  assert(storage.get<string>("init") == null, "Already initialized");

  storage.set(SUPPLY_KEY, INITIAL_SUPPLY);

  storage.set("init", "done");
}