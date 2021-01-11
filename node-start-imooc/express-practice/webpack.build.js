const path = require('path')
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: 'myLibrary',
        libraryTarget: 'umd',
    },
    externals: [nodeExternals()]
});
