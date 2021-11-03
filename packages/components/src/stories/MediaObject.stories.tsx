import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { MediaObject } from '../MediaObject'

export default {
    title: 'Components/MediaObject',
    component: MediaObject,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof MediaObject>

const Template: ComponentStory<typeof MediaObject> = (args) => (
    <MediaObject {...args} />
)

export const Text = Template.bind({})
Text.args = {
    mediaURI:
        'https://zora-prod.mypinata.cloud/ipfs/bafybeiaevcepa5gwys3ylxtrooxfvv7k2gkxj4kllrid6bofzjdtqrncyi',
}

export const Video = Template.bind({})
Video.args = {
    mediaURI:
        'https://d2iccaf7eutw5f.cloudfront.net/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/2410/large',
    width: 300,
    height: 200,
    autoPlay: true,
}

export const Audio = Template.bind({})
Audio.args = {
    mediaURI:
        'https://d2iccaf7eutw5f.cloudfront.net/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5628/large',
}

export const Image = Template.bind({})
Image.args = {
    mediaURI: 'https://arweave.net/Ds1ggD5l_oDz0k-8jl4yDTaOWDSl9h6G0eq4zIfkf1U',
    width: 300,
}

export const Other = Template.bind({})
Other.args = {
    mediaURI: 'https://arweave.net/HVFUSMb6D9tUXrYpqsR0mtopiufAkWAueNSqXTRoLyg',
    width: 300,
}
