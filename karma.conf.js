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

module.exports = function (config) {
    const { env } = process;
    config.set({
        basePath: '',
        files: ['test/index.js'],
        frameworks: [
            'mocha',
            'sinon-chai'
        ],
        colors: true,
        reporters: ['mocha'],

        logLevel: config.LOG_INFO,
        preprocessors: {
            'test/index.js': ['webpack'],
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
        customLaunchers: {
            ChromeCi: {
                base: 'Chrome',
                flags: ['--no-sandbox'],
            },
        }
    });
};

