'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "onMouseDown"],
  _excluded2 = ["className"];
import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import getOffset from 'dom-lib/getOffset';
import on from 'dom-lib/on';
import Transition from "../../Animation/Transition.js";
import { useClassNames } from "../hooks/index.js";
import { mergeRefs } from "../utils/index.js";
import { useCustom } from "../../CustomProvider/index.js";
var getPosition = function getPosition(target, event) {
  var offset = getOffset(target);
  var offsetX = (event.pageX || 0) - offset.left;
  var offsetY = (event.pageY || 0) - offset.top;
  var radiusX = Math.max(offset.width - offsetX, offsetX);
  var radiusY = Math.max(offset.height - offsetY, offsetY);
  var radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius
  };
};

/**
 * The `Ripple` component is used to implement the ripple effect.
 * @private
 */
var Ripple = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom(),
    disableRipple = _useCustom.disableRipple;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'span' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'ripple' : _props$classPrefix,
    onMouseDown = props.onMouseDown,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, prefix('pond'));
  var triggerRef = useRef(null);
  var _useState = useState(false),
    rippling = _useState[0],
    setRippling = _useState[1];
  var _useState2 = useState(),
    position = _useState2[0],
    setPosition = _useState2[1];
  var handleRippled = function handleRippled() {
    setRippling(false);
  };
  var handleMouseDown = useCallback(function (event) {
    if (triggerRef.current) {
      var _position = getPosition(triggerRef.current, event);
      setRippling(true);
      setPosition(_position);
      onMouseDown === null || onMouseDown === void 0 || onMouseDown(_position, event);
    }
  }, [onMouseDown]);
  useEffect(function () {
    var _triggerRef$current;
    var parentNode = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.parentNode;
    if (parentNode) {
      var mousedownListener = on(parentNode, 'mousedown', handleMouseDown);
      return function () {
        mousedownListener === null || mousedownListener === void 0 || mousedownListener.off();
      };
    }
  }, [handleMouseDown]);
  if (disableRipple) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    className: classes,
    ref: mergeRefs(triggerRef, ref)
  }), /*#__PURE__*/React.createElement(Transition, {
    in: rippling,
    enteringClassName: prefix('rippling'),
    onEntered: handleRippled
  }, function (props, ref) {
    var className = props.className,
      transitionRest = _objectWithoutPropertiesLoose(props, _excluded2);
    return /*#__PURE__*/React.createElement("span", _extends({}, transitionRest, {
      ref: ref,
      className: merge(withClassPrefix(), className),
      style: position
    }));
  }));
});
Ripple.displayName = 'Ripple';
Ripple.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  onMouseDown: PropTypes.func
};
export default Ripple;