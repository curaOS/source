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
    mediaURI: `
    I wake at a creek
    drop like a beggar and drink
    from the small cold stream
    
    
    A star crashes near
    and a devil emerges 
    smoldering, laughing 
    
    I point at the sun
    and the ghoul’s face splits in half
    and screams out madly 
    
    I rise and fall back
    as it overtakes me there,
    I'm laughing now too 👀`,
    type: 'text',
}

export const Video = Template.bind({})
Video.args = {
    mediaURI:
        'https://d2iccaf7eutw5f.cloudfront.net/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/2410/large',
    type: 'video',
    width: 300,
    height: 200,
    autoPlay: true,
}

export const Audio = Template.bind({})
Audio.args = {
    mediaURI:
        'https://d2iccaf7eutw5f.cloudfront.net/0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7/5628/large',
    type: 'audio',
}

export const Image = Template.bind({})
Image.args = {
    mediaURI: 'https://arweave.net/Ds1ggD5l_oDz0k-8jl4yDTaOWDSl9h6G0eq4zIfkf1U',
    type: 'image',
    width: 300,
}

export const Other = Template.bind({})
Other.args = {
    mediaURI: 'https://arweave.net/HVFUSMb6D9tUXrYpqsR0mtopiufAkWAueNSqXTRoLyg',
    width: 300,
}
