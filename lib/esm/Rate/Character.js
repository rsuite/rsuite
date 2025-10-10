'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _isNil from "lodash/isNil";
var _excluded = ["as", "classPrefix", "className", "children", "vertical", "status", "disabled", "onClick", "onKeyDown", "onMouseMove"];
var _characterStatus;
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import contains from 'dom-lib/contains';
import { useClassNames } from "../internals/hooks/index.js";
var characterStatus = (_characterStatus = {}, _characterStatus[0] = 'empty', _characterStatus[0.5] = 'half', _characterStatus[1] = 'full', _characterStatus);
var getKey = function getKey(a, b) {
  return contains(a, b) ? 'before' : 'after';
};
var Character = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'rate-character' : _props$classPrefix,
    className = props.className,
    children = props.children,
    vertical = props.vertical,
    status = props.status,
    disabled = props.disabled,
    onClick = props.onClick,
    onKeyDown = props.onKeyDown,
    onMouseMove = props.onMouseMove,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var beforeRef = useRef(null);
  var classes = merge(className, withClassPrefix(!_isNil(status) && characterStatus[status]));
  var handleMouseMove = useCallback(function (event) {
    onMouseMove === null || onMouseMove === void 0 || onMouseMove(getKey(beforeRef.current, event.target), event);
  }, [onMouseMove]);
  var handleClick = useCallback(function (event) {
    onClick === null || onClick === void 0 || onClick(getKey(beforeRef.current, event.target), event);
  }, [onClick]);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    tabIndex: 0,
    onClick: disabled ? null : handleClick,
    onKeyDown: disabled ? null : onKeyDown,
    onMouseMove: disabled ? null : handleMouseMove
  }), /*#__PURE__*/React.createElement("div", {
    ref: beforeRef,
    className: prefix('before', {
      vertical: vertical
    })
  }, children), /*#__PURE__*/React.createElement("div", {
    className: prefix('after')
  }, children));
});
Character.displayName = 'Character';
Character.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  vertical: PropTypes.bool,
  status: PropTypes.number,
  disabled: PropTypes.bool,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func
};
export default Character;