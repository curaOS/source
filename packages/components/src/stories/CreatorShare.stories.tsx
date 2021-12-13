import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreatorShare } from '../CreatorShare'

export default {
    title: 'Components/Creator Share',
    component: CreatorShare,
    parameters: {
        layout: 'padded',
    },
} as ComponentMeta<typeof CreatorShare>

const Template: ComponentStory<typeof CreatorShare> = (args) => (
    <CreatorShare {...args} />
)

export const Zero = Template.bind({})
Zero.args = {
    address: 'yassine.near',
    share: '5000',
}
