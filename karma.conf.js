/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Run all tests: `npm run tdd`
 * Run all styles tests: `M=styles npm run tdd`
 * Run a component test: `M=Button npm run tdd`
 * Run a test of a file: `src/Picker/test/PickerToggleSpec.js npm run tdd`
 */
const pkg = require('./package.json');

/**
 * @param {import('karma').Config} config
 */
module.exports = config => {
  const { env } = process;
  const { M, F, CI } = env;

  let testFile = 'src/**/*Spec.js';

  if (M) {
    testFile = `src/${M}/test/*.js`;
  } else if (F) {
    testFile = F;
  }

  config.set({
    basePath: '',
    files: [testFile].map(pattern => ({ pattern, watched: false })),
    frameworks: ['mocha', 'chai-dom', 'sinon-chai', 'webpack'],
    colors: true,
    reporters: ['mocha', 'coverage', 'BrowserStack'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      'src/**/*Spec.js': ['webpack']
    },
    client: {
      mocha: {
        require: [require.resolve('./test/chai-assertions.js')]
      }
    },
    webpack: require('./webpack.karma.js'),
    webpackMiddleware: {
      noInfo: true
    },
    browserStack: {
      project: process.env.BROWSERSTACK_PROJECT_NAME || pkg.name,
      build: process.env.BROWSERSTACK_BUILD_NAME || `Local test ${Date.now()}`,
      // use '0' instead of 0 because 0 doesn't work
      // @see https://github.com/karma-runner/karma-browserstack-launcher/issues/179
      retryLimit: '0',
      timeout: 600 // 10min
    },
    customLaunchers: {
      bs_win_ie11: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'IE',
        browser_version: '11.0',
        resolution: '1366x768'
      },

      bs_win_edge: {
        base: 'BrowserStack',
        os: 'Windows',
        os_version: '10',
        browser: 'Edge',
        browser_version: 'latest',
        resolution: '1366x768'
      },

      bs_mac_chrome: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Big Sur',
        browser: 'Chrome',
        browser_version: 'latest'
      },
      bs_mac_firefox: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Big Sur',
        browser: 'Firefox',
        browser_version: 'latest'
      },
      bs_mac_safari: {
        base: 'BrowserStack',
        os: 'OS X',
        os_version: 'Big Sur',
        browser: 'Safari',
        browser_version: '14.0'
      }
    },
    browsers: CI
      ? [/*'bs_win_ie11',*/ 'bs_win_edge', 'bs_mac_chrome', 'bs_mac_firefox', 'bs_mac_safari']
      : ['Chrome'],
    // @see https://github.com/browserstack/karma-browserstack-example/blob/master/karma.conf.js
    captureTimeout: 3e5,
    // browserDisconnectTolerance: 0,
    // browserDisconnectTimeout: 3e5,
    browserSocketTimeout: 1.2e5,
    // browserNoActivityTimeout: 3e5,

    // Ref: https://github.com/mui-org/material-ui/blob/next/test/karma.conf.js
    browserDisconnectTimeout: 3 * 60 * 1000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 3 * 60 * 1000, // default 30000
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html' },
        { type: 'lcov', subdir: 'lcov' } // lcov
      ]
    }
  });
};
