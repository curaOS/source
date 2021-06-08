import { ContractPromise, u128 } from 'near-sdk-as'
import { SHARE_ADDRESS } from '../../accounts'

const XCC_MEDIA_NFT_TRANSFER_GAS = 25000000000000

const MEDIA_CONTRACT = SHARE_ADDRESS

/**
 * media.nft_transfer
 */

@nearBindgen
export class MediaNftTransferArgs {
    token_id: string
    bidder: string
}

export function xcc_media_nft_transfer(token_id: string, bidder: string): void {
    const remoteMethod = 'nft_transfer'

    let remoteMethodArgs: MediaNftTransferArgs = {
        token_id: token_id,
        bidder: bidder,
    }

    const promise = ContractPromise.create(
        MEDIA_CONTRACT,
        remoteMethod,
        remoteMethodArgs,
        XCC_MEDIA_NFT_TRANSFER_GAS,
        u128.Zero
    )

    promise.returnAsResult()
}
