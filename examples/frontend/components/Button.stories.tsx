import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from 'theme-ui'

export default {
    title: 'Elements/Button',
    component: Button,
    argTypes: {
        variant: {
            options: ['uno', 'due', 'orange', 'red'],
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

export const Uno = Template.bind({})
Uno.args = {
    variant: 'uno',
}

export const Due = Template.bind({})
Due.args = {
    variant: 'due',
}

export const Orange = Template.bind({})
Orange.args = {
    variant: 'orange',
}

export const Red = Template.bind({})
Red.args = {
    variant: 'red',
}
