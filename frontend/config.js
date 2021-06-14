const contractName = process.env.SHARE_ADDRESS

module.exports = function getConfig(isServer = false) {
    let config = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        contractName,
        contractMethods: {
            changeMethods: [
                'set_bid',
                'remove_bid',
                'accept_bid',
                'design',
                'claim_media',
                'burn_design',
                'view_media',
                'nft_tokens',
            ],
            viewMethods: ['nft_total_supply'],
        },
    }

    return config
}
