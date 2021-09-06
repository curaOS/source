import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BidCreate } from './BidCreate'

export default {
    title: 'Components/Bid Create',
    component: BidCreate,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof BidCreate>

const Template: ComponentStory<typeof BidCreate> = (args) => (
    <BidCreate {...args} />
)

export const Zero = Template.bind({})
Zero.args = {}
