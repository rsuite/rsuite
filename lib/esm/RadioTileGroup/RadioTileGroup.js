'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "inline", "children", "classPrefix", "disabled", "value", "defaultValue", "name", "onChange"];
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Stack from "../Stack/index.js";
import { useClassNames, useControlled } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var RadioTileContext = /*#__PURE__*/React.createContext({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTileGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('RadioTileGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? Stack : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-tile-group' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    name = propsWithDefaults.name,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var handleChange = useCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  }, [onChange, setValue]);
  var contextValue = useMemo(function () {
    return {
      name: name,
      disabled: disabled,
      value: typeof value === 'undefined' ? null : value,
      onChange: handleChange
    };
  }, [disabled, handleChange, name, value]);
  return /*#__PURE__*/React.createElement(RadioTileContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({
    alignItems: "stretch",
    spacing: 10
  }, rest, {
    role: "radiogroup",
    childrenRenderMode: "clone",
    direction: inline ? 'row' : 'column',
    ref: ref,
    className: classes
  }), children));
});
RadioTileGroup.displayName = 'RadioTileGroup';
RadioTileGroup.propTypes = {
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};
export default RadioTileGroup;