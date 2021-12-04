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
    data: {
        creator_id: 'beast.near',
        owner_id: 'doge.near',
        metadata: {
            title: 'dabuk',
            description:
                'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
        },
    },
}

export const WithDescription = Template.bind({})
WithDescription.args = {
    loading: false,
    data: {
        creator_id: 'beast.near',
        owner_id: 'doge.near',
        metadata: {
            title: 'dabuk',
            description:
                'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
        },
    },
}

export const WithoutDescription = Template.bind({})
WithoutDescription.args = {
    loading: false,
    data: {
        creator_id: 'beast.near',
        owner_id: 'doge.near',
        metadata: {
            title: 'dabuk',
            description: '',
        },
    },
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
    loading: false,
    width: 500,
    data: {
        creator_id: 'beast.near',
        owner_id: 'doge.near',
        metadata: {
            title: 'dabuk',
            description:
                'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
        },
    },
}

export const SecondVariant = Template.bind({})
SecondVariant.args = {
    variant: 1,
    loading: false,
    data: {
        creator_id: 'beast.near',
        owner_id: 'doge.near',
        metadata: {
            title: 'dabuk',
            description:
                'Digital ceramic sculpted in VR and glazed procedurally David Porte Beckefeld® 2021',
        },
    },
}
