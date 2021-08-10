import { u128, ContractPromise, storage } from 'near-sdk-as'
import { GENERATOR_CONTRACT_KEY } from '.'

const XCC_GENERATOR_GENERATE_GAS = 25000000000000

/**
 * market.set_bid_shares
 */

@nearBindgen
export class GeneratorGenerateArgs {}

export function xcc_generator_generate(): void {
    const generatorContract = storage.getSome<string>(GENERATOR_CONTRACT_KEY)
    const remoteMethod = 'generate'

    let remoteMethodArgs: GeneratorGenerateArgs = {}

    const promise = ContractPromise.create(
        generatorContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_GENERATOR_GENERATE_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}
