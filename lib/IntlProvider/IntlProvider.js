"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _IntlContext = _interopRequireDefault(require("./IntlContext"));

var IntlProvider = function IntlProvider(_ref) {
  var locale = _ref.locale,
      rtl = _ref.rtl,
      children = _ref.children;
  return React.createElement(_IntlContext.default.Provider, {
    value: (0, _extends2.default)({}, locale, {
      rtl: rtl
    })
  }, children);
};

var _default = IntlProvider;
exports.default = _default;
module.exports = exports.default;