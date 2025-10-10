'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useToggleCaret = useToggleCaret;
var _react = require("react");
var _ArrowUpLine = _interopRequireDefault(require("@rsuite/icons/ArrowUpLine"));
var _ArrowDownLine = _interopRequireDefault(require("@rsuite/icons/ArrowDownLine"));
var _ArrowLeftLine = _interopRequireDefault(require("@rsuite/icons/ArrowLeftLine"));
var _ArrowRightLine = _interopRequireDefault(require("@rsuite/icons/ArrowRightLine"));
var _CustomProvider = require("../../CustomProvider");
function useToggleCaret(placement) {
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  return (0, _react.useMemo)(function () {
    switch (true) {
      case /^top/.test(placement):
        return _ArrowUpLine.default;
      case /^right/.test(placement):
        return rtl ? _ArrowLeftLine.default : _ArrowRightLine.default;
      case /^left/.test(placement):
        return rtl ? _ArrowRightLine.default : _ArrowLeftLine.default;
      case /^bottom/.test(placement):
      default:
        return _ArrowDownLine.default;
    }
  }, [placement, rtl]);
}
var _default = exports.default = useToggleCaret;