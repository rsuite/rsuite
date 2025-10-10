'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Heading = _interopRequireDefault(require("../Heading"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["as", "classPrefix", "title", "children", "style", "visible", "className", "full", "arrow"];
/**
 * The `Popover` component is used to display a popup window for a target component.
 * @see https://rsuitejs.com/components/popover
 */
var Popover = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Popover', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'popover' : _propsWithDefaults$cl,
    title = propsWithDefaults.title,
    children = propsWithDefaults.children,
    style = propsWithDefaults.style,
    visible = propsWithDefaults.visible,
    className = propsWithDefaults.className,
    full = propsWithDefaults.full,
    _propsWithDefaults$ar = propsWithDefaults.arrow,
    arrow = _propsWithDefaults$ar === void 0 ? true : _propsWithDefaults$ar,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    full: full
  }));
  var styles = (0, _extends2.default)({
    display: 'block',
    opacity: visible ? 1 : undefined
  }, style);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "dialog"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), arrow && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["arrow"]))),
    "aria-hidden": true
  }), title && /*#__PURE__*/_react.default.createElement(_Heading.default, {
    level: 3,
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["title"])))
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["content"])))
  }, children));
});
Popover.displayName = 'Popover';
Popover.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  title: _propTypes.default.node,
  style: _propTypes.default.object,
  visible: _propTypes.default.bool,
  className: _propTypes.default.string,
  full: _propTypes.default.bool,
  arrow: _propTypes.default.bool
};
var _default = exports.default = Popover;