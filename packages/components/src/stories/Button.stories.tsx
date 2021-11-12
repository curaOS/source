import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from 'theme-ui'

export default {
    title: 'Elements/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['primary', 'secondary', 'borderless'],
            control: { type: 'select' },
        },
    },
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
    <Button {...args}>Button</Button>
)

export const Navigation = Template.bind({})
Navigation.args = {
    variant: 'navigation',
}

export const Primary = Template.bind({})
Primary.args = {
    variant: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
    variant: 'secondary',
}

export const Borderless = Template.bind({})
Borderless.args = {
    variant: 'borderless',
}
