import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { NFTE } from '../NFTE'

export default {
    title: 'Components/NFTE',
    component: NFTE,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof NFTE>

const Template: ComponentStory<typeof NFTE> = (args) => (
    <NFTE {...args} />
)

export const Light = Template.bind({})
Light.args = {
    contract: '0.share-nft.testnet',
    tokenId: 'sekaiking-67849861',
    isDark: false,
}


export const Dark = Template.bind({})
Dark.args = {
    contract: '0.share-nft.testnet',
    tokenId: 'afaithraf-68324557',
    isDark: true,
}

export const Ml1c = Template.bind({})

Ml1c.args = {
    contract: 'ml1c.ysn-1_0_0.ysn.testnet',
    tokenId: 'ysn-63057373',
    isDark: false,
}

export const Ml1w = Template.bind({})

Ml1w.args = {
    contract: 'ml1w.ysn-1_0_0.ysn.testnet',
    tokenId: 'ghostfrnvpr-62641894',
    isDark: false,
}

export const Aprts = Template.bind({})

Aprts.args = {
    contract: 'apparitions.art-blocks.testnet',
    tokenId: 'ysn-58907469',
    isDark: false,
}

export const Sqgl = Template.bind({})

Sqgl.args = {
    contract: 'squiggle.art-blocks.testnet',
    tokenId: 'ysn-62113954',
    isDark: false,
}

