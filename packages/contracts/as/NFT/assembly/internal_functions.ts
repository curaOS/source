import {
    context,
    u128,
    ContractPromiseBatch,
    PersistentUnorderedMap,
} from 'near-sdk-as'

function storage_byte_cost(): u128 {
    return u128.from('10000000000000000000')
}

function bytes_for_approved_account_id(account_id: string): u64 {
    return account_id.length + 4 + 8
}

export function refund_approved_account(account_id: string): void {
    const storage_released: u128 = u128.from(
        bytes_for_approved_account_id(account_id)
    )
    ContractPromiseBatch.create(context.sender).transfer(
        u128.mul(storage_byte_cost(), storage_released)
    )
}

export function refund_approved_accounts(approvals: Map<string, number>): void {
    var storage_total: u64 = 0
    const keys = approvals.keys()
    for (let i = 0; i < keys.length; i++) {
        //for some reason map or forEach don't work
        storage_total += bytes_for_approved_account_id(keys[i])
    }
    ContractPromiseBatch.create(context.sender).transfer(
        u128.mul(storage_byte_cost(), u128.from(storage_total))
    )
}

export function refund_deposit(storage_used: u128): void {
    const required_cost: u128 = u128.mul(storage_used, storage_byte_cost())
    const attached_deposit = context.attachedDeposit
    assert(u128.ge(attached_deposit, required_cost), 'Deposit is not enough.')
    const refund: u128 = u128.sub(attached_deposit, required_cost)
    if (u128.gt(refund, u128.from(1))) {
        ContractPromiseBatch.create(context.sender).transfer(refund)
    }
}
