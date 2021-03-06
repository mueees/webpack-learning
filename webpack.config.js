'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
let path = require('path');

// возможна мультикомпиляция, чем то похоже, если запустить несколько инстансов webpack
// module.exports = []

module.exports = {
    // поиск entry будет идти относитено этого пути
    context: path.join(__dirname + '/frontend'),

    // относительные пути
    // точка входа не может быть импортирована в другие фалйы
    entry: {
        home: "./home",
        about: "./about",

        // у нас есть точка входа common и также плагин CommonsChunkPlugin, который складывает общий код из entry в тот же файл common
        // таким образом код из точки входа сконкатенируется с результатом работы CommonsChunkPlugin

        // ['./common', './welcome'] - мы явно включили в сборку  common модуль welcome
        common: ['./common', './welcome']
    },

    output: {
        // нужно указать именно абсолютный путь
        path: path.join(__dirname + '/public'),

        // [name] name - название entry
        filename: "[name].js",

        // експортируем модуль home в публичную переменную с названием libHomes
        library: '[name]',

        // если динамически подгружать скрипты, нужно знать откуда их брать
        // тут можно указывать CDN или сторонний сервер
        // в конце обязательно должен быть /
        publicPath: '/'
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        // время задержки перед сборкой
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,

    // плагины могут влезать в процесс компиляции на разных стадия
    plugins: [
        // передает переменные в код приложения
        // к примеру можно передавать язык
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),

        // если произошла ошибка при компиляции, файлы не будут созданы
        new webpack.NoErrorsPlugin(),

        // выделяет общие модули в отдельные файлы(чанки)
        // можно создавать несколько инстансов этого плагина, указывая в каждом к примеру параметр chunks
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',

            // по умолчанию плагин выносит модули, которые используются во ВСЕХ модулях entry
            // minChunks - задает минимальное кол-во entry из которых надо выносить общие модули
            /*minChunks: 2,*/

            // вручную указываем entries из которых выносить общий код
            /*chunks: ['about', 'home']*/
        }),

        // передает переменные окружения в код приложения, внутри себя используеь DefinePlugin
        //new webpack.EnvironmentPlugin('NODE_ENV', 'USER')

        // подключает библиотеку, в коде map можно использовать как глобальную переменную
        // подходит для глобальных модулей, по типу angular, lodash ...
        new webpack.ProvidePlugin({
            map: 'lodash/map'
        })
    ],

    module: {
        // loader - это модуль
        // установить loader - npm i babel-loader
        loaders: [
            {
                // к файлам оканчивающимся на .js надо применять loader
                loader: "babel?presets[]=es2015",

                // хорошо оптимизирует сборку
                // к примеру angular довольно большой файл и бабел его долго трансформировал
                // но этого делать не надо, так как angular не нуждается в этом
                exclude: /\/node_modules\//,

                // можно идти от обратного, и указать те файл для которых нужен бабель
                // include: __dirname + '/frontend',

                test: /\.js$/
            },

            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file?name=[path][name].[ext]'
            }

            // есть еще url-loader позволяет файлы меньше заданого размера, преобразовывать в data-url
        ],

        // не парсить файл, не надо пытаться находить require и прочие вещи
        // подключить как есть
        noParse: [/angular\/angular.js/]
    },

    // как webpack ищет модули
    resolve: {
        // если в качестве модуля указан только название файла, но не путь
        // к примеру 'home', то такой модуль будет искаться в папке node_modules
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],

        // require('home')  webpack будет искать такой модуль в папках root
        root: [
            path.join(__dirname + '/vendor')
        ],

        alias: {
            old: 'somefolder/old/dist'
        }
    },

    // как webpack ищет loader модули
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    externals: {
        // мы скачали jquery с CDN, тут мы объявляем о внещнем модуле
        // мы можем использовать $ глобально или require('jquery')
        jquery: '$'
    },

    devServer: {
        host: 'localhost', // default
        port: '8080', // default
        // задает корневую папку откуда раздавать статику
        contentBase: path.join(__dirname + '/public'),

        /*proxy: [{
         // path: '/api/!*',
         // target: 'http://localhost:3000'
         //bypass: function (request, response, opitons){} // write own proxy function
         }]*/
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