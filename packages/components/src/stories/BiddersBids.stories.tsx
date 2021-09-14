import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { BiddersBids } from '../BiddersBids'

export default {
    title: 'Components/Bidders Bids',
    component: BiddersBids,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof BiddersBids>

const Template: ComponentStory<typeof BiddersBids> = (args) => (
    <BiddersBids {...args} />
)

export const Zero = Template.bind({})
Zero.args = {}

export const Tre = Template.bind({})
Tre.args = {
    biddersBids: {
        'aprt.1': {
            amount: '3300000000000000000000000',
            bidder: 'prova.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 2000,
            currency: 'near',
        },
        'aprt.2': {
            amount: '93800000000000000000000000',
            bidder: 'prova.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 200,
            currency: 'near',
        },
        'aprts.3': {
            amount: '52300000000000000000000000',
            bidder: 'tyler.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 0,
            currency: 'near',
        },
    },
}
