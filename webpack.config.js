const path = require("path");
const {resolve} = require('path');
const srcDir = resolve('src');
const webpack = require('webpack');
const {NODE_ENV} = process.env;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const environment = NODE_ENV;
const relativeFileLoader = (ext = '[ext]') => {
    return {
        loader: 'file-loader',
        options: {
            useRelativePath: true,
            name: `[name].${ext}`,
            context: srcDir
        }
    };
};

module.exports = {
    mode: "development",
    entry: {
        app: [
            './app/app.js',
        ],
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /.js$/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(json|png|jpg|gif)$/,
                use: relativeFileLoader()
            },
            {
                test: /\.(sass|wxss)$/,
                use: [
                    relativeFileLoader('wxss'),
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [resolve('src', 'styles'), srcDir]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            ENVIRONMENT: JSON.stringify(environment)
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src',
                to: __dirname + '/dist/src'
            },
            {
                from: __dirname + '/src/images',
                to: __dirname + '/dist/pages/images'
            },
            {
                from: __dirname + '/src/components',
                to: __dirname + '/dist/src/components',
            },
            {
                from: __dirname + '/unit',
                to: __dirname + '/dist/unit',
            },
        ]),
    ],
}