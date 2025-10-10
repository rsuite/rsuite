'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "role", "className", "children", "block", "vertical", "justified", "size"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import ButtonGroupContext from "./ButtonGroupContext.js";
/**
 * The ButtonGroup component is used to group a series of buttons together in a single line or column.
 * @see https://rsuitejs.com/components/button/#button-group
 */
var ButtonGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('ButtonGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn-group' : _propsWithDefaults$cl,
    _propsWithDefaults$ro = propsWithDefaults.role,
    role = _propsWithDefaults$ro === void 0 ? 'group' : _propsWithDefaults$ro,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    block = propsWithDefaults.block,
    vertical = propsWithDefaults.vertical,
    justified = propsWithDefaults.justified,
    size = propsWithDefaults.size,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    block: block,
    vertical: vertical,
    justified: justified
  }));
  var contextValue = useMemo(function () {
    return {
      size: size
    };
  }, [size]);
  return /*#__PURE__*/React.createElement(ButtonGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    role: role,
    ref: ref,
    className: classes
  }), children));
});
ButtonGroup.displayName = 'ButtonGroup';
ButtonGroup.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  block: PropTypes.bool,
  vertical: PropTypes.bool,
  justified: PropTypes.bool,
  role: PropTypes.string,
  size: oneOf(['lg', 'md', 'sm', 'xs'])
};
export default ButtonGroup;