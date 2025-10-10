'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "inline", "children", "classPrefix", "value", "defaultValue", "appearance", "name", "plaintext", "disabled", "readOnly", "onChange"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Plaintext from "../internals/Plaintext/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var RadioContext = /*#__PURE__*/React.createContext(void 0);

/**
 * The `RadioGroup` component is used to group a collection of `Radio` components.
 * @see https://rsuitejs.com/components/radio/#radio-group
 */
var RadioGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('RadioGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-group' : _propsWithDefaults$cl,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    name = propsWithDefaults.name,
    plaintext = propsWithDefaults.plaintext,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance, {
    inline: inline
  }));
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var handleChange = useEventCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue !== null && nextValue !== void 0 ? nextValue : '', event);
  });
  var contextValue = useMemo(function () {
    return {
      inline: inline,
      name: name,
      value: typeof value === 'undefined' ? null : value,
      controlled: isControlled,
      plaintext: plaintext,
      disabled: disabled,
      readOnly: readOnly,
      onChange: handleChange
    };
  }, [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]);
  return /*#__PURE__*/React.createElement(RadioContext.Provider, {
    value: contextValue
  }, plaintext ? /*#__PURE__*/React.createElement(Plaintext, _extends({
    ref: ref,
    localeKey: "notSelected"
  }, rest), value ? children : null) : /*#__PURE__*/React.createElement(Component, _extends({
    role: "radiogroup"
  }, rest, {
    ref: ref,
    className: classes
  }), children));
});
RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = {
  appearance: oneOf(['default', 'picker']),
  name: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  plaintext: PropTypes.bool
};
export default RadioGroup;