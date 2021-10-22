import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Metadata } from '../Metadata'

export default {
title: 'Components/Metadata',
component: Metadata,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Metadata>

const Template: ComponentStory<typeof Metadata> = (args) => (
<Metadata {...args} />
)

export const Loading = Template.bind({})
Loading.args = {
    loading: true,
    title: 'dabuk',
    creator: 'beast.near',
    owner: 'doge.near',
    description:
        'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
}

export const WithDescription = Template.bind({})
WithDescription.args = {
    loading: false,
    title: 'dabuk',
    creator: 'beast.near',
    owner: 'doge.near',
    description:
        'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
}

export const WithoutDescription = Template.bind({})
WithoutDescription.args = {
    loading: false,
    title: 'dabuk',
    creator: 'beast.near',
    owner: 'doge.near',
    description: '',
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
    loading: false,
    width: 500,
    title: 'dabuk',
    creator: 'beast.near',
    owner: 'doge.near',
    description:
        'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
}
