import { VMContext } from 'near-mock-vm'
import { claim_media, nft_metadata, init } from '../index'
import { DESIGN_PRICE } from '../models'
import { NFTContractMetadata, TokenMetadata } from '../metadata'

const condo = 'condo.testnet'

const initialize = (): void => {
    const nftContractMetadata = new NFTContractMetadata(
        'nft-1.0.0',
        'Example',
        'EXAMPLE'
    )
    init(nftContractMetadata, 'market.testnet')
}

describe('- CONTRACT -', () => {
    beforeEach(() => {
        initialize()
    })

    it('xxx returns metadata', () => {
        const contractMetadata = nft_metadata()

        expect(contractMetadata.spec).toBe('nft-1.0.0')
        expect(contractMetadata.name).toBe('Example')
        expect(contractMetadata.symbol).toBe('EXAMPLE')
    })
})

describe('- MEDIA -', () => {
    beforeEach(() => {
        initialize()
    })

    it('xxx claim media', () => {
        const tokenMetadata: TokenMetadata = new TokenMetadata(
            'title_example',
            '0000000000000',
            1,
            'media_example'
        )

        VMContext.setAttached_deposit(DESIGN_PRICE)
        VMContext.setBlock_timestamp(10)
        VMContext.setSigner_account_id(condo)

        const newDesign = claim_media(tokenMetadata)

        expect(newDesign).not.toBeNull()
        expect(newDesign.royalty).not.toBeNull()
        expect(newDesign.metadata).not.toBeNull()

        expect(newDesign.metadata.title).toStrictEqual('condo')
        expect(newDesign.metadata.issued_at).toStrictEqual('10')
        expect(newDesign.metadata.copies).toStrictEqual(1)
        expect(newDesign.metadata.media).toStrictEqual('media_example')
    })
})
