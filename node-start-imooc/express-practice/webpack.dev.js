const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry: './example/src/index.tsx',
    devServer: {
        historyApiFallback: true,
        port: 3001,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Library Example Seed',
            template: path.resolve(__dirname, './example/src/index.html'), 
        }),
    ],
});