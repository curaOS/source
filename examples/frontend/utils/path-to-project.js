export const mapPathToProject = (path) => {
    switch (true) {
        case path.startsWith('/ml/1c'):
            return 'ml1c.ysn-1_0_0.ysn.testnet'
        case path.startsWith('/ml/1w'):
            return 'ml1w.ysn-1_0_0.ysn.testnet'
        case path.startsWith('/share'):
            return '0.share-nft.testnet'
        case path.startsWith('/cc/aprts'):
            return 'apparitions.art-blocks.testnet'
        case path.startsWith('/cc/sqgl'):
            return 'squiggle.art-blocks.testnet'
    }
}
