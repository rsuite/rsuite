'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["active", "as", "classPrefix", "children", "caret", "className", "disabled", "readOnly", "plaintext", "hasValue", "loading", "cleanable", "tabIndex", "inputValue", "focusItemValue", "onClean", "placement", "caretComponent", "caretAs", "label", "name"];
import React, { useRef, useMemo } from 'react';
import ToggleButton from "./ToggleButton.js";
import { useClassNames, useEventCallback, useToggleCaret } from "../hooks/index.js";
import { mergeRefs } from "../utils/index.js";
import Plaintext from "../Plaintext/index.js";
import Stack from "../../Stack/index.js";
import PickerIndicator from "./PickerIndicator.js";
import PickerLabel from "./PickerLabel.js";
import useCombobox from "./hooks/useCombobox.js";
var PickerToggle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var active = props.active,
    _props$as = props.as,
    Component = _props$as === void 0 ? ToggleButton : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-toggle' : _props$classPrefix,
    children = props.children,
    _props$caret = props.caret,
    caret = _props$caret === void 0 ? true : _props$caret,
    className = props.className,
    disabled = props.disabled,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    hasValue = props.hasValue,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    cleanable = props.cleanable,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    inputValueProp = props.inputValue,
    focusItemValue = props.focusItemValue,
    onClean = props.onClean,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    caretComponent = props.caretComponent,
    _props$caretAs = props.caretAs,
    caretAs = _props$caretAs === void 0 ? caretComponent : _props$caretAs,
    label = props.label,
    name = props.name,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var combobox = useRef(null);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  var inputValue = useMemo(function () {
    if (typeof inputValueProp === 'number' || typeof inputValueProp === 'string') {
      return inputValueProp;
    } else if (Array.isArray(inputValueProp)) {
      return inputValueProp.join(',');
    }
    return '';
  }, [inputValueProp]);
  var classes = merge(className, withClassPrefix({
    active: active
  }));
  var handleClean = useEventCallback(function (event) {
    var _combobox$current;
    event.stopPropagation();
    onClean === null || onClean === void 0 || onClean(event);
    (_combobox$current = combobox.current) === null || _combobox$current === void 0 || _combobox$current.focus();
  });
  var ToggleCaret = useToggleCaret(placement);
  var Caret = caretAs !== null && caretAs !== void 0 ? caretAs : ToggleCaret;
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "notSelected"
    }, hasValue ? children : null);
  }
  var showCleanButton = cleanable && hasValue && !readOnly;
  return /*#__PURE__*/React.createElement(Component, _extends({
    role: "combobox",
    id: id,
    "aria-haspopup": popupType,
    "aria-expanded": active,
    "aria-disabled": disabled,
    "aria-controls": id + "-" + popupType,
    "aria-labelledby": labelId,
    "aria-describedby": id + "-describe",
    "aria-activedescendant": active && focusItemValue ? id + "-opt-" + focusItemValue : undefined
  }, rest, {
    ref: mergeRefs(combobox, ref),
    disabled: disabled,
    tabIndex: disabled ? undefined : tabIndex,
    className: classes
  }), /*#__PURE__*/React.createElement(Stack, null, label && /*#__PURE__*/React.createElement(Stack.Item, null, /*#__PURE__*/React.createElement(PickerLabel, {
    as: "span",
    className: prefix('label'),
    id: labelId
  }, label)), /*#__PURE__*/React.createElement(Stack.Item, {
    grow: 1,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("input", {
    readOnly: true,
    "aria-hidden": true,
    tabIndex: -1,
    "data-testid": "picker-toggle-input",
    name: name,
    value: inputValue,
    className: prefix('textbox', 'read-only'),
    style: {
      pointerEvents: 'none'
    }
  }), children ? /*#__PURE__*/React.createElement("span", {
    className: prefix(hasValue ? 'value' : 'placeholder'),
    id: id + "-describe",
    "data-testid": "picker-describe"
  }, children) : null), /*#__PURE__*/React.createElement(Stack.Item, {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["indicator"])))
  }, /*#__PURE__*/React.createElement(PickerIndicator, {
    as: React.Fragment,
    loading: loading,
    caretAs: caret ? Caret : null,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
PickerToggle.displayName = 'PickerToggle';
export default PickerToggle;