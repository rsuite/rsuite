'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["value", "defaultValue", "disabled", "onChange", "onEdit", "onCancel", "onSave", "onClick", "onFocus"];
import { useState } from 'react';
import { useEventCallback, useControlled } from "../internals/hooks/index.js";
var useEditState = function useEditState(props) {
  var valueProp = props.value,
    defaultValue = props.defaultValue,
    disabled = props.disabled,
    onChange = props.onChange,
    onEdit = props.onEdit,
    onCancel = props.onCancel,
    onSave = props.onSave,
    onClick = props.onClick,
    onFocus = props.onFocus,
    htmlProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _useState = useState(false),
    isEditing = _useState[0],
    setIsEditing = _useState[1];
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];

  // When editing, the value is not updated, and the original value is restored when canceling
  var _useState2 = useState(),
    resetValue = _useState2[0],
    setResetValue = _useState2[1];
  var handleClick = useEventCallback(function (event) {
    if (disabled) {
      return;
    }
    onClick === null || onClick === void 0 || onClick(event);
    onEdit === null || onEdit === void 0 || onEdit(event);
    setIsEditing(true);
    setResetValue(value);
  });
  var handleFocus = useEventCallback(function (event) {
    if (disabled || isEditing) return;
    onFocus === null || onFocus === void 0 || onFocus(event);
    setIsEditing(true);
    setResetValue(value);
  });
  var handleChange = useEventCallback(function (value, event) {
    setValue(value);
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleCancel = useEventCallback(function (event) {
    var _event$stopPropagatio;
    setIsEditing(false);
    setValue(resetValue);
    onCancel === null || onCancel === void 0 || onCancel(event);
    event === null || event === void 0 || (_event$stopPropagatio = event.stopPropagation) === null || _event$stopPropagatio === void 0 || _event$stopPropagatio.call(event);
  });
  var handleSave = useEventCallback(function (event) {
    var _event$stopPropagatio2;
    setIsEditing(false);
    onSave === null || onSave === void 0 || onSave(event);
    event === null || event === void 0 || (_event$stopPropagatio2 = event.stopPropagation) === null || _event$stopPropagatio2 === void 0 || _event$stopPropagatio2.call(event);
  });
  var handleKeyDown = useEventCallback(function (event) {
    var _event$target;
    if (isEditing) {
      switch (event.key) {
        case 'Enter':
          if (((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.tagName) === 'INPUT') {
            handleSave(event);
          }
          break;
        case 'Escape':
          handleCancel(event);
          break;
      }
    }
  });
  return {
    isEditing: isEditing,
    value: value,
    onClick: handleClick,
    onChange: handleChange,
    onFocus: handleFocus,
    onCancel: handleCancel,
    onSave: handleSave,
    onKeyDown: handleKeyDown,
    htmlProps: htmlProps
  };
};
export default useEditState;