const path = require('path')
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry: './view/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'myLibrary',
        libraryTarget: 'umd',
    },
    externals: [nodeExternals()]
});
