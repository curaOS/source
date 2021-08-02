import {
    context,
    PersistentSet,
    PersistentUnorderedMap,
    u128,
} from 'near-sdk-as'
import { YSN_ADDRESS } from '../../accounts'
import { TokenMetadata } from './metadata'
import { Royalty } from './royalties'

type AccountId = string
type MediaId = string

const ONE_NEAR = u128.from('1000000000000000000000000')

export const DESIGN_PRICE = ONE_NEAR
export const ROYALTY_MAX_PERCENTAGE: u32 = 5000 // 50%
export const FT_CONTRACT: string = YSN_ADDRESS
const ROYALTY_ADDRESS: string = YSN_ADDRESS // social token

@nearBindgen
export class Media {
    id: string
    owner_id: string
    creator: string
    prev_owner: string
    metadata: TokenMetadata
    royalty: Royalty
    constructor(media: string) {
        this.owner_id = context.sender
        this.prev_owner = context.sender
        this.creator = ROYALTY_ADDRESS

        this.royalty = new Royalty()

        const title = context.sender.substring(
            0,
            context.sender.lastIndexOf('.')
        )

        this.id = title + '-' + context.blockIndex.toString()

        const issued_at = context.blockTimestamp.toString()
        const copies: u8 = 1

        this.metadata = new TokenMetadata(title, issued_at, copies, media)
    }
}

@nearBindgen
export class TemporaryMedia {
    constructor(public instructions: string, public seed: i32) {}
}

export const designs = new PersistentUnorderedMap<AccountId, Media>('md')
export const owners = new PersistentSet<AccountId>('onrs')

export const account_media = new PersistentUnorderedMap<
    AccountId,
    PersistentSet<MediaId>
>('acmd')
