const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** remove dist folder before build */
const CleanWebpackPlugin = require('clean-webpack-plugin');
/** conditionally configure for development or production mode */
// const webpack = require('webpack');
// const devMode = process.env.NODE_ENV === 'development';
// const devMode = false;
// options: devMode ? { minimize: false }


// module.exports = {
module.exports = (env, options) => {
    console.log(`((( Webpack mode === ${options.mode} )))`);
    return {
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            /** chunkhash */
            // filename: process.env.NODE_ENV === 'development' ? '[name].js' : '[name]--[contenthash:4].js'
            // filename: options.mode ? '[name].js' : '[name]--[contenthash:4].js'
            // if(options.mode) {
            //     '[name].js'
            // } else {

            // }
            filename: '[name].js'
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
                // filename: options.mode ? 'styles.css' : 'styles--[contenthash:4].css',
                filename: 'styles.css',
            }),
            new HtmlWebpackPlugin({
                /** by default script and style tags are added to dist html */
                // inject: false,
                hash: true,
                template: './src/index.html',
                filename: 'index.html'
            }),
            new CleanWebpackPlugin('dist', {}),
            // new webpack.DefinePlugin({
                // PRODUCTION: JSON.stringify(true)
            //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            // }),
        ]
    }
};