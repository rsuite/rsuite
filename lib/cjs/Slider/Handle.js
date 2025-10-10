'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Input = _interopRequireDefault(require("./Input"));
var _useDrag2 = _interopRequireDefault(require("./useDrag"));
var _excluded = ["as", "classPrefix", "className", "disabled", "style", "children", "position", "vertical", "tooltip", "rtl", "value", "role", "tabIndex", "renderTooltip", "onDragStart", "onDragMove", "onDragEnd", "onKeyDown", "data-range", "data-key", "keepTooltipOpen"];
var Handle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _extends2;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'slider' : _props$classPrefix,
    className = props.className,
    disabled = props.disabled,
    style = props.style,
    children = props.children,
    position = props.position,
    vertical = props.vertical,
    tooltip = props.tooltip,
    rtl = props.rtl,
    value = props.value,
    role = props.role,
    tabIndex = props.tabIndex,
    renderTooltip = props.renderTooltip,
    onDragStart = props.onDragStart,
    onDragMove = props.onDragMove,
    onDragEnd = props.onDragEnd,
    onKeyDown = props.onKeyDown,
    dataRange = props['data-range'],
    dateKey = props['data-key'],
    keepTooltipOpen = props.keepTooltipOpen,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var actualTooltip = tooltip || keepTooltipOpen;
  var horizontalKey = rtl ? 'right' : 'left';
  var direction = vertical ? 'bottom' : horizontalKey;
  var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2[direction] = position + "%", _extends2));
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useDrag = (0, _useDrag2.default)({
      tooltip: actualTooltip,
      disabled: disabled,
      onDragStart: onDragStart,
      onDragMove: onDragMove,
      onDragEnd: onDragEnd,
      keepTooltipOpen: keepTooltipOpen
    }),
    active = _useDrag.active,
    onMoveStart = _useDrag.onMoveStart,
    onMouseEnter = _useDrag.onMouseEnter,
    rootRef = _useDrag.rootRef,
    tooltipRef = _useDrag.tooltipRef;
  var handleClasses = merge(className, prefix('handle'), {
    active: active || keepTooltipOpen
  });
  return /*#__PURE__*/_react.default.createElement(Component, {
    role: role,
    tabIndex: tabIndex,
    ref: (0, _utils.mergeRefs)(ref, rootRef),
    className: handleClasses,
    onMouseDown: onMoveStart,
    onMouseEnter: onMouseEnter,
    onTouchStart: onMoveStart,
    onKeyDown: onKeyDown,
    style: styles,
    "data-range": dataRange,
    "data-key": dateKey,
    "data-testid": "slider-handle"
  }, actualTooltip && /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    "aria-hidden": "true",
    ref: tooltipRef,
    className: merge(prefix('tooltip'), 'placement-top')
  }, renderTooltip ? renderTooltip(value) : value), /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends3.default)({
    tabIndex: -1,
    value: value
  }, rest)), children);
});
Handle.displayName = 'Handle';
Handle.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  tooltip: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  position: _propTypes.default.number,
  value: _propTypes.default.number,
  renderTooltip: _propTypes.default.func,
  style: _propTypes.default.object,
  onDragMove: _propTypes.default.func,
  onDragStart: _propTypes.default.func,
  onDragEnd: _propTypes.default.func
};
var _default = exports.default = Handle;