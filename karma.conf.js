/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Run all tests: `npm run tdd`
 * Run all styles tests: `M=styles npm run tdd`
 * Run a component test: `M=Button npm run tdd`
 * Run a test of a file: `F=src/Picker/test/PickerToggleSpec.tsx npm run tdd`
 */

/**
 * @param {import('karma').Config} config
 */
module.exports = config => {
  const { env } = process;
  const { M, F } = env;

  // Weird pattern syntax but works
  // @see https://github.com/karma-runner/karma/issues/1532#issuecomment-127128326
  let testFile = 'src/**/*Spec.+(js|ts|tsx)';

  if (M) {
    testFile = `src/${M}/test/*Spec.+(js|ts|tsx)`;
  } else if (F) {
    testFile = F;
  }

  config.set({
    /** Timeout for capturing a browser (in ms). */
    captureTimeout: 210000,

    /** maximum number of tries a browser will attempt in the case of a disconnection (in ms) */
    browserDisconnectTolerance: 3,

    /** How long does Karma wait for a browser to reconnect (in ms). */
    browserDisconnectTimeout: 210000,

    /** How long will Karma wait for a message from a browser before disconnecting from it (in ms). */
    browserNoActivityTimeout: 210000,
    basePath: '',
    files: ['test/setupTests.js', ...[testFile].map(pattern => ({ pattern, watched: false }))],
    frameworks: ['mocha', 'chai-dom', 'sinon-chai', 'webpack'],
    colors: true,
    reporters: ['mocha', 'coverage'],
    logLevel: config.LOG_INFO,
    preprocessors: {
      'test/setupTests.js': ['webpack'],
      'src/**/*Spec.+(js|ts|tsx)': ['webpack']
    },
    client: {
      mocha: {
        timeout: 10000 // default 2000
      }
    },
    webpack: require('./webpack.karma.js'),
    webpackMiddleware: {
      noInfo: true
    },
    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      FirefoxAutoAllowGUM: {
        base: 'Firefox',
        prefs: {
          'media.navigator.permission.disabled': true
        }
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
