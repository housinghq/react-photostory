'use strict';

var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');

var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings : false
            }
        })
    );
}

module.exports = {
    module : {
        loaders: [{
            test   : /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'components')
        }, {
            test  : /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass')
        }]
    },
    entry  : [
        'eventsource-polyfill', // necessary for hot reloading with IE
        'webpack-hot-middleware/client',
        './components/index.js'
    ],
    devtool: 'cheap-module-eval-source-map',
    output : {
        path         : path.join(__dirname, 'dist'),
        filename     : 'bundle.js',
        publicPath   : '/static/',
        libraryTarget: 'umd'
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js']
    }
};
