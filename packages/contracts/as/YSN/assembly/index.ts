import { storage, u128, context } from 'near-sdk-as'
import { FTContractMetadata, balances } from './model'
import { AccountId } from '../../utils'
import { SHARE_ADDRESS } from '../../accounts'

export const SUPPLY_KEY = 'minted_supply'
export const TREASURY_KEY = 'treasury'

export const ZERO_NEAR: u128 = u128.Zero

const whitelist: Array<AccountId> = [SHARE_ADDRESS]

export function get_treasury(): string {
    if (storage.hasKey(TREASURY_KEY)) {
        return storage.getSome<u128>(TREASURY_KEY).toString()
    } else {
        return '0'
    }
}

export function ft_total_supply(): string {
    if (storage.hasKey(SUPPLY_KEY)) {
        return storage.getSome<u128>(SUPPLY_KEY).toString()
    } else {
        return '0'
    }
}

export function ft_balance_of(account_id: string): string {
    if (balances.contains(account_id)) {
        return balances.getSome(account_id).toString()
    } else {
        return '0'
    }
}

export function ft_metadata(): FTContractMetadata {
    return new FTContractMetadata()
}

export function ft_mine_to(account_id: string, amount: u128): string {
    assert(whitelist.includes(context.predecessor), 'Caller not whitelisted')

    let newBalance: u128 = u128.Zero

    if (balances.contains(account_id)) {
        newBalance = u128.add(balances.getSome(account_id), amount)
    } else {
        newBalance = amount
    }

    storage.set(SUPPLY_KEY, u128.add(storage.getSome<u128>(SUPPLY_KEY), amount))
    storage.set(
        TREASURY_KEY,
        u128.add(storage.getSome<u128>(TREASURY_KEY), context.attachedDeposit)
    )

    balances.set(account_id, newBalance)

    return newBalance.toString()
}

/** INIT */

export function init(): void {
    assert(storage.get<string>('init') == null, 'Already initialized')

    storage.set(SUPPLY_KEY, ZERO_NEAR)
    storage.set(TREASURY_KEY, ZERO_NEAR)

    storage.set('init', 'done')
}
