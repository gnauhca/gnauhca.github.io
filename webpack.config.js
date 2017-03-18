var webpack = require('webpack');

module.exports = {
    entry: {
        'index': './js/index.js',
    },
    output: {
        'path': './dist',
        'filename': '[name].js'
    },

    devtool: 'source-map',

    module: {
        rules: [
            { test: /.*\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            {
                test: /.*?\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader', 
                query: { 
                    presets: [ 'es2015'],
                    plugins: ["transform-object-assign"]
                }
            },
            { 
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, 
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },

    plugins: [
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
