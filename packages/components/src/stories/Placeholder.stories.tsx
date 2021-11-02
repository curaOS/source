import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Placeholder } from '../Placeholder'
import { Box } from 'theme-ui'

export default {
    title: 'Elements/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Placeholder>

const Template: ComponentStory<typeof Placeholder> = (args) => (
    <Placeholder {...args} />
)

export const Default = Template.bind({})
Default.args = {}

export const Image = Template.bind({})
Image.args = {
    width: 300,
    height: 300,
}

export const CustomStyles = Template.bind({})
CustomStyles.args = {
    width: 80,
    height: 80,
    style: {
        bg: 'primary',
        borderRadius: '100%',
    },
}

export const ParagraphTemplate: ComponentStory<typeof Box> = (args) => (
    <Box sx={{ width: 300, maxWidth: '90vw' }}>
        <Placeholder width={'80%'} />
        <Placeholder width={'40%'} />
        <Placeholder width={'60%'} />
    </Box>
)
