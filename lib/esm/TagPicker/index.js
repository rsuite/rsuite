'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["tagProps", "trigger", "onTagRemove", "renderMenuItemCheckbox", "renderValue"];
import React, { useMemo } from 'react';
import InputPicker from "../InputPicker/InputPicker.js";
import { TagProvider } from "../InputPicker/InputPickerContext.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * `TagPicker` component enables multi-selection by tags and supports new options.
 *
 * @see https://rsuitejs.com/components/tag-picker/
 */
var TagPicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('TagPicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$ta = propsWithDefaults.tagProps,
    tagProps = _propsWithDefaults$ta === void 0 ? {} : _propsWithDefaults$ta,
    _propsWithDefaults$tr = propsWithDefaults.trigger,
    trigger = _propsWithDefaults$tr === void 0 ? 'Enter' : _propsWithDefaults$tr,
    onTagRemove = propsWithDefaults.onTagRemove,
    renderMenuItemCheckbox = propsWithDefaults.renderMenuItemCheckbox,
    renderValue = propsWithDefaults.renderValue,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var contextValue = useMemo(function () {
    return {
      multi: true,
      trigger: trigger,
      tagProps: tagProps,
      onTagRemove: onTagRemove,
      renderCheckbox: renderMenuItemCheckbox
    };
  }, [onTagRemove, renderMenuItemCheckbox, tagProps, trigger]);
  return /*#__PURE__*/React.createElement(TagProvider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(InputPicker, _extends({
    renderValue: renderValue
  }, rest, {
    ref: ref
  })));
});
TagPicker.displayName = 'TagPicker';
export default TagPicker;