const path = require( 'path' );
const HTMLWebpackPlugin = require( 'html-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( "terser-webpack-plugin" );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const cssLoaders = ( extra ) =>
{
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: ''
            }
        }, 'css-loader',
    ]

    if ( extra )
    {
        loaders.push( extra );
    }
    return loaders;
}

const optimization = () =>
{
    const config = {
        splitChunks: {
            //убирает дублирование в импортах. Грузится библиотека только один раз
            chunks: 'all'
        },
    };

    if ( isProd )
    {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
    return config;
}

const babelOptions = ( preset ) =>
{
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if ( preset )
    {
        opts.presets.push( preset );
    }
    return opts;
}

//обязательно экспортируем обьект. используется Node javascript
module.exports = {

    //говорит где лежат все исходники
    context: path.resolve( __dirname, 'src' ),

    //режим сборки (влияет на минификацию)
    mode: 'development',

    //точка входа. chunks - это отдельные main/analytics ...
    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.ts'
    },

    //куда складывать результат работы weback
    output: {

        //При таком использовании паттерна [name] могут быть проблемы с кешем
        filename: '[name].[contenthash].min.js',

        //можно указывать и в строковом формате. Но корректнее и правильнее использовать path с Node.js
        path: path.resolve( __dirname, 'dist' ),
    },
    plugins: [
        new HTMLWebpackPlugin( {
            title: 'Webpack lesson by videoooooo',
            template: '../public/index.html',
            //минифицировать html
            minify: {
                collapseWhitespace: !isDev
            }
        } ),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin( {
            filename: '[name].[contenthash].min.css'
        } ),
        new CopyWebpackPlugin( {
            patterns: [
                { from: path.resolve( __dirname, 'assets/favicon.ico' ), to: path.resolve( __dirname, 'dist' ) }
            ]
        } )
    ],
    resolve: {
        //расширения по умолчанию. можно использовать тогда в импортах '../index' вместо '../index.js'
        extensions: ['.js', '.json', 'ts', 'tsx', 'jsx'],
        //упрощает прописание путей / сокращает
        alias: {
            '@models': path.resolve( __dirname, 'src/models' ),
            '@assets': path.resolve( __dirname, 'assets' )
        }
    },
    devServer: {
        port: 4200
    },

    devtool: isDev ? 'source-map' : false,
    optimization: optimization(),

    //позволяет работать с другими файлами
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: '/node_modules/',
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                //webpack работает справа на лево
                //style-loader добавляет стили в секцию head в html
                //MiniCssEx... добавляет не в head, а в отдельный файл
                use: cssLoaders( 'sass-loader' )
            },
            {
                test: /\.less$/,
                use: cssLoaders( 'less-loader' )
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}