'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "children", "classPrefix", "className", "disabled", "size", "showControls", "stateOnBlur", "placeholder"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import EditableControls from "./EditableControls.js";
import useFocusEvent from "./useFocusEvent.js";
import useEditState from "./useEditState.js";
import { renderChildren, defaultRenderInput } from "./renderChildren.js";
import { useCustom } from "../CustomProvider/index.js";
var InlineEdit = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('InlineEdit', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ch = propsWithDefaults.children,
    children = _propsWithDefaults$ch === void 0 ? defaultRenderInput : _propsWithDefaults$ch,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'inline-edit' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    disabled = propsWithDefaults.disabled,
    size = propsWithDefaults.size,
    _propsWithDefaults$sh = propsWithDefaults.showControls,
    showControls = _propsWithDefaults$sh === void 0 ? true : _propsWithDefaults$sh,
    _propsWithDefaults$st = propsWithDefaults.stateOnBlur,
    stateOnBlur = _propsWithDefaults$st === void 0 ? 'save' : _propsWithDefaults$st,
    placeholder = propsWithDefaults.placeholder,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useEditState = useEditState(_extends({}, rest, {
      disabled: disabled
    })),
    value = _useEditState.value,
    isEditing = _useEditState.isEditing,
    onSave = _useEditState.onSave,
    onCancel = _useEditState.onCancel,
    onChange = _useEditState.onChange,
    onKeyDown = _useEditState.onKeyDown,
    onClick = _useEditState.onClick,
    onFocus = _useEditState.onFocus,
    htmlProps = _useEditState.htmlProps;
  var _useFocusEvent = useFocusEvent({
      isEditing: isEditing,
      stateOnBlur: stateOnBlur,
      onSave: onSave,
      onCancel: onCancel
    }),
    target = _useFocusEvent.target,
    root = _useFocusEvent.root,
    onBlur = _useFocusEvent.onBlur;
  var childrenProps = {
    size: size,
    value: value,
    disabled: disabled,
    placeholder: placeholder,
    plaintext: !isEditing,
    onChange: onChange,
    onBlur: onBlur
  };
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: mergeRefs(root, ref),
    tabIndex: 0,
    className: merge(className, withClassPrefix(size, {
      disabled: disabled
    })),
    onClick: onClick,
    onKeyDown: onKeyDown,
    onFocus: onFocus
  }, htmlProps), renderChildren(children, childrenProps, target), showControls && isEditing && /*#__PURE__*/React.createElement(EditableControls, {
    className: prefix('controls'),
    onSave: onSave,
    onCancel: onCancel
  }));
});
InlineEdit.displayName = 'InlineEdit';
InlineEdit.propTypes = {
  children: PropTypes.any,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  showControls: PropTypes.bool,
  placeholder: PropTypes.string,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  stateOnBlur: oneOf(['save', 'cancel']),
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onEdit: PropTypes.func
};
export default InlineEdit;