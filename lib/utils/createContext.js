"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = createContext;

var React = _interopRequireWildcard(require("react"));

function createContext(defaultValue) {
  var context = {
    Provider: React.Fragment,
    Consumer: React.Fragment
  };
  var ReactContext = React.createContext ? React.createContext(defaultValue) : context;
  return ReactContext;
}

module.exports = exports.default;