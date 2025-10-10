'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["active", "as", "checkboxAs", "classPrefix", "checkable", "disabled", "value", "focus", "children", "className", "indeterminate", "labelClickable", "onKeyDown", "onSelect", "onCheck", "onSelectItem", "renderCheckbox"];
import React from 'react';
import { useClassNames, useEventCallback } from "../hooks/index.js";
import Checkbox from "../../Checkbox/index.js";
import useCombobox from "./hooks/useCombobox.js";
var ListCheckItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$active = props.active,
    active = _props$active === void 0 ? false : _props$active,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$checkboxAs = props.checkboxAs,
    CheckboxItem = _props$checkboxAs === void 0 ? Checkbox : _props$checkboxAs,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'check-item' : _props$classPrefix,
    _props$checkable = props.checkable,
    checkable = _props$checkable === void 0 ? true : _props$checkable,
    disabled = props.disabled,
    value = props.value,
    focus = props.focus,
    children = props.children,
    className = props.className,
    indeterminate = props.indeterminate,
    labelClickable = props.labelClickable,
    onKeyDown = props.onKeyDown,
    onSelect = props.onSelect,
    onCheck = props.onCheck,
    onSelectItem = props.onSelectItem,
    renderCheckbox = props.renderCheckbox,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var handleChange = useEventCallback(function (value, checked, event) {
    onSelect === null || onSelect === void 0 || onSelect(value, event, checked);
  });
  var handleCheck = useEventCallback(function (event) {
    if (!disabled) {
      onCheck === null || onCheck === void 0 || onCheck(value, event, !active);
    }
  });
  var handleSelectItem = useEventCallback(function (event) {
    if (!disabled) {
      onSelectItem === null || onSelectItem === void 0 || onSelectItem(value, event, !active);
    }
  });
  var _useCombobox = useCombobox(),
    id = _useCombobox.id;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix;
  var checkboxItemClasses = withClassPrefix({
    focus: focus
  });
  var checkboxProps = {
    checkable: checkable,
    children: children,
    checked: active,
    className: checkboxItemClasses,
    disabled: disabled,
    value: value,
    indeterminate: indeterminate,
    labelClickable: labelClickable,
    onKeyDown: disabled ? undefined : onKeyDown,
    onChange: handleChange,
    onClick: handleSelectItem,
    onCheckboxClick: handleCheck
  };
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "option",
    "aria-selected": active,
    "aria-disabled": disabled,
    id: id ? id + "-opt-" + value : undefined,
    "data-key": value
  }, rest, {
    ref: ref,
    className: merge(className, rootPrefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["picker-list-item"])))),
    tabIndex: -1
  }), renderCheckbox ? renderCheckbox(checkboxProps) : /*#__PURE__*/React.createElement(CheckboxItem, _extends({
    role: "checkbox"
  }, checkboxProps)));
});
ListCheckItem.displayName = 'ListCheckItem';
export default ListCheckItem;