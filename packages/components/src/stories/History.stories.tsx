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
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: null,
            block_hash_58: "5XK7taQRUen7xXAPUsnbMWW7eEEjV4vptK4Mp1qgPySB"
        }, {
            type: "set_bid",
            timestamp: "1649199188285678087",
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: null,
            block_hash_58: "3hTEvKRs2iW12D4DMWgZGT3ZU53Y87dgNaKsaqZBrDAB"
        }, {
            type: "remove_bid",
            timestamp: "1649199188285678087",
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: null,
            block_hash_58: "5g6SqmSfEDrAJsgrGnhGhZr1bCu8LALcQxqJoFyHBmb4"
        }, {
            type: "update_bid",
            timestamp: "1649199188285678087",
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: null,
            block_hash_58: "5XK7taQRUen7xXAPUsnbMWW7eEEjV4vptK4Mp1qgPySB"
        }, {
            type: "accept_bid",
            timestamp: "1649199188285678087",
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: {id : "demo2.testnet" },
            block_hash_58: "3hTEvKRs2iW12D4DMWgZGT3ZU53Y87dgNaKsaqZBrDAB"
        },{
            type: "burn",
            timestamp: "1642599168285678017",
            sender: { id: "demo.testnet" },
            amount: null,
            recipient: null,
            block_hash_58: "5XK7taQRUen7xXAPUsnbMWW7eEEjV4vptK4Mp1qgPySB"
        }, {
            type: "transfer",
            timestamp: "1642199908285679017",
            sender: { id: "demo.testnet" },
            recipient: {id : "demo2.testnet" },
            amount: null,
            block_hash_58: "5XK7taQRUen7xXAPUsnbMWW7eEEjV4vptK4Mp1qgPySB"
        }
    ]
}
