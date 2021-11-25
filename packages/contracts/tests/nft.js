const nearAPI = require('near-api-js')
const BN = require('bn.js')
const fs = require('fs').promises
const assert = require('assert').strict

const CONTRACT_CLAIM_GAS = nearAPI.utils.format.parseNearAmount('0.00000000029') // 300 Tgas
const CONTRACT_CLAIM_PRICE = nearAPI.utils.format.parseNearAmount('1') // 1N
const NUMBER_OF_NFT = 5

function getConfig(env) {
    switch (env) {
        case 'sandbox':
        case 'local':
            return {
                networkId: 'sandbox',
                nodeUrl: 'http://localhost:3030',
                masterAccount: 'test.near',
                marketAccount: 'market.test.near',
                contractAccount: 'nft.test.near',
                keyPath: '/tmp/near-sandbox/validator_key.json',
            }
    }
}

const contractMethods = {
    viewMethods: [
        'nft_total_supply',
        'nft_metadata',
        'nft_token',
        'nft_payout',
        'nft_tokens_for_owner',
        'nft_is_approved',
    ],
    changeMethods: [
        'init',
        'claim_media',
        'nft_approve',
        'nft_revoke',
        'nft_revoke_all',
    ],
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
        new BN(10).pow(new BN(27))
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
        new BN(10).pow(new BN(27))
    )

    const contractM = await fs.readFile('./build/release/Market.wasm')
    await masterAccount.createAndDeployContract(
        config.marketAccount,
        pubKey,
        contractM,
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
            market_contract: 'market.test.near',
        },
    })
    const example_nft_metadata = await aliceUseContract.nft_metadata({
        args: {},
    })

    // creating sample NFTs
    for (var i = 0; i < NUMBER_OF_NFT; i++) {
        console.log('Creating NFT: ' + (i + 1) + '/' + NUMBER_OF_NFT)
        await aliceUseContract.claim_media({
            args: { tokenMetadata: { media: 'NFT-' + i } },
            gas: CONTRACT_CLAIM_GAS,
            amount: CONTRACT_CLAIM_PRICE,
        })
    }

    console.log('Finish create sample NFTs')

    const total_supply = await aliceUseContract.nft_total_supply({
        args: {},
    })
    const token_owners = await aliceUseContract.nft_tokens_for_owner({
        account_id: 'alice.test.near',
    })

    const media = await aliceUseContract.claim_media({
        args: { tokenMetadata: { media: 'abc' } },
        gas: CONTRACT_CLAIM_GAS,
        amount: CONTRACT_CLAIM_PRICE,
    })

    // royalty

    const media_payout = await aliceUseContract.nft_payout({
        token_id: media.id,
        balance: nearAPI.utils.format.parseNearAmount('1'),
    })

    console.log('Media Payout: ', media_payout)

    // approval tests

    const before_approve = await aliceUseContract.nft_is_approved({
        token_id: media.id,
        approved_account_id: 'market.test.near',
    })

    await aliceUseContract.nft_approve({
        args: { token_id: media.id, account_id: 'market.test.near' },
        gas: CONTRACT_CLAIM_GAS,
        amount: CONTRACT_CLAIM_PRICE,
    })

    const before_revoke = await aliceUseContract.nft_is_approved({
        token_id: media.id,
        approved_account_id: 'market.test.near',
    })

    const media_with_approval = await aliceUseContract.nft_token({
        token_id: media.id,
    })

    console.log('Media approvals:', media_with_approval.approvals)
    console.log('Media next approval: ', media_with_approval.next_approval_id)

    await aliceUseContract.nft_revoke_all({
        args: { token_id: media.id },
        gas: CONTRACT_CLAIM_GAS,
        amount: 1,
    })
    const after_revoke = await aliceUseContract.nft_is_approved({
        token_id: media.id,
        approved_account_id: 'market.test.near',
    })

    console.log('Finish approval tests')

    assert.equal(parseInt(total_supply), NUMBER_OF_NFT)
    assert.equal(token_owners.length, NUMBER_OF_NFT)
    assert.equal(example_nft_metadata.spec, 'nft-1.0.0')
    assert.equal(example_nft_metadata.name, 'nftExample')
    assert.equal(example_nft_metadata.symbol, 'NFTEXAMPLE')
    assert.equal(before_approve, false)
    assert.equal(before_revoke, true)
    assert.equal(after_revoke, false)
}

test()
