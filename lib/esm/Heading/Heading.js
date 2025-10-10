'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "level"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 *
 * The `Heading` component is used to display a heading.
 *
 * @see https://rsuitejs.com/components/heading
 */
var Heading = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Heading', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var as = propsWithDefaults.as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'heading' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$le = propsWithDefaults.level,
    level = _propsWithDefaults$le === void 0 ? 3 : _propsWithDefaults$le,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var Component = as || "h" + level;
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }));
});
Heading.displayName = 'Heading';
Heading.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  as: PropTypes.elementType,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6])
};
export default Heading;