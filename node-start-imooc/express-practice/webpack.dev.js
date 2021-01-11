const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    entry: './view/index.tsx',
    devServer: {
        historyApiFallback: true,
        port: 3001,
        proxy: {
            '/api': {
                target: "http://localhost:3000/",
                changeOrigin:true,
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React Library Example Seed',
            template: path.resolve(__dirname, './view/index.html'), 
        }),
    ],
    
});