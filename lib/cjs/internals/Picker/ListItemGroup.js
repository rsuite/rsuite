'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../hooks");
var _ArrowDown = _interopRequireDefault(require("@rsuite/icons/ArrowDown"));
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "children", "className"];
var ListItemGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu-group' : _props$classPrefix,
    children = props.children,
    className = props.className,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "group"
  }, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["title"]))),
    tabIndex: -1
  }, /*#__PURE__*/_react.default.createElement("span", null, children), /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    "aria-hidden": true,
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["caret"])))
  })));
});
ListItemGroup.displayName = 'ListItemGroup';
var _default = exports.default = ListItemGroup;