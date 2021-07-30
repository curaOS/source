#!/usr/bin/env node

const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')
const inquirer = require('inquirer')

const log = console.log

module.exports = function deployNFT() {
    inquirer
        .prompt([
            {
                name: 'address',
                message: '- Contract deploy address:',
                validate: (input) => !!input,
            },
            {
                name: 'spec',
                default: 'nft-1.0.0',
            },
            {
                name: 'name',
                validate: (input) => !!input,
            },
            {
                name: 'symbol',
                validate: (input) => !!input,
            },
            {
                name: 'market_contract',
                message: 'Address of the Market:',
                validate: (input) => !!input,
            },
        ])
        .then((answers) => {
            const spinner = ora(`Deploy NFT to ${answers.address}`).start()

            const initParams = {
                contract_metadata: {
                    spec: answers.spec,
                    name: answers.name,
                    symbol: answers.symbol,
                },
                market_contract: answers.market_contract,
            }

            async.map(
                [
                    `near deploy --wasmFile build/release/NFT.wasm --accountId ${
                        answers.address
                    }  --initFunction "init" --initArgs '${JSON.stringify(
                        initParams
                    )}'`,
                ],
                exec,
                function (err, results) {
                    err
                        ? log(`${chalk.red(err.message)}`)
                        : results.map((r) => log(r))
                    !err ? spinner.succeed('Sucess') : spinner.fail('Failure')
                }
            )
        })
}
