#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs')

const {
    YSN_ADDRESS,
    SHARE_ADDRESS,
    SHARE_MARKET_ADDRESS,
} = require('../accounts')

const log = console.log

log(`
    YSN_ADDRESS: ${chalk.blue(YSN_ADDRESS)}
    SHARE_ADDRESS: ${chalk.green(SHARE_ADDRESS)}
    MARKET_ADDRESS: ${chalk.red(SHARE_MARKET_ADDRESS)}
`)

const accountsTsFile = `export const YSN_ADDRESS : string = "${YSN_ADDRESS}"
export const SHARE_ADDRESS : string = "${SHARE_ADDRESS}"
export const SHARE_MARKET_ADDRESS : string = "${SHARE_MARKET_ADDRESS}"`

const accountsNextJsFile = `module.exports = {
    env: {
        YSN_ADDRESS: '${YSN_ADDRESS}',
        SHARE_ADDRESS: '${SHARE_ADDRESS}',
        SHARE_MARKET_ADDRESS: '${SHARE_MARKET_ADDRESS}',
    },
}
`

module.exports = function accounts() {
    fs.writeFile('contracts/accounts.ts', accountsTsFile, function (err) {
        if (err) return console.log(err)
        console.log('Write accounts.ts')
    })

    fs.writeFile('frontend/next.config.js', accountsNextJsFile, function (err) {
        if (err) return console.log(err)
        console.log('Write next.config.js')
    })
}
