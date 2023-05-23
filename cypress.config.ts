/// <reference types="cypress" />
import * as path from 'path';

export default {
  ...({
    viewportWidth: 900,
    viewportHeight: 600,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'coverage/summary.xml',
      toConsole: true,
    },
    component: {
      specPattern: 'src/*/test/**/*Spec.tsx',
      devServer: {framework: 'react', bundler: 'vite'},
      fixturesFolder: false,
      supportFile: path.resolve(__dirname, 'cypress.support.ts'),
      indexHtmlFile: path.resolve(
        __dirname,
        'test/dist-test/component-index.html',
      ),
    },
  } as Cypress.ConfigOptions),
};
