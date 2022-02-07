// @ts-nocheck
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { List } from '../List'

export default {
    title: 'Components/List',
    component: List,
    parameters: {
        layout: 'padded',
    },
} as ComponentMeta<typeof List>

const Template: ComponentStory<typeof List> = (args) => <List {...args} />

export const Default = Template.bind({})
Default.args = {
    data: [
        {
            title: 'Contract Address',
            content: '0.share-nft.testnet',
            link: 'https://explorer.testnet.near.org/accounts/0.share-nft.testnet',
            copiable: true,
        },
        {
            title: 'Token ID',
            content: '12446',
            link: null,
            copiable: true,
        },
        {
            title: 'Blockchain',
            content: 'NEAR',
            link: null,
            copiable: false,
        },
    ],
}
