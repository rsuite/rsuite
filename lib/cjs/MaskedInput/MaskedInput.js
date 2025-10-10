'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _TextMask = _interopRequireDefault(require("./TextMask"));
var _Input = _interopRequireDefault(require("../Input"));
var _CustomProvider = require("../CustomProvider");
var MaskedInput = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('MaskedInput', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    inputAs = _propsWithDefaults$as === void 0 ? _TextMask.default : _propsWithDefaults$as;
  return /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({}, propsWithDefaults, {
    as: inputAs,
    ref: ref
  }));
});
var _default = exports.default = MaskedInput;