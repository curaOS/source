#!/usr/bin/env node

const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')

const {
    YSN_ADDRESS,
    SHARE_ADDRESS,
    SHARE_MARKET_ADDRESS,
} = require('../accounts')

const log = console.log

log(`
    YSN_ADDRESS: ${chalk.blue(YSN_ADDRESS)}
    SHARE_ADDRESS: ${chalk.green(SHARE_ADDRESS)}
    SHARE_MARKET_ADDRESS: ${chalk.red(SHARE_MARKET_ADDRESS)}
`)

const OWNER = `ysn.testnet`

module.exports = function deploy(clean, init, build) {
    if (init) {
        const spinner1 = ora('Init...').start()

        async.mapSeries(
            [
                `near create-account ${YSN_ADDRESS} --masterAccount ${OWNER} --initialBalance 10`,
                `near create-account ${SHARE_ADDRESS} --masterAccount ${YSN_ADDRESS} --initialBalance 5`,
                `near create-account ${SHARE_MARKET_ADDRESS} --masterAccount ${SHARE_ADDRESS} --initialBalance 1`,
            ],
            exec,
            function (err, results) {
                err
                    ? log(`${chalk.red(err.message)}`)
                    : results.map((r) => log(r))
                !err
                    ? spinner1.succeed('Create accounts')
                    : spinner1.fail('Create accounts')
            }
        )
    }

    if (clean) {
        const spinner2 = ora('Clean...').start()

        async.map(
            [
                `near delete ${YSN_ADDRESS} ${OWNER}`,
                `near delete ${SHARE_ADDRESS} ${OWNER}`,
                `near delete ${SHARE_MARKET_ADDRESS} ${OWNER}`,
            ],
            exec,
            function (err, results) {
                err ? log(`${chalk.red(err)}`) : results.map((r) => log(r))
                !err
                    ? spinner2.succeed('Delete accounts')
                    : spinner2.fail('Delete accounts')
            }
        )
    }

    if (build) {
        const spinner3 = ora('Build...').start()
        async.map(
            ['yarn build-share', 'yarn build-ysn', 'yarn build-market'],
            exec,
            function (err, results) {
                err
                    ? log(`${chalk.red(err.message)}`)
                    : results.map((r) => log(r))
                !err
                    ? spinner3.succeed('Build contracts')
                    : spinner3.fail('Build contracts')
            }
        )
    }

    if (!clean && !init && !build) {
        const spinner4 = ora('Deploy...').start()
        async.map(
            [
                `near deploy --wasmFile build/release/YSN.wasm --accountId ${YSN_ADDRESS}`,
                `near deploy --wasmFile build/release/SHARE.wasm --accountId ${SHARE_ADDRESS}`,
                `near deploy --wasmFile build/release/Market.wasm --accountId ${SHARE_MARKET_ADDRESS}`,
            ],
            exec,
            function (err, results) {
                err
                    ? log(`${chalk.red(err.message)}`)
                    : results.map((r) => log(r))
                !err
                    ? spinner4.succeed('Deploy contracts')
                    : spinner4.fail('Deploy contracts')
            }
        )
    }
}
