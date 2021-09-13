import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from '../Header'

export default {
    title: 'Components/Header',
    component: Header,
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

export const Connected = Template.bind({})
Connected.args = {
    title: 'SHARE',
    accountId: 'yassine.testnet',
}

export const Disconnected = Template.bind({})
Disconnected.args = {
    title: 'SHARE',
}
