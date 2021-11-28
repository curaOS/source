import {
    logging,
    context,
    u128,
    ContractPromiseBatch,
    storage,
} from 'near-sdk-as'
import {
    accounts,
    StorageBalance,
    StorageBalanceBounds,
} from './models'
import {
    assert_one_yocto,
} from './asserts'
import {
    storage_byte_cost,
} from './internal_functions'


export const STORAGE_USAGE_KEY = 'storage_usage'

export function storage_deposit(
    account_id: string | null,
    registration_only: Boolean | null = null
): StorageBalance {
    const amount = context.attachedDeposit
    if (account_id == null) account_id = context.sender
    account_id = account_id as string
    if (accounts.contains(account_id)) {
        logging.log('Account already registered')
        if (u128.gt(amount, u128.from('0'))) {
            ContractPromiseBatch.create(account_id).transfer(amount)
        }
    } else {
        const minBalance = u128.from(storage_balance_bounds().min)
        assert(
            amount >= minBalance,
            'Attached deposit less than minimum required'
        )
    }
    return accounts.get(account_id) as StorageBalance
}

export function storage_withdraw(amount: string | null): StorageBalance {
    assert_one_yocto()
    const account_id = context.sender
    const amount_available = accounts.get(account_id).available
    assert(amount_available, 'Account not registered')
    const balance = accounts.get(account_id) as StorageBalance
    if (amount) {
        assert(
            u128.gt(u128.from(amount as string), u128.from(accounts.get(account_id).available)),
            'The amount is greater than available storage balance'
        )
        ContractPromiseBatch.create(account_id).transfer(u128.from(amount))
    } else {
        ContractPromiseBatch.create(account_id).transfer(u128.from(amount_available))
    }
    return balance as StorageBalance
}

export function storage_unregister(force: Boolean | null = null): boolean {
    assert_one_yocto()
    const account_id = context.sender
    const account = accounts.getSome(account_id)
    if (account) {
        const balance = accounts.getSome(account_id).available
        if (u128.eq(u128.from(balance), u128.from('0')) || force) {
            accounts.delete(account_id)
            ContractPromiseBatch.create(account_id).transfer(
                u128.add(u128.from(storage_balance_bounds().min), u128.from(1))
            )
            return true
        } else {
            assert(false, 'Account balance is not zero')
        }
    }
    return false
}

export function storage_balance_bounds(): StorageBalanceBounds {
    const storage_usage = storage.getSome<u128>(STORAGE_USAGE_KEY)
    const cost = u128.mul(storage_usage, storage_byte_cost())
    return <StorageBalanceBounds>{ min: cost.toString(), max: '' }
}

export function storage_balance_of(account_id: string): StorageBalance | null {
    return accounts.get(account_id)
}