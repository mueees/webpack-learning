const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    entry: "./home",

    output: {
        filename: "build.js",

        // експортируем модуль home в публичную переменную с названием libHome
        library: 'libHome'
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
        })

        // передает переменные окружения в код приложения, внутри себя используеь DefinePlugin
        //new webpack.EnvironmentPlugin('NODE_ENV', 'USER')
    ],

    module: {
        // loader - это модуль
        // установить loader - npm i babel-loader
        loaders: [
            {
                // к файлам оканчивающимся на .js надо применять loader
                loader: "babel?presets[]=es2015",
                exclude: __dirname + 'node_modules',
                test: /\.js$/
            }
        ]
    },

    // как webpack ищет модули
    resolve: {
        // если в качестве модуля указан только название файла, но не путьы
        // к примеру 'home', то такой модуль будет искаться в папке node_modules
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    // как webpack ищет loder модули
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
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

// npm repo babel-loader - просмотреть исходним модуля