import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useNFT } from '../src/NFT/useNFT'
import { useNFTViewMethod } from '../src/NFT/useNFTViewMethod'

jest.mock('../src/NFT/useNFTViewMethod')

describe('useNFT', () => {
    beforeEach(() => {
        cleanup()
        jest.resetAllMocks()
    })
    it('should execute useNFTViewMethod', () => {
        renderHook(() => useNFT('0.share-nft.testnet', 'starpause-60610031'))

        expect(useNFTViewMethod).toHaveBeenLastCalledWith(
            '0.share-nft.testnet',
            'nft_token',
            {
                token_id: 'starpause-60610031',
            }
        )
    })
})
