'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "disabled", "inside", "size", "children"];
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import InputGroupAddon from "./InputGroupAddon.js";
import InputGroupButton from "./InputGroupButton.js";
import { useClassNames } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var InputGroupContext = /*#__PURE__*/React.createContext(null);
/**
 * The `InputGroup` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
var InputGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('InputGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'input-group' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    disabled = propsWithDefaults.disabled,
    inside = propsWithDefaults.inside,
    size = propsWithDefaults.size,
    children = propsWithDefaults.children,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useState = useState(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var handleFocus = useCallback(function () {
    setFocus(true);
  }, []);
  var handleBlur = useCallback(function () {
    setFocus(false);
  }, []);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    inside: inside,
    focus: focus,
    disabled: disabled
  }));
  var renderChildren = useCallback(function () {
    return React.Children.map(children, function (item) {
      if (/*#__PURE__*/React.isValidElement(item)) {
        if (/*#__PURE__*/React.isValidElement(item)) {
          // Fix: Add type assertion to pass the disabled prop to the child element
          return disabled ? /*#__PURE__*/React.cloneElement(item, {
            disabled: disabled
          }) : item;
        }
      }
      return item;
    });
  }, [children, disabled]);
  var contextValue = useMemo(function () {
    return {
      onFocus: handleFocus,
      onBlur: handleBlur
    };
  }, [handleFocus, handleBlur]);
  return /*#__PURE__*/React.createElement(InputGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  }), renderChildren()));
});
InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  inside: PropTypes.bool,
  size: oneOf(['lg', 'md', 'sm', 'xs'])
};
InputGroup.Addon = InputGroupAddon;
InputGroup.Button = InputGroupButton;
export default InputGroup;