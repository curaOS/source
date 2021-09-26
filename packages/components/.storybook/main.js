const path = require('path')

const findWorkspaceRoot = require('find-yarn-workspace-root')

const resolve = (_path) => {
    console.log(findWorkspaceRoot(), _path)
    return path.join(findWorkspaceRoot(), _path)
}

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
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
