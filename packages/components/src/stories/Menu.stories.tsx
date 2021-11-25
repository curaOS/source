import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Menu } from '../Menu'

export default {
    title: 'Components/Menu',
    component: Menu,
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />

export const Zero = Template.bind({})
Zero.args = {
    base: 'cc',
    accountId: 'ys24.testnet',
    nextLinkWrapper: (link, children) => <a href={link}>{children}</a>,
}
