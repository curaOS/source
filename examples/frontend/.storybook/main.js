const path = require('path')

const resolve = (p) => path.join(process.cwd(), p)

module.exports = {
    stories: [
        '../components/**/*.stories.mdx',
        '../components/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    webpackFinal(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@emotion/core': resolve('node_modules/@emotion/react'),
            '@emotion/styled': resolve('node_modules/@emotion/styled'),
            'emotion-theming': resolve('node_modules/@emotion/react'),
        }
        return config
    },
}
