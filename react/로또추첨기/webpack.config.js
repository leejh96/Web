const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
module.exports = {
    name : 'lotto',
    mode : 'development',
    devtool : 'eval',
    resolve : {
        extensions : ['.js', '.jsx']
    },

    entry : {
        app : ['./client.jsx'],
    },
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ]
            }
        }]
    },
    plugins : [
        new refreshWebpackPlugin()
    ],
    output : {
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath : '/dist/',
    },
    devServer : {
        publicPath : '/dist/',
        hot : true,
    }
}
