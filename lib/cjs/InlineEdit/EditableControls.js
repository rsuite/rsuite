'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Check = _interopRequireDefault(require("@rsuite/icons/Check"));
var _Close = _interopRequireDefault(require("@rsuite/icons/Close"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _excluded = ["onSave", "onCancel"];
var EditableControls = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var onSave = props.onSave,
    onCancel = props.onCancel,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Stack.default, (0, _extends2.default)({
    ref: ref,
    spacing: 6
  }, rest), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "sm",
    icon: /*#__PURE__*/_react.default.createElement(_Check.default, null),
    "aria-label": "Save",
    onClick: onSave
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    size: "sm",
    icon: /*#__PURE__*/_react.default.createElement(_Close.default, null),
    "aria-label": "Cancel",
    onClick: onCancel
  }));
});
var _default = exports.default = EditableControls;