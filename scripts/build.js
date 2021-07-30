#!/usr/bin/env node

const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')
const inquirer = require('inquirer')

const log = console.log

module.exports = function build() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'contracts',
                message: 'What do you want to build?',
                choices: ['All', new inquirer.Separator(), 'NFT', 'Market'],
            },
        ])
        .then((answers) => {
            const buildCommands = {
                All: ['yarn build-nft', 'yarn build-market'],
                NFT: ['yarn build-nft'],
                Market: ['yarn build-market'],
            }[answers.contracts]

            const spinner = ora(`Build ${answers.contracts}`).start()
            async.map(buildCommands, exec, function (err, results) {
                err
                    ? log(`${chalk.red(err.message)}`)
                    : results.map((r) => log(r))
                !err ? spinner.succeed('Success') : spinner3.fail('Failure')
            })
        })
}
