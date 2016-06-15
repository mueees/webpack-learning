'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
let path = require('path');
let libraryName = 'mue';

module.exports = {
    entry: path.join(__dirname + '/index.js'),

    output: {
        // нужно указать именно абсолютный путь
        path: path.join(__dirname + '/dist'),

        // [name] name - название entry
        filename: libraryName + ".js",

        // експортируем модуль home в публичную переменную с названием libHomes
        library: libraryName,

        libraryTarget: 'umd',

        umdNamedDefine: true
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        // время задержки перед сборкой
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    // плагины могут влезать в процесс компиляции на разных стадия
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        // если произошла ошибка при компиляции, файлы не будут созданы
        new webpack.NoErrorsPlugin()
    ],

    module: {
        // loader - это модуль
        // установить loader - npm i babel-loader
        loaders: [
            {
                loader: "babel?presets[]=es2015",

                exclude: /\/node_modules\//,

                test: /\.js$/
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    // как webpack ищет loader модули
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    externals: {
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        // вырезаем консоли, минифицируем файл
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}