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

export const Zero = Template.bind({})
Zero.args = {
    title: 'dabuk',
    creator: 'beast.near',
}
