'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _ModalBody = _interopRequireDefault(require("../Modal/ModalBody"));
var DrawerBody = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(_ModalBody.default, (0, _extends2.default)({
    classPrefix: "drawer-body"
  }, props, {
    ref: ref
  }));
});
var _default = exports.default = DrawerBody;