/* eslint-disable */
require('babel-polyfill');
require('core-js/fn/object/assign');

const testsContext = require.context('.', true, /Spec.js$/);
testsContext.keys().forEach(testsContext);
