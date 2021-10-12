const nearAPI = require('near-api-js')
const BN = require('bn.js')
const fs = require('fs').promises
const assert = require('assert').strict

function getConfig(env) {
    switch (env) {
        case 'sandbox':
        case 'local':
            return {
                networkId: 'sandbox',
                nodeUrl: 'http://localhost:3030',
                masterAccount: 'test.near',
                contractAccount: 'nft.test.near',
                keyPath: '/tmp/near-sandbox/validator_key.json',
            }
    }
}

const contractMethods = {
    viewMethods: ['nft_metadata'],
    changeMethods: ['init'],
}
let config
let masterAccount
let masterKey
let pubKey
let keyStore
let near

async function initNear() {
    config = getConfig(process.env.NEAR_ENV || 'sandbox')

    const keyFile = require(config.keyPath)

    masterKey = nearAPI.utils.KeyPair.fromString(
        keyFile.secret_key || keyFile.private_key
    )

    pubKey = masterKey.getPublicKey()

    keyStore = new nearAPI.keyStores.InMemoryKeyStore()
    keyStore.setKey(config.networkId, config.masterAccount, masterKey)
    near = await nearAPI.connect({
        deps: {
            keyStore,
        },
        networkId: config.networkId,
        nodeUrl: config.nodeUrl,
    })
    masterAccount = new nearAPI.Account(near.connection, config.masterAccount)

    console.log('Finish init NEAR')
}

async function createContractUser(
    accountPrefix,
    contractAccountId,
    contractMethods
) {
    let accountId = accountPrefix + '.' + config.masterAccount
    await masterAccount.createAccount(
        accountId,
        pubKey,
        new BN(10).pow(new BN(25))
    )
    keyStore.setKey(config.networkId, accountId, masterKey)
    const account = new nearAPI.Account(near.connection, accountId)
    const accountUseContract = new nearAPI.Contract(
        account,
        contractAccountId,
        contractMethods
    )
    return accountUseContract
}

async function initTest() {
    const contract = await fs.readFile('./build/release/NFT.wasm')
    await masterAccount.createAndDeployContract(
        config.contractAccount,
        pubKey,
        contract,
        new BN(10).pow(new BN(25))
    )

    const aliceUseContract = await createContractUser(
        'alice',
        config.contractAccount,
        contractMethods
    )

    console.log('Finish deploy contracts and create test accounts')
    return { aliceUseContract }
}

async function test() {
    await initNear()
    const { aliceUseContract } = await initTest()

    await aliceUseContract.init({
        args: {
            contract_metadata: {
                spec: 'nft-1.0.0',
                name: 'nftExample',
                symbol: 'NFTEXAMPLE',
            },
            market_contract: 'market.testnet',
        },
    })

    const example_nft_metadata = await aliceUseContract.nft_metadata({
        args: {},
    })

    assert.equal(example_nft_metadata.spec, 'nft-1.0.0')
    assert.equal(example_nft_metadata.name, 'nftExample')
    assert.equal(example_nft_metadata.symbol, 'NFTEXAMPLE')
}

test()
