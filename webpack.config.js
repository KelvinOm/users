'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        main: './frontend/main'
    },

    output: {
        path: './public', // FS-путь к статике
        publicPath: '/', // Web-путь к статике (CDN?)
        filename: '[name].js'
    },

    watch: true,

    devtool: "source-map",

    module: {
        rules: [{
            test: /\.js$/,
            include: __dirname + '/frontend',
            loader: "babel-loader",
            options: {
                presets: ['es2015']
            }
        }, {
            test: /\.pug$/,
            loader: "pug-loader"
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader'
            })
        }]
    },

    node: {
        fs: "empty"
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./public'] }
        })
    ]

};
