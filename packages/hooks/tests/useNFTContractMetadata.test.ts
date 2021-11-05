import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useNFTContractMetadata } from '../src/NFT/useNFTContractMetadata'
import { useNFTViewMethod } from '../src/NFT/useNFTViewMethod'

jest.mock('../src/NFT/useNFTViewMethod')

describe('useNFTContractMetadata', () => {
    beforeEach(() => {
        cleanup()
        jest.resetAllMocks()
    })
    it('should execute useNFTViewMethod', () => {
        renderHook(() => useNFTContractMetadata('0.share-nft.testnet'))

        expect(useNFTViewMethod).toHaveBeenLastCalledWith(
            '0.share-nft.testnet',
            'nft_metadata',
            {}
        )
    })
})
