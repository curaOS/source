import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import { renderHook } from '@testing-library/react-hooks'
import { useNFTContentType } from '../src/NFT/useNFTContentType'
import { cache } from 'swr'

describe('useNFTContentType', () => {
    beforeEach(() => {
        cache.clear()
    })
    test('should return contentType from a URI', async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            useNFTContentType(
                'https://arweave.net/mKrJ5JvuMQwKPoxKVYN-q8kMwuF6YnWDEsR2L7G0u-Q'
            )
        )

        // loading true, no errors, data is undefined
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeUndefined()
        expect(result.current.data).toBeUndefined()

        await waitForNextUpdate()

        // loading complete, no errors, data should be string
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeUndefined()
        expect(typeof result.current.data).toEqual('string')
    })
})
