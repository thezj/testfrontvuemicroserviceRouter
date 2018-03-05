const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        comp1: './src/comp1.vue',
        comp3: './src/comp3.vue',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8001/'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'img/[name].[ext]',
                    }
                }]
            }
        ]
    },
    devServer: {
        port: 8001
    }

};