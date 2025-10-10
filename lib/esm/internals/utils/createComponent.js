'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["name", "componentAs", "componentClassPrefix"],
  _excluded2 = ["as", "classPrefix", "className", "role"];
import React from 'react';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { useClassNames } from "../hooks/index.js";
import { useCustom } from "../../CustomProvider/index.js";
/**
 * Create a component with `classPrefix` and `as` attributes.
 */
export function createComponent(_ref) {
  var name = _ref.name,
    componentAs = _ref.componentAs,
    componentClassPrefix = _ref.componentClassPrefix,
    defaultProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var Component = /*#__PURE__*/React.forwardRef(function (props, ref) {
    var _useCustom = useCustom(name, props),
      propsWithDefaults = _useCustom.propsWithDefaults;
    var _propsWithDefaults$as = propsWithDefaults.as,
      Component = _propsWithDefaults$as === void 0 ? componentAs || 'div' : _propsWithDefaults$as,
      _propsWithDefaults$cl = propsWithDefaults.classPrefix,
      classPrefix = _propsWithDefaults$cl === void 0 ? componentClassPrefix || kebabCase(name) : _propsWithDefaults$cl,
      className = propsWithDefaults.className,
      role = propsWithDefaults.role,
      rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded2);
    var _useClassNames = useClassNames(classPrefix),
      withClassPrefix = _useClassNames.withClassPrefix,
      merge = _useClassNames.merge;
    var classes = merge(className, withClassPrefix());
    return /*#__PURE__*/React.createElement(Component, _extends({}, defaultProps, rest, {
      role: role,
      ref: ref,
      className: classes
    }));
  });
  Component.displayName = name;
  Component.propTypes = {
    as: PropTypes.elementType,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };
  return Component;
}
export default createComponent;