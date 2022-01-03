import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Header } from '../Header'

export default {
    title: 'Components/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        isInitial: {
            table: {
                disable: true
            }
        }
    }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />

const logo =
    'https://raw.githubusercontent.com/curaOS/source/master/.gitbook/assets/cura.png'

export const Connected = Template.bind({})
Connected.args = {
    title: 'CC/ML',
    logo: logo,
    accountId: 'yassine.testnet',
    nextLinkWrapper: (link, children) => <a href={link}>{children}</a>,
}

export const Disconnected = Template.bind({})
Disconnected.args = {
    title: 'SHARE',
    logo: logo,
    nextLinkWrapper: (link, children) => <a href={link}>{children}</a>,
}

export const Initial = Template.bind({})
Initial.args = {
    isInitial: true,
    logo: logo,
    nextLinkWrapper: (link, children) => <a href={link}>{children}</a>,
}
Initial.parameters = { controls : {include : ['logo'] }}
