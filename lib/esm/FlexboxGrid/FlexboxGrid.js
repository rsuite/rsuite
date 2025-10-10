'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "align", "justify"];
import React from 'react';
import PropTypes from 'prop-types';
import FlexboxGridItem from "./FlexboxGridItem.js";
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The FlexboxGrid component is a box that can be used to layout other components.
 * @see https://rsuitejs.com/components/flexbox-grid
 */
var FlexboxGrid = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('FlexboxGrid', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'flex-box-grid' : _propsWithDefaults$cl,
    _propsWithDefaults$al = propsWithDefaults.align,
    align = _propsWithDefaults$al === void 0 ? 'top' : _propsWithDefaults$al,
    _propsWithDefaults$ju = propsWithDefaults.justify,
    justify = _propsWithDefaults$ju === void 0 ? 'start' : _propsWithDefaults$ju,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(align, justify));
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }));
});
FlexboxGrid.Item = FlexboxGridItem;
FlexboxGrid.displayName = 'FlexboxGrid';
FlexboxGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  align: oneOf(['top', 'middle', 'bottom']),
  justify: oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
};
export default FlexboxGrid;