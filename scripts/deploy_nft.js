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
                message: 'Address of the Market (if any):',
                default: '',
            },
            {
                name: 'generator_contract',
                message: 'Address of the Generator (if any):',
                default: '',
            },
            {
                type: 'editor',
                name: 'packages_script',
                message: 'Packages script (if any):',
                default: '',
            },
            {
                type: 'editor',
                name: 'render_script',
                message: 'Render script:',
                default: '',
            },
            {
                type: 'editor',
                name: 'style_css',
                message: 'Styles CSS (if any):',
                default: '',
            },
            {
                type: 'editor',
                name: 'parameters',
                message: 'Parameters (if any):',
            },
        ])
        .then((answers) => {
            const spinner = ora(`Deploy NFT to ${answers.address}`).start()

            const initParams = {
                contract_metadata: {
                    spec: answers.spec,
                    name: answers.name,
                    symbol: answers.symbol,
                    packages_script: Buffer.from(
                        answers.packages_script
                    ).toString('base64'),
                    render_script: Buffer.from(answers.render_script).toString(
                        'base64'
                    ),
                    style_css: Buffer.from(answers.style_css).toString(
                        'base64'
                    ),
                    parameters: Buffer.from(
                        JSON.stringify(answers.parameters)
                    ).toString('base64'),
                },
                market_contract: answers.market_contract,
                generator_contract: answers.generator_contract,
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
                    !err ? spinner.succeed('Success') : spinner.fail('Failure')
                }
            )
        })
}
