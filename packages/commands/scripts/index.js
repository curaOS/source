#!/usr/bin/env node

const program = require('commander')
const deploy = require('./deploy')
const accounts = require('./accounts')
const build = require('./build')
const deploy_nft = require('./deploy_nft')
const deploy_market = require('./deploy_market')
const deploy_generator = require('./deploy_generator')

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

program
    .command('build')
    .alias('b')
    .description('Build contracts')
    .action(function () {
        build()
    })

program
    .command('deploy-nft')
    .alias('d-nft')
    .description('Deploy NFT contract')
    .action(function () {
        deploy_nft()
    })

program
    .command('deploy-market')
    .alias('d-mkt')
    .description('Deploy Market contract')
    .action(function () {
        deploy_market()
    })

program
    .command('deploy-generator')
    .alias('d-gnr')
    .description('Deploy Generator contract')
    .action(function () {
        deploy_generator()
    })

// allow commander to parse `process.argv`
program.parse(process.argv)
