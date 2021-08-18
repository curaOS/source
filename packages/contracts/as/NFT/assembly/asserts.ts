import { context, u128 } from 'near-sdk-as'

export function assert_deposit_attached(amount: u128): void {
    assert(u128.eq(context.attachedDeposit, amount), 'Deposit is one NEAR.')
}
