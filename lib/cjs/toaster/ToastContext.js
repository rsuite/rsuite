'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var ToastContext = /*#__PURE__*/_react.default.createContext({
  usedToaster: false
});
ToastContext.displayName = 'ToastContext';
var _default = exports.default = ToastContext;