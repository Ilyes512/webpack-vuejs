var webpack = require('webpack');

module.exports = {
    entry: './app/main.js',
    output: {
        path: './build',
        publicPath: 'build/',
        filename: 'app.js'
    },
    devServer: {
        inline: true,
        port: 3333,
        quiet: true,
        hot: true,
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap!sass?sourceMap'
            },
            {
                test: /\.css$/,
                loader: 'style!css?sourceMap'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=[name].[ext]?[hash]'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    // sassLoader: {
    //     includePaths: []
    // }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = '#source-map';    
}
