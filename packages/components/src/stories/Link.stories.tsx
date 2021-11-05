import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { Link } from '../Link'

export default {
  title: 'Components/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => (
  <Link {...args}>
    <p>Test</p>
  </Link>
)

export const Connected = Template.bind({})
Connected.args = {
  href: "https://www.youtube.com"
}

export const Disconnected = Template.bind({})
Disconnected.args = {
  href: "/local",
}
