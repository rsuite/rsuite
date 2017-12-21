/* eslint-disable */
require('babel-polyfill');

const addPrefix = (name) => `${globalKey}${name}`;

const testsContext = require.context('.', true, /Spec.js$/);
testsContext.keys().forEach(testsContext);
