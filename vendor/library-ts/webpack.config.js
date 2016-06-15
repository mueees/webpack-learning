'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
let path = require('path');
let libraryName = 'mue';

module.exports = {
    entry: path.join(__dirname + '/src/index.ts'),

    output: {
        path: path.join(__dirname + '/dist'),

        filename: libraryName + ".js",

        library: libraryName,

        libraryTarget: 'umd',

        umdNamedDefine: true
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        new webpack.NoErrorsPlugin()
    ],

    module: {
        loaders: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    externals: {}
};