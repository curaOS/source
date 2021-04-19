const contractName = 'ncd.ys24.testnet';

module.exports = function getConfig(isServer = false) {
	let config = {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org',
		contractName,
    contractMethods: {
      changeMethods: ['design', 'claimMyDesign', 'burnMyDesign', 'viewMyDesign', 'viewRandomDesign'],
      viewMethods: [''],
    }
	};

	return config;
};
