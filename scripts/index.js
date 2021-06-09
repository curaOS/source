#!/usr/bin/env node

const program = require('commander')
const deploy = require('./deploy')
const accounts = require('./accounts')

program
    .command('deploy') // sub-command name
    .alias('dpl')
    .description('Deploy all contracts if no option passed')
    .option('--clean', 'delete contracts')
    .option('--create', 'create contracts')
    .option('--build', 'build contracts')
    .option('--init', 'pass contracts init function')
    .action(function (options) {
        deploy(options.clean, options.create, options.build, options.init)
    })

program
    .command('accounts') // sub-command name
    .alias('acn')
    .description('Write env files for contract addresses')
    .action(function () {
        accounts()
    })

// allow commander to parse `process.argv`
program.parse(process.argv)
