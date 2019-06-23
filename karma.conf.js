const path = require('path');

/**
 * 执行全部测试用例: npm run tdd
 * 执行单个组件的测试用例: M=ButtonSpec.js npm run tdd
 */

const webpackConfig = {
  output: {
    pathinfo: true
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@test': path.resolve(__dirname, './test')
    }
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/, /\.jsx?$/],
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config => {
  const { env } = process;
  const { M, F } = env;

  let testFile = 'test/index.js';

  if (M) {
    testFile = `src/${M}/test/*.js`;
  } else if (F) {
    testFile = F;
  }

  config.set({
    basePath: '',
    files: [testFile],
    frameworks: ['mocha', 'sinon-chai'],
    colors: true,
    reporters: ['mocha', 'coverage'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      'test/**/*.js': ['webpack'],
      'src/**/*.js': ['webpack']
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
