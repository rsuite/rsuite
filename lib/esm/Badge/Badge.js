'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "content", "color", "className", "classPrefix", "children", "maxCount"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Badge component is usually used to mark or highlight the status or quantity of an object.
 * @see https://rsuitejs.com/components/badge
 */
var Badge = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Badge', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
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
    return /*#__PURE__*/React.cloneElement(children, {
      ref: ref
    });
  }
  var content = typeof contentText === 'number' && contentText > maxCount ? maxCount + "+" : contentText;
  if (!children) {
    return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
      ref: ref,
      className: classes
    }), content);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), children, /*#__PURE__*/React.createElement("div", {
    className: prefix('content')
  }, content));
});
Badge.displayName = 'Badge';
Badge.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  maxCount: PropTypes.number,
  color: oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'])
};
export default Badge;