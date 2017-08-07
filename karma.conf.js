const webpackConfig = {
  output: {
    pathinfo: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/
    }]
  },
  devtool: 'eval'
};

module.exports = (config) => {
  const { env } = process;
  config.set({
    basePath: '',
    files: ['test/index.js'],
    frameworks: [
      'mocha',
      'sinon-chai'
    ],
    colors: true,
    reporters: ['mocha', 'coverage'],

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
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' }  // lcov
      ]
    }
  });
};

