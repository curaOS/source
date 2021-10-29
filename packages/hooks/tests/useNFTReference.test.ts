import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()
import { renderHook } from '@testing-library/react-hooks'
import { useNFTReference } from '../src/NFT/useNFTReference'
import { cache } from 'swr'
import type { FetchMock } from 'jest-fetch-mock'
const fetchMock = fetch as FetchMock

describe('useNFTReference', () => {
    beforeEach(() => {
        cache.clear()
    })
    test('should return a Json from a URI', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: '123' }))

        const { result, waitForNextUpdate } = renderHook(() =>
            useNFTReference(
                'https://arweave.net/K7oV4o3By4_TV5ItTnmENBR3HS4wrpGZlcDpJYPEpeY'
            )
        )

        // loading true, no errors, data is undefined
        expect(result.current.loading).toBe(true)
        expect(result.current.error).toBeUndefined()
        expect(result.current.data).toBeUndefined()

        await waitForNextUpdate()

        // loading complete, no errors, data should be object
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBeUndefined()
        expect(typeof result.current.data).toEqual('object')
    })
})
