#!/usr/bin/env node
#test 
const chalk = require('chalk')
const { exec } = require('child_process')
const ora = require('ora')
const async = require('async')
const program = require('commander')

const log = console.log

program
    .description('Build contracts.')
    .option('--contract <name>', 'Contract to build')
    .action(function (options) {
        const commandToRun = `asb -d ${__dirname}/as/${options.contract}`

        const spinner = ora(`Build ${options.contract}`).start()
        async.map([commandToRun], exec, function (err, results) {
            err ? log(`${chalk.red(err.message)}`) : results.map((r) => log(r))
            !err ? spinner.succeed('Success') : spinner.fail('Failure')
        })
    })

program.parse(process.argv)
