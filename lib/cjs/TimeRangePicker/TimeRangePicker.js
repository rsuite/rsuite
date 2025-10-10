'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _DateRangePicker = _interopRequireDefault(require("../DateRangePicker"));
var _CustomProvider = require("../CustomProvider");
var defaultRanges = [];
var TimeRangePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('TimeRangePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('DateTimeFormats'),
    shortTimeFormat = _getLocale.shortTimeFormat;
  return /*#__PURE__*/_react.default.createElement(_DateRangePicker.default, (0, _extends2.default)({
    ref: ref,
    showHeader: false,
    format: shortTimeFormat,
    ranges: defaultRanges
  }, propsWithDefaults));
});
TimeRangePicker.displayName = 'TimeRangePicker';
var _default = exports.default = TimeRangePicker;