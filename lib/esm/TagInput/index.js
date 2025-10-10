'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["tagProps", "trigger", "value", "defaultValue", "onTagRemove"];
import React, { useMemo } from 'react';
import InputPicker from "../InputPicker/InputPicker.js";
import { TagProvider } from "../InputPicker/InputPickerContext.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `TagInput` component is an enhancement of Input and supports input tags and management tags.
 *
 * @see https://rsuitejs.com/components/tag-input
 */
var TagInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('TagInput', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$ta = propsWithDefaults.tagProps,
    tagProps = _propsWithDefaults$ta === void 0 ? {} : _propsWithDefaults$ta,
    _propsWithDefaults$tr = propsWithDefaults.trigger,
    trigger = _propsWithDefaults$tr === void 0 ? 'Enter' : _propsWithDefaults$tr,
    value = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    onTagRemove = propsWithDefaults.onTagRemove,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var contextValue = useMemo(function () {
    return {
      multi: true,
      disabledOptions: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove
    };
  }, [onTagRemove, tagProps, trigger]);
  var data = useMemo(function () {
    return (value || defaultValue || []).map(function (v) {
      return {
        value: v,
        label: v
      };
    });
  }, [defaultValue, value]);
  return /*#__PURE__*/React.createElement(TagProvider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(InputPicker, _extends({}, rest, {
    "aria-haspopup": false,
    "aria-expanded": undefined,
    "aria-controls": undefined,
    "aria-keyshortcuts": trigger,
    value: value,
    defaultValue: defaultValue,
    data: data,
    placement: undefined,
    creatable: true,
    ref: ref
  })));
});
TagInput.displayName = 'TagInput';
export default TagInput;