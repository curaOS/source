import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button, IconButton } from 'theme-ui'

export default {
    title: 'Elements/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['navigation', 'primary', 'outline', 'borderless'],
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
const IconTemplate: ComponentStory<typeof Button> = () => (
    <IconButton>
        <svg
            width="26"
            height="26"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.915918 7.68227L0.89209 8.67954L15.1238 9.01958C13.1079 10.7384 9.43566 13.9144 7.1219 15.9171L7.72732 16.68L17.0051 8.5864L17.0066 8.52407L8.12197 0.162842L7.48131 0.875119C9.65671 2.92276 13.2542 6.3556 15.1477 8.02232L0.915918 7.68227Z"
                fill="#101010"
            />
        </svg>
    </IconButton>
)

export const Primary = Template.bind({})
Primary.args = {
    variant: 'primary',
}

export const Outline = Template.bind({})
Outline.args = {
    variant: 'outline',
}

export const Borderless = Template.bind({})
Borderless.args = {
    variant: 'borderless',
}

export const Navigation = Template.bind({})
Navigation.args = {
    variant: 'navigation',
}

export const Icon = IconTemplate.bind({})
