import htmlWebpackPlugin from 'html-webpack-plugin'
import * as url from 'url'
import path from 'path'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import DotenvWebpackPlugin from 'dotenv-webpack'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export default {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'webfonts',
                        publicPath: '../webfonts',
                    },
                },
            },
        ],
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            title: 'Ethereum Web3',
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
}
