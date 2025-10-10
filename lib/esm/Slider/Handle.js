'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "disabled", "style", "children", "position", "vertical", "tooltip", "rtl", "value", "role", "tabIndex", "renderTooltip", "onDragStart", "onDragMove", "onDragEnd", "onKeyDown", "data-range", "data-key", "keepTooltipOpen"];
import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from "../Tooltip/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import Input from "./Input.js";
import useDrag from "./useDrag.js";
var Handle = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var actualTooltip = tooltip || keepTooltipOpen;
  var horizontalKey = rtl ? 'right' : 'left';
  var direction = vertical ? 'bottom' : horizontalKey;
  var styles = _extends({}, style, (_extends2 = {}, _extends2[direction] = position + "%", _extends2));
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useDrag = useDrag({
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
  return /*#__PURE__*/React.createElement(Component, {
    role: role,
    tabIndex: tabIndex,
    ref: mergeRefs(ref, rootRef),
    className: handleClasses,
    onMouseDown: onMoveStart,
    onMouseEnter: onMouseEnter,
    onTouchStart: onMoveStart,
    onKeyDown: onKeyDown,
    style: styles,
    "data-range": dataRange,
    "data-key": dateKey,
    "data-testid": "slider-handle"
  }, actualTooltip && /*#__PURE__*/React.createElement(Tooltip, {
    "aria-hidden": "true",
    ref: tooltipRef,
    className: merge(prefix('tooltip'), 'placement-top')
  }, renderTooltip ? renderTooltip(value) : value), /*#__PURE__*/React.createElement(Input, _extends({
    tabIndex: -1,
    value: value
  }, rest)), children);
});
Handle.displayName = 'Handle';
Handle.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  tooltip: PropTypes.bool,
  rtl: PropTypes.bool,
  position: PropTypes.number,
  value: PropTypes.number,
  renderTooltip: PropTypes.func,
  style: PropTypes.object,
  onDragMove: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func
};
export default Handle;