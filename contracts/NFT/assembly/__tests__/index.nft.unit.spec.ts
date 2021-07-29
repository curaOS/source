import { nft_metadata } from '../index'

describe('- CONTRACT -', () => {
    it('xxx returns metadata', () => {
        const contractMetadata = nft_metadata()

        expect(contractMetadata.spec).toBe('nft-1.0.0')
        expect(contractMetadata.name).toBe('Nft')
        expect(contractMetadata.symbol).toBe('NFT')
    })
})
