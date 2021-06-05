#!/usr/bin/env node

const program = require('commander')
const deploy = require('./deploy')

program
    .command('deploy') // sub-command name
    .alias('dpl')
    .description('Create deployment contracts and deploy if not cleaning')
    .option('--clean', 'delete contracts')
    .option('--init', 'create contracts')
    .action(function (options) {
        deploy(options.clean, options.init)
    })

// allow commander to parse `process.argv`
program.parse(process.argv)
