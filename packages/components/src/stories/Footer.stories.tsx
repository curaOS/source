import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Footer } from '../Footer'

export default {
    title: 'Components/Footer',
    component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Zero = Template.bind({})
Zero.args = {
    title: 'dabuk',
    creator: 'beast.near',
}
