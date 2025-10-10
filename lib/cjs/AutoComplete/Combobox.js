'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Picker = require("../internals/Picker");
var _Input = _interopRequireDefault(require("../Input"));
var _excluded = ["expanded", "focusItemValue"];
var Combobox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCombobox = (0, _Picker.useCombobox)(),
    id = _useCombobox.id,
    popupType = _useCombobox.popupType;
  var expanded = props.expanded,
    focusItemValue = props.focusItemValue,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-haspopup": popupType,
    "aria-expanded": expanded,
    "aria-activedescendant": focusItemValue ? id + "-opt-" + focusItemValue : undefined,
    autoComplete: "off",
    id: id,
    ref: ref
  }, rest));
});
var _default = exports.default = Combobox;