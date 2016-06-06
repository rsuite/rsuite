var webpackConfig = {
    output: {
        pathinfo: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [
                'babel?babelrc'
            ],
            exclude: /node_modules/
        }]
    },
    devtool: 'eval'
};

module.exports = function(config) {
    config.set({
        basePath: '',
        files: [
          'test/ButtonSpec.js'
        ],
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        colors: true,
        reporters:['mocha'],
        browsers: ['PhantomJS'],
        logLevel: config.LOG_INFO,
        preprocessors: {
            'test/ButtonSpec.js': ['webpack']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    });
};
