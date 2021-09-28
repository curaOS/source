import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProjectCard } from '../ProjectCard'

export default {
    title: 'Components/Project Card',
    component: ProjectCard,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof ProjectCard>

const Template: ComponentStory<typeof ProjectCard> = (args) => (
    <ProjectCard {...args} />
)

export const Zero = Template.bind({})
Zero.args = {
    share: '5000',
    title: 'ML/1W',
    image: 'https://arweave.net/1UDe0Wqh51-O03efPzoc_HhsUPrmgBR2ziUfaI7CpZk',
    description: 'A series of generated watches.',
    tags: ['generative', 'ML'],
}
