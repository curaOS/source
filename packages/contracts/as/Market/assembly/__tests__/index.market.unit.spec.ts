import { storage, u128 } from 'near-sdk-as'
import { VMContext, VM } from 'near-mock-vm'
import { init, MEDIA_CONTRACT_KEY } from '../index'

const condo = 'condo'

describe('- CONTRACT -', () => {
    beforeEach(() => {
        VMContext.setSigner_account_id(condo)
    })

    it('xxx inits', () => {
        init('media.contract')

        expect(storage.get<string>(MEDIA_CONTRACT_KEY)).toBe('media.contract')
    })
})
