#!/usr/bin/env node

const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')
const inquirer = require('inquirer')

const log = console.log

module.exports = function deployGenerator() {
    inquirer
        .prompt([
            {
                name: 'address',
                message: '- Contract deploy address:',
                validate: (input) => !!input,
            }
        ])
        .then((answers) => {
            const spinner = ora(`Deploy Generator to ${answers.address}`).start()

            async.map(
                [
                    `near deploy --wasmFile build/release/Generator.wasm --accountId ${answers.address}`,
                ],
                exec,
                function (err, results) {
                    console.log(err)
                    console.log(results)

                    err
                        ? log(`${chalk.red(err.message)}`)
                        : results.map((r) => log(r))
                    !err ? spinner.succeed('Success') : spinner.fail('Failure')
                }
            )
        })
}
