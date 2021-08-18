#!/usr/bin/env node

const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')
const inquirer = require('inquirer')

const log = console.log

module.exports = function deployMarket() {
    inquirer
        .prompt([
            {
                name: 'address',
                message: '- Contract deploy address:',
                validate: (input) => !!input,
            },
            {
                name: 'media_contract',
                message: 'Address of the Media:',
                validate: (input) => !!input,
            },
        ])
        .then((answers) => {
            const spinner = ora(`Deploy Market to ${answers.address}`).start()

            const initParams = {
                media_contract: answers.media_contract,
            }

            async.map(
                [
                    `near deploy --wasmFile build/release/Market.wasm --accountId ${
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
