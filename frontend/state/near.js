import getConfig from '../config';
import * as nearAPI from 'near-api-js';
import { getWallet } from '../utils/near-utils';

export const {
	networkId, nodeUrl, walletUrl, nameSuffix,
	contractName,
} = getConfig();

export const {
	utils: {
		format: {
			formatNearAmount, parseNearAmount
		}
	}
} = nearAPI;

export const initNear = () => async ({ update, getState, dispatch }) => {
	const { near, wallet } = await getWallet();

	wallet.signIn = () => {
		wallet.requestSignIn(contractName, 'Mojio', window.location.origin, window.location.origin);
	};
	const signOut = wallet.signOut;
	wallet.signOut = () => {
		signOut.call(wallet);
		update('wallet.signedIn', false);

		//TODO use wallet.signedIn in the components instea
		window.location.replace(window.location.origin)
	};

	wallet.signedIn = wallet.isSignedIn();
    
	let account;
	if (wallet.signedIn) {
		account = wallet.account();
		wallet.balance = formatNearAmount((await wallet.account().getAccountBalance()).available, 2);
		await update('', { near, wallet, account });
	}

	await update('', { near, wallet, account });
};
