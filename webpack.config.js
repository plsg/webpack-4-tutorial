const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** remove dist folder before build */
const CleanWebpackPlugin = require('clean-webpack-plugin');
/** conditionally configure for development or production mode */
// const devMode = process.env.NODE_ENV !== 'production';
// options: devMode ? { minimize: false }


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
            /** by default script and style tags are added to dist html */
            // inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin('dist', {})
    ]
};