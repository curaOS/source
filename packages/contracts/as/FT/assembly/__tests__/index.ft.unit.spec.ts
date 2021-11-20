import { storage, u128 } from 'near-sdk-as'
import { VMContext } from 'near-mock-vm'
import {
    ft_balance_of,
    ft_metadata,
    ft_mine_to,
    ft_total_supply,
    init,
    SUPPLY_KEY,
} from '../index'
import { FTContractMetadata } from '../model'
import { SHARE_ADDRESS } from '../../../accounts'

const whitelistedAddress = SHARE_ADDRESS

import { toYocto } from '../../../utils'

const condo = 'condo'
const keith = 'keith'

const ZERO_NEAR: u128 = u128.Zero

const initialize = (): void => {
    const ftContractMetadata = new FTContractMetadata(
        'ft-1.0.0',
        'ftExample',
        'FTEXAMPLE'
    )
    init(ftContractMetadata, ZERO_NEAR, ZERO_NEAR)
}

describe('- CONTRACT -', () => {
    beforeEach(() => {
        initialize()
        VMContext.setSigner_account_id(condo)
    })

    it('xxx returns metadata', () => {
        const contractMetadata = ft_metadata()

        expect(contractMetadata.spec).toBe('ft-1.0.0')
        expect(contractMetadata.name).toBe('ftExample')
        expect(contractMetadata.symbol).toBe('FTEXAMPLE')
    })

    it('xxx returns zero supply', () => {
        expect(ft_total_supply()).toBe('0')
    })

    it('xxx inits', () => {
        expect(storage.hasKey(SUPPLY_KEY)).toBe(true)
    })
})

describe('- HODLER -', () => {
    beforeEach(() => {
        initialize()
        VMContext.setSigner_account_id(condo)
    })

    it('xxx returns zero balance', () => {
        const balance = ft_balance_of(keith)

        expect(balance).toBe('0')
    })

    it('xxx throws if not whitelisted precedessor', () => {
        expect(() => {
            ft_mine_to(keith, toYocto(1))
        }).toThrow('Caller not whitelisted')
    })

    it('xxx mines to account', () => {
        VMContext.setPredecessor_account_id(whitelistedAddress)

        ft_mine_to(keith, toYocto(1))

        const newBalance = ft_balance_of(keith)

        expect(newBalance).toBe(toYocto(1).toString())
    })
})
