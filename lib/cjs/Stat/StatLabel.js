'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InfoOutline = _interopRequireDefault(require("@rsuite/icons/InfoOutline"));
var _Whisper = _interopRequireDefault(require("../Whisper"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _hooks = require("../internals/hooks");
var _excluded = ["as", "classPrefix", "className", "children", "info", "uppercase"];
var StatLabel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'dt' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'stat-label' : _props$classPrefix,
    className = props.className,
    children = props.children,
    info = props.info,
    uppercase = props.uppercase,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    uppercase: uppercase
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: classes
  }, rest), children, info && /*#__PURE__*/_react.default.createElement(_Whisper.default, {
    placement: "top",
    trigger: 'click',
    enterable: true,
    speaker: /*#__PURE__*/_react.default.createElement(_Tooltip.default, null, info)
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    circle: true,
    size: "xs",
    appearance: "subtle",
    icon: /*#__PURE__*/_react.default.createElement(_InfoOutline.default, null)
  })));
});
StatLabel.displayName = 'StatLabel';
StatLabel.propTypes = {
  info: _propTypes.default.node,
  uppercase: _propTypes.default.bool
};
var _default = exports.default = StatLabel;