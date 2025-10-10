'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.PROGRESS_STATUS_ICON = exports.MESSAGE_STATUS_ICONS = void 0;
var _react = _interopRequireDefault(require("react"));
var _InfoRound = _interopRequireDefault(require("@rsuite/icons/InfoRound"));
var _CheckRound = _interopRequireDefault(require("@rsuite/icons/CheckRound"));
var _WarningRound = _interopRequireDefault(require("@rsuite/icons/WarningRound"));
var _RemindRound = _interopRequireDefault(require("@rsuite/icons/RemindRound"));
var _Check = _interopRequireDefault(require("@rsuite/icons/Check"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var MESSAGE_STATUS_ICONS = exports.MESSAGE_STATUS_ICONS = {
  info: /*#__PURE__*/_react.default.createElement(_InfoRound.default, null),
  success: /*#__PURE__*/_react.default.createElement(_CheckRound.default, null),
  error: /*#__PURE__*/_react.default.createElement(_WarningRound.default, null),
  warning: /*#__PURE__*/_react.default.createElement(_RemindRound.default, null)
};
var PROGRESS_STATUS_ICON = exports.PROGRESS_STATUS_ICON = {
  success: /*#__PURE__*/_react.default.createElement(_Check.default, null),
  active: null,
  fail: /*#__PURE__*/_react.default.createElement(_Close.default, null)
};