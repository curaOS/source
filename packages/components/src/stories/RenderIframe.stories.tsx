import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { RenderIframe } from '../RenderIframe'

export default {
    title: 'Components/Render IFrame',
    component: RenderIframe,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof RenderIframe>

const Template: ComponentStory<typeof RenderIframe> = (args) => (
    <RenderIframe {...args} />
)

export const Zero = Template.bind({})
Zero.args = {
    mediaURI: 'https://arweave.net/H-vPK6GnA5OMZnqpqtirShJT_ELcgPIDShnOr1Z6jmo',
    width: 750,
}

export const Uno = Template.bind({})
Uno.args = {
    mediaURI: 'https://arweave.net/HVFUSMb6D9tUXrYpqsR0mtopiufAkWAueNSqXTRoLyg',
    width: 750,
}

export const Due = Template.bind({})
Due.args = {
    mediaURI: 'https://arweave.net/LLRlwDUilAxxq4_ZpUkNmolw78UUwTJ2CPJj12jE5As',
    width: 750,
}
