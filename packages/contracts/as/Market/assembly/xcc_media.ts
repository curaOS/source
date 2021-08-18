import { ContractPromise, storage, u128 } from 'near-sdk-as'
import { MEDIA_CONTRACT_KEY } from '.'

const XCC_MEDIA_NFT_TRANSFER_GAS = 125000000000000

/**
 * media.nft_transfer
 */

@nearBindgen
export class MediaNftTransferArgs {
    token_id: string
    bidder: string
}

export function xcc_media_nft_transfer(token_id: string, bidder: string): void {
    const mediaContract = storage.getSome<string>(MEDIA_CONTRACT_KEY)
    const remoteMethod = 'nft_transfer'

    let remoteMethodArgs: MediaNftTransferArgs = {
        token_id: token_id,
        bidder: bidder,
    }

    const promise = ContractPromise.create(
        mediaContract,
        remoteMethod,
        remoteMethodArgs,
        XCC_MEDIA_NFT_TRANSFER_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}
