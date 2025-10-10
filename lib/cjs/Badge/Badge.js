'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "content", "color", "className", "classPrefix", "children", "maxCount"];
/**
 * The Badge component is usually used to mark or highlight the status or quantity of an object.
 * @see https://rsuitejs.com/components/badge
 */
var Badge = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Badge', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    contentText = propsWithDefaults.content,
    color = propsWithDefaults.color,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'badge' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    _propsWithDefaults$ma = propsWithDefaults.maxCount,
    maxCount = _propsWithDefaults$ma === void 0 ? 99 : _propsWithDefaults$ma,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var dot = contentText === undefined || contentText === null;
  var classes = merge(className, withClassPrefix(color, {
    independent: !children,
    wrapper: children,
    dot: dot
  }));
  if (contentText === false) {
    return /*#__PURE__*/_react.default.cloneElement(children, {
      ref: ref
    });
  }
  var content = typeof contentText === 'number' && contentText > maxCount ? maxCount + "+" : contentText;
  if (!children) {
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
      ref: ref,
      className: classes
    }), content);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), children, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, content));
});
Badge.displayName = 'Badge';
Badge.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  as: _propTypes.default.elementType,
  content: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.bool]),
  maxCount: _propTypes.default.number,
  color: (0, _propTypes2.oneOf)(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};
var _default = exports.default = Badge;