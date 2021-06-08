import { storage, u128, ContractPromiseBatch, env } from 'near-sdk-as'
import {
    AccountId,
    CurrencyId,
    bid_shares,
    token_bidders,
    BidShares,
    Bid,
    Bids,
} from './models'
import { xcc_media_nft_transfer } from './xcc_media'
import { split_share, ONE_HUNDRED_PERCENT } from '../../utils'

/** Get functions */

export function get_bids(token_id: string): Bids {
    let bidders = token_bidders.get(token_id)

    if (!bidders) {
        bidders = new Map()
    }

    return bidders
}

/** Set functions */

export function set_bid_shares(
    token_id: string,
    prev_owner: u16,
    creator: u16,
    owner: u16
): void {
    const new_bid_shares = new BidShares(prev_owner, creator, owner)
    bid_shares.set(token_id, new_bid_shares)
}

export function set_bid(
    token_id: string,
    amount: u128,
    bidder: AccountId,
    recipient: AccountId,
    sell_on_share: u16,
    currency: CurrencyId = 'near'
): void {
    let bidders = token_bidders.get(token_id)

    if (!bidders) {
        bidders = new Map()
    }

    const new_bid = new Bid(amount, bidder, recipient, sell_on_share, currency)

    bidders.set(bidder, new_bid)

    token_bidders.set(token_id, bidders)
}

export function remove_bid(token_id: string, bidder: AccountId): void {
    let bidders = token_bidders.get(token_id)

    if (!bidders || !bidders.has(bidder)) {
        return
    }

    let bid = bidders.get(bidder)

    const promise = ContractPromiseBatch.create(bidder)
    promise.transfer(bid.amount)

    env.promise_return(promise.id)

    bidders.delete(bidder)

    token_bidders.set(token_id, bidders)
}

export function accept_bid(
    token_id: string,
    bidder: AccountId,
    creator: string,
    owner: string,
    prev_owner: string
): void {
    let bidders = token_bidders.get(token_id)
    let bidShares = bid_shares.get(token_id)

    if (!bidders || !bidders.has(bidder) || !bidShares) {
        return
    }

    let bid = bidders.get(bidder)

    const promiseCreator = ContractPromiseBatch.create(creator)
    promiseCreator.transfer(split_share(bidShares.creator, bid.amount))

    const promiseOwner = ContractPromiseBatch.create(owner)
    promiseOwner.transfer(split_share(bidShares.owner, bid.amount))

    const promisePrevOwner = ContractPromiseBatch.create(prev_owner)
    promisePrevOwner.transfer(split_share(bidShares.prev_owner, bid.amount))

    env.promise_return(promiseCreator.id)
    env.promise_return(promiseOwner.id)
    env.promise_return(promisePrevOwner.id)

    bidShares.owner =
        ONE_HUNDRED_PERCENT - bid.sell_on_share - bidShares.creator
    bidShares.prev_owner = bid.sell_on_share
    bid_shares.set(token_id, bidShares)

    /** TODO call NFT_TRANSFER */
    xcc_media_nft_transfer(token_id, bid.bidder)

    bidders.delete(bidder)
    token_bidders.set(token_id, bidders)
}

/**
 * Init
 */

// The media contract that can call this market
export const MEDIA_CONTRACT_KEY = 'media_contract'

export function init(media_contract: AccountId): void {
    assert(storage.get<string>('init') == null, 'Already initialized')

    storage.set(MEDIA_CONTRACT_KEY, media_contract)

    storage.set('init', 'done')
}
