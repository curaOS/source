import { u128, ContractPromise } from 'near-sdk-as'

const XCC_FT_MINE_TO_GAS = 25000000000000
// const ONE_FT = u128.from('1000000000000000000000000')

/* XCC ft_mine_to */

@nearBindgen
class FTMineToArgs {
    account_id: string
    amount: u128
}

export function xcc_ft_mine_to_and_transfer(
    contract: string,
    account_id: string,
    amount: u128,
    near_amount_to_deposit: u128 = u128.Zero
): void {
    const remoteMethod = 'ft_mine_to'

    let remoteMethodArgs: FTMineToArgs = {
        account_id: account_id,
        amount: amount,
    }

    const promise = ContractPromise.create(
        contract,
        remoteMethod,
        remoteMethodArgs,
        XCC_FT_MINE_TO_GAS,
        near_amount_to_deposit
    )

    promise.returnAsResult()
}
