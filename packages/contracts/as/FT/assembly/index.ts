import { storage, u128, context } from 'near-sdk-as'
import { FTContractMetadata, balances } from './model'
import { AccountId } from '../../utils'
import { SHARE_ADDRESS } from '../../accounts'

export const SUPPLY_KEY = 'minted_supply'
export const TREASURY_KEY = 'treasury'

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

export const METADATA_KEY = 'contract_metadata'

export function init(
    contract_metadata: FTContractMetadata,
    supply: u128,
    treasury: u128
): void {
    assert(storage.get<string>('init') == null, 'Already initialized')

    storage.set(SUPPLY_KEY, supply)
    storage.set(TREASURY_KEY, treasury)

    storage.set(
        METADATA_KEY,
        new FTContractMetadata(
            contract_metadata.spec,
            contract_metadata.name,
            contract_metadata.symbol,
            contract_metadata.icon,
            contract_metadata.reference,
            contract_metadata.reference_hash,
            contract_metadata.decimals
        )
    )

    storage.set('init', 'done')
}

export function ft_metadata(): FTContractMetadata {
    return storage.getSome<FTContractMetadata>(METADATA_KEY)
}
