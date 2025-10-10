'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CardHeader = _interopRequireDefault(require("./CardHeader"));
var _CardBody = _interopRequireDefault(require("./CardBody"));
var _CardFooter = _interopRequireDefault(require("./CardFooter"));
var _CustomProvider = require("../CustomProvider");
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["as", "bordered", "classPrefix", "className", "children", "direction", "shaded", "style", "size", "width"];
var Card = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _useCustom = (0, _CustomProvider.useCustom)('Card', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$bo = propsWithDefaults.bordered,
    bordered = _propsWithDefaults$bo === void 0 ? true : _propsWithDefaults$bo,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'card' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    direction = propsWithDefaults.direction,
    shaded = propsWithDefaults.shaded,
    style = propsWithDefaults.style,
    size = propsWithDefaults.size,
    width = propsWithDefaults.width,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(direction, size, (_withClassPrefix = {
    bordered: bordered,
    shaded: shaded === true
  }, _withClassPrefix['shaded-hover'] = shaded === 'hover', _withClassPrefix)));
  var styles = (0, _extends2.default)({}, style, {
    '--rs-card-width': typeof width === 'number' ? width + "px" : width
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: classes,
    style: styles
  }, rest), children);
});
Card.displayName = 'Card';
Card.Header = _CardHeader.default;
Card.Body = _CardBody.default;
Card.Footer = _CardFooter.default;
Card.propTypes = {
  bordered: _propTypes.default.bool,
  shaded: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['hover'])]),
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  direction: (0, _propTypes2.oneOf)(['row', 'column']),
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm'])
};
var _default = exports.default = Card;