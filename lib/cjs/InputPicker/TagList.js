'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../internals/hooks");
var _useCombobox2 = _interopRequireDefault(require("../internals/Picker/hooks/useCombobox"));
var _templateObject;
var _excluded = ["children"];
var TagList = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)('picker'),
    prefix = _useClassNames.prefix;
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id;
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: ref,
    role: "listbox",
    id: id + "-describe",
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["tag-list"])))
  }, rest), children);
});
var _default = exports.default = TagList;