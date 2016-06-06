var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: {
        //suite: path.join(__dirname, 'src'),
        index: './examples/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Suite',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'babel?babelrc'
            ],
            exclude: /node_modules/
        }]
    }
};
