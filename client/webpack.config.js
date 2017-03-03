var webpack = require('webpack');
var path = require('path');
var port = 8380;

// var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: 'src',
        port: port,
        host: '0.0.0.0',
        devtool: 'eval'
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://0.0.0.0:' + port,
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, include: path.resolve(__dirname, 'src'), loader: 'style-loader!css-loader'},
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
