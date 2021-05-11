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
  const balance = balances.get(account_id, null);

  return (balance == null) ? "0" : balance.toString();
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