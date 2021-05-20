const contractName = 'v1.share.ysn.testnet';

module.exports = function getConfig(isServer = false) {
	let config = {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org',
		contractName,
    contractMethods: {
      changeMethods: ['design', 'claimMyDesign', 'burnMyDesign', 'viewMyDesign', 'nft_tokens'],
      viewMethods: ['nft_total_supply'],
    }
	};

	return config;
};
