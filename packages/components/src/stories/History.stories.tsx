import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { History } from "../History";

export default {
    title: 'Components/History',
    component: History,
    parameters: {
        layout: 'padded',
    },
} as ComponentMeta<typeof History>

const Template: ComponentStory<typeof History> = (args) => (
    <History {...args} />
)

export const Zero = Template.bind({})
Zero.args = {}

export const Tre = Template.bind({})
Tre.args = {
    history: [
        {
            type: "mint",
            timestamp: "1641199188285678087",
            mintBy: "demo.testnet",
            burnBy: null,
            transferFrom: null,
            transferTo: null,
            transactionHash: "aayyx44578ggnkk98989787fbjby8"
        }, {
            type: "burn",
            timestamp: "1642599168285678017",
            mintBy: null,
            burnBy: "demo.testnet",
            transferFrom: null,
            transferTo: null,
            transactionHash: "aayyx44578gg4666h583vvnkk98989787fbjby8"
        }, {
            type: "transfer",
            timestamp: "1642199908285679017",
            mintBy: null,
            burnBy: null,
            transferFrom: "demo.testnet",
            transferTo: "demo2.testnet",
            transactionHash: "aadddJhjdB7889HUu?78dvfn89787fbjby8"
        }
    ]
}
