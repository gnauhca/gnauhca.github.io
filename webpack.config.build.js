var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: {
        'index': './js/index.js',
        'preset': './js/preset/preset.js'
    },
    output: {
        'path': './dist',
        'filename': '[name].js',
        'publicPath': './dist/'
    },

    // devtool: 'source-map',

    module: {
        rules: [
            { test: /.*\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /.*\.css$/, loaders: ['css-loader'] },
            {
                test: /.*?\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { 
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|json)\??.*$/, 
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },

    plugins: [
        new UglifyJSPlugin({comments: false})
        // new webpack.ProvidePlugin({
        //     $: 'zepto'
        // })
    ],

    devServer: {
        'content-base': '/',
        'inline': true,
        'host': '0.0.0.0',
        'port': 9123
    }
}
