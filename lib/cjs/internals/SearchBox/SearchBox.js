'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _Search = _interopRequireDefault(require("@rsuite/icons/Search"));
var _hooks = require("../hooks");
var _Input = _interopRequireDefault(require("../../Input"));
var _InputGroup = _interopRequireDefault(require("../../InputGroup"));
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "value", "className", "placeholder", "inputRef", "onChange"];
var SearchBox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'search-box' : _props$classPrefix,
    value = props.value,
    className = props.className,
    placeholder = props.placeholder,
    inputRef = props.inputRef,
    onChange = props.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_InputGroup.default, {
    inside: true
  }, /*#__PURE__*/_react.default.createElement(_Input.default, {
    role: "searchbox",
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["input"]))),
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    ref: inputRef
  }), /*#__PURE__*/_react.default.createElement(_InputGroup.default.Addon, null, /*#__PURE__*/_react.default.createElement(_Search.default, {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["icon"])))
  }))));
});
SearchBox.displayName = 'SearchBox';
var _default = exports.default = SearchBox;