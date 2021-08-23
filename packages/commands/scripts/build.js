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
                choices: [
                    'All',
                    new inquirer.Separator(),
                    'NFT',
                    'Market',
                    'Generator',
                ],
            },
        ])
        .then((answers) => {
            const buildCommands = {
                All: [
                    'npx @cura/contracts --contract=NFT',
                    'npx @cura/contracts --contract=Market',
                    'npx @cura/contracts --contract=Generator',
                ],
                NFT: ['npx @cura/contracts --contract=NFT'],
                Market: ['npx @cura/contracts --contract=Market'],
                Generator: ['npx @cura/contracts --contract=Generator'],
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
