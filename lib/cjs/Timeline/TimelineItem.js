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
var _excluded = ["as", "children", "classPrefix", "last", "className", "dot", "time", "INTERNAL_active"];
/**
 * The `Timeline.Item` component is used to set the layout of the child element in the `Timeline` component.
 *
 * @see https://rsuitejs.com/compo◊nents/timeline
 */
var TimelineItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'timeline-item' : _props$classPrefix,
    DEPRECATED_last = props.last,
    className = props.className,
    dot = props.dot,
    time = props.time,
    INTERNAL_active = props.INTERNAL_active,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    last: DEPRECATED_last,
    active: INTERNAL_active
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('tail')
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('dot', {
      'custom-dot': dot
    })
  }, dot), time && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('time')
  }, time), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content')
  }, children));
});
TimelineItem.displayName = 'TimelineItem';
TimelineItem.propTypes = {
  last: _propTypes.default.bool,
  dot: _propTypes.default.node,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = exports.default = TimelineItem;