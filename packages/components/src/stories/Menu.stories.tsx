// @ts-nocheck
import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Menu } from '../Menu'

export default {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => {
    return (
        <div style={{ height: '100vh' }}>
            <Menu {...args} />
        </div>
    )
}

export const Connected = Template.bind({})
Connected.args = {
    base: 'cc',
    isDisconnected: false,
    nextLinkWrapper: (link, children) => <a href={link}>{children}</a>,
}

export const Disconnected = Template.bind({})
Disconnected.args = {
    isDisconnected: true,
    base: 'cc',
}
