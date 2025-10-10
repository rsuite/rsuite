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
var _templateObject;
var _excluded = ["as", "classPrefix", "children", "className", "value", "inputRef", "style", "readOnly", "onChange"];
var InputSearch = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'input' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-search' : _props$classPrefix,
    children = props.children,
    className = props.className,
    value = props.value,
    inputRef = props.inputRef,
    style = props.style,
    readOnly = props.readOnly,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var handleChange = (0, _hooks.useEventCallback)(function (event) {
    var _event$target;
    onChange === null || onChange === void 0 || onChange(event === null || event === void 0 || (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value, event);
  });
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: classes,
    style: style
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: inputRef,
    readOnly: readOnly,
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["input"]))),
    value: value,
    onChange: handleChange
  })), children);
});
InputSearch.displayName = 'InputSearch';
var _default = exports.default = InputSearch;