import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Bidders from './Bidders'

export default {
    title: 'Components/Bidders',
    component: Bidders,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Bidders>

const Template: ComponentStory<typeof Bidders> = (args) => <Bidders {...args} />

export const Zero = Template.bind({})
Zero.args = {}

export const Tre = Template.bind({})
Tre.args = {
    bidders: {
        'frank.testnet': {
            amount: '3300000000000000000000000',
            bidder: 'prova.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 2000,
        },
        'kanye.testnet': {
            amount: '93800000000000000000000000',
            bidder: 'prova.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 200,
        },
        'tyler.testnet': {
            amount: '52300000000000000000000000',
            bidder: 'tyler.testnet',
            recipient: 'ysn.testnet',
            sell_on_share: 0,
        },
    },
}
