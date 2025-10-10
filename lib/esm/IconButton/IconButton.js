'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["icon", "placement", "children", "circle", "classPrefix", "className"];
import React from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `IconButton` component is used to specify a button with icon.
 * @see https://rsuitejs.com/components/button
 */
var IconButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('IconButton', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var icon = propsWithDefaults.icon,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'left' : _propsWithDefaults$pl,
    children = propsWithDefaults.children,
    circle = propsWithDefaults.circle,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn-icon' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix("placement-" + placement, {
    circle: circle,
    'with-text': typeof children !== 'undefined'
  }));
  return /*#__PURE__*/React.createElement(Button, _extends({}, rest, {
    ref: ref,
    className: classes
  }), icon, children);
});
IconButton.displayName = 'IconButton';
IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  circle: PropTypes.bool,
  children: PropTypes.node,
  placement: oneOf(['left', 'right'])
};
export default IconButton;