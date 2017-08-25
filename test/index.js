/* eslint-disable */
require('babel-polyfill');
require('core-js');

const testsContext = require.context('.', true, /Spec.js$/);
testsContext.keys().forEach(testsContext);
