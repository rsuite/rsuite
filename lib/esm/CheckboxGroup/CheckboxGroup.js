'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "inline", "children", "name", "value", "defaultValue", "classPrefix", "disabled", "readOnly", "plaintext", "onChange"];
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import Plaintext from "../internals/Plaintext/index.js";
import { useClassNames, useControlled } from "../internals/hooks/index.js";
import { shallowEqual } from "../internals/utils/index.js";
import { CheckboxGroupContext } from "./CheckboxGroupContext.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `CheckboxGroup` component is used for selecting multiple options which are unrelated.
 * @see https://rsuitejs.com/components/checkbox/#checkbox-group
 */
var CheckboxGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('CheckboxGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    name = propsWithDefaults.name,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'checkbox-group' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    inline: inline
  }));
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var handleChange = useCallback(function (itemValue, itemChecked, event) {
    var nextValue = cloneDeep(value) || [];
    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      remove(nextValue, function (i) {
        return shallowEqual(i, itemValue);
      });
    }
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  }, [onChange, setValue, value]);
  var contextValue = useMemo(function () {
    return {
      inline: inline,
      name: name,
      value: value,
      readOnly: readOnly,
      disabled: disabled,
      plaintext: plaintext,
      controlled: isControlled,
      onChange: handleChange
    };
  }, [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]);
  return /*#__PURE__*/React.createElement(CheckboxGroupContext.Provider, {
    value: contextValue
  }, plaintext ? /*#__PURE__*/React.createElement(Plaintext, _extends({
    ref: ref,
    localeKey: "notSelected"
  }, rest), value !== null && value !== void 0 && value.length ? children : null) : /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    role: "group",
    className: classes
  }), children));
});
CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = {
  as: PropTypes.elementType,
  name: PropTypes.string,
  className: PropTypes.string,
  inline: PropTypes.bool,
  value: PropTypes.array,
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.array,
  classPrefix: PropTypes.string,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  plaintext: PropTypes.bool
};
export default CheckboxGroup;