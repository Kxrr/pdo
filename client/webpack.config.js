var webpack = require('webpack');
var path = require('path');
var port = 8080;

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
        new webpack.DefinePlugin({
            'process.env.SERVER_API_PORT': JSON.stringify(process.env.SERVER_API_PORT),
            'process.env.SERVER_API_HOST': JSON.stringify(process.env.SERVER_API_HOST)
        }),


    ]
};
