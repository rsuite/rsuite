'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _hooks = require("../internals/hooks");
var _excluded = ["as", "classPrefix", "children", "active", "className"];
var TabPanel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tab-panel' : _props$classPrefix,
    children = props.children,
    active = props.active,
    className = props.className,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "tabpanel",
    ref: ref,
    tabIndex: 0,
    hidden: !active,
    className: merge(className, withClassPrefix())
  }, rest), children);
});
TabPanel.displayName = 'TabPanel';
var _default = exports.default = TabPanel;