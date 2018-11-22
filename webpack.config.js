const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]--[chunkhash:4].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        // options: { minimize: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles--[chunkhash:4].css',
        }),
        new HtmlWebpackPlugin({
            // inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin('dist', {})
    ]
};