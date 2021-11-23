import { context, u128 } from 'near-sdk-as'

export function assert_deposit_attached(amount: u128): void {
    assert(u128.eq(context.attachedDeposit, amount), 'Deposit is one NEAR.')
}

export function assert_one_yocto(): void {
<<<<<<< HEAD
    assert(
        u128.eq(context.attachedDeposit, u128.from('1')),
        'Deposit is one yoctoNEAR.'
    )
}

export function assert_at_least_one_yocto(): void {
    assert(
        u128.ge(context.attachedDeposit, u128.from('1')),
        'Deposit is at least one yoctoNEAR.'
    )
}
=======
    assert(u128.eq(context.attachedDeposit, u128.from('1')), 'Deposit is one yoctoNEAR.')
}
>>>>>>> 53bff5d12d1005d0ac07d21adbb931ea076ffc7b
