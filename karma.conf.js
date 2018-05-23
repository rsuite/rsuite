/**
 * 执行全部测试用例: npm run tdd
 * 执行单个组件的测试用例: M=BreadcrumbItem npm run tdd
 */

const webpackConfig = {
  output: {
    pathinfo: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config => {
  const { env } = process;
  const M = env.M ? `${env.M}Spec.js` : 'index.js';

  config.set({
    basePath: '',
    files: [`test/${M}`],
    frameworks: ['mocha', 'sinon-chai'],
    colors: true,
    reporters: ['mocha', 'coverage'],
    // https://github.com/karma-runner/karma/blob/master/docs/config/01-configuration-file.md#browsernoactivitytimeout
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 30000,
    captureTimeout: 60000,
    logLevel: config.LOG_INFO,
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' } // lcov
      ]
    }
  });
};
