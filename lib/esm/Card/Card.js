'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "bordered", "classPrefix", "className", "children", "direction", "shaded", "style", "size", "width"];
import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from "./CardHeader.js";
import CardBody from "./CardBody.js";
import CardFooter from "./CardFooter.js";
import { useCustom } from "../CustomProvider/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
var Card = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _withClassPrefix;
  var _useCustom = useCustom('Card', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(direction, size, (_withClassPrefix = {
    bordered: bordered,
    shaded: shaded === true
  }, _withClassPrefix['shaded-hover'] = shaded === 'hover', _withClassPrefix)));
  var styles = _extends({}, style, {
    '--rs-card-width': typeof width === 'number' ? width + "px" : width
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes,
    style: styles
  }, rest), children);
});
Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.propTypes = {
  bordered: PropTypes.bool,
  shaded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['hover'])]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  direction: oneOf(['row', 'column']),
  size: oneOf(['lg', 'md', 'sm'])
};
export default Card;