"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.prefix = prefix;
exports.default = exports.defaultClassPrefix = exports.getClassNamePrefix = exports.globalKey = void 0;

var _curry2 = _interopRequireDefault(require("lodash/curry"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _classnames = _interopRequireDefault(require("classnames"));

var getGlobal = new Function('return this;');
var globals = getGlobal();
var globalKey = 'rs-';
exports.globalKey = globalKey;

var getClassNamePrefix = function getClassNamePrefix() {
  if (globals && typeof globals.__RSUITE_CLASSNAME_PREFIX__ !== 'undefined') {
    return globals.__RSUITE_CLASSNAME_PREFIX__;
  }

  return globalKey;
};

exports.getClassNamePrefix = getClassNamePrefix;

var defaultClassPrefix = function defaultClassPrefix(name) {
  return "" + getClassNamePrefix() + name;
};

exports.defaultClassPrefix = defaultClassPrefix;

function prefix(pre, className) {
  if (!pre || !className) {
    return '';
  }

  if ((0, _isArray2.default)(className)) {
    return (0, _classnames.default)(className.filter(function (name) {
      return !!name;
    }).map(function (name) {
      return pre + "-" + name;
    }));
  }

  return pre + "-" + className;
}

var _default = (0, _curry2.default)(prefix);

exports.default = _default;