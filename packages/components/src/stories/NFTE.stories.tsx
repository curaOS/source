import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { NFTE } from '../NFTE'

export default {
    title: 'Components/NFTE',
    component: NFTE,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof NFTE>

const Template: ComponentStory<typeof NFTE> = (args) => <NFTE {...args} />

// Hooks that are used currently only support one Network at time

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
}

export const Ml1w = Template.bind({})

Ml1w.args = {
    contract: 'ml1w.ysn-1_0_0.ysn.testnet',
    tokenId: 'ghostfrnvpr-62641894',
}

export const Aprts = Template.bind({})

Aprts.args = {
    contract: 'apparitions.art-blocks.testnet',
    tokenId: 'ysn-58907469',
}

export const Sqgl = Template.bind({})

Sqgl.args = {
    contract: 'squiggle.art-blocks.testnet',
    tokenId: 'ysn-62113954',
}

export const Parasid = Template.bind({})

Parasid.args = {
    contract: 'x.paras.near',
    tokenId: '10002:1',
}

export const Mintbase = Template.bind({})

Mintbase.args = {
    contract: 'hellovirtualworld.mintbase1.near',
    tokenId: '2',
}
