const pjson = require('./package.json')

// When package version is updated, contract are deployed to new addresses
const version = pjson.version.replaceAll('.', '_')

exports.YSN_ADDRESS = `ysn-${version}.ysn.testnet`
exports.SHARE_ADDRESS = `share.ysn-${version}.ysn.testnet`
exports.SHARE_MARKET_ADDRESS = `market.share.ysn-${version}.ysn.testnet`
