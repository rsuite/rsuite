'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _noop = _interopRequireDefault(require("lodash/noop"));
var ListContext = /*#__PURE__*/_react.default.createContext({
  bordered: false,
  size: 'md',
  register: function register() {
    return {
      unregister: _noop.default
    };
  }
});
var _default = exports.default = ListContext;