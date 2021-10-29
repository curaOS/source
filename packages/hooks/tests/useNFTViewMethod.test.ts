import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useNFTViewMethod } from '../src/NFT/useNFTViewMethod'
import { cache } from 'swr'

describe('useNFT', () => {
    beforeEach(() => {
        cache.clear()
        cleanup()
    })
    test('should get data from blockchain without any error', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useNFTViewMethod('0.share-nft.testnet', 'nft_total_supply')
        )

        // loading true, no errors, data is undefined
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeUndefined()
        expect(result.current.data).toBeUndefined()

        await waitForNextUpdate()

        // loading complete, no errors, data is an object
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeUndefined()
        expect(result.current.data).not.toBeUndefined()
    })
})
