'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["as", "checked", "className", "children", "classPrefix", "checkable", "color", "defaultChecked", "title", "inputRef", "inputProps", "indeterminate", "labelClickable", "tabIndex", "disabled", "readOnly", "plaintext", "inline", "name", "value", "onClick", "onCheckboxClick", "onChange"];
import React, { useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useControlled, useClassNames, useEventCallback, useUniqueId } from "../internals/hooks/index.js";
import { partitionHTMLProps, mergeRefs } from "../internals/utils/index.js";
import { CheckboxGroupContext } from "../CheckboxGroup/index.js";
import { refType } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Checkbox component is used for selecting multiple options from a set.
 * @see https://rsuitejs.com/components/checkbox
 */
var Checkbox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Checkbox', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var checkboxGroupContext = useContext(CheckboxGroupContext);
  var _ref = checkboxGroupContext !== null && checkboxGroupContext !== void 0 ? checkboxGroupContext : {},
    inlineContext = _ref.inline,
    nameContext = _ref.name,
    disabledContext = _ref.disabled,
    readOnlyContext = _ref.readOnly,
    plaintextContext = _ref.plaintext,
    onGroupChange = _ref.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    controlledChecked = propsWithDefaults.checked,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'checkbox' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.checkable,
    checkable = _propsWithDefaults$ch === void 0 ? true : _propsWithDefaults$ch,
    color = propsWithDefaults.color,
    _propsWithDefaults$de = propsWithDefaults.defaultChecked,
    defaultChecked = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    title = propsWithDefaults.title,
    inputRef = propsWithDefaults.inputRef,
    inputProps = propsWithDefaults.inputProps,
    indeterminate = propsWithDefaults.indeterminate,
    _propsWithDefaults$la = propsWithDefaults.labelClickable,
    labelClickable = _propsWithDefaults$la === void 0 ? true : _propsWithDefaults$la,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? disabledContext : _propsWithDefaults$di,
    _propsWithDefaults$re = propsWithDefaults.readOnly,
    readOnly = _propsWithDefaults$re === void 0 ? readOnlyContext : _propsWithDefaults$re,
    _propsWithDefaults$pl = propsWithDefaults.plaintext,
    plaintext = _propsWithDefaults$pl === void 0 ? plaintextContext : _propsWithDefaults$pl,
    _propsWithDefaults$in = propsWithDefaults.inline,
    inline = _propsWithDefaults$in === void 0 ? inlineContext : _propsWithDefaults$in,
    _propsWithDefaults$na = propsWithDefaults.name,
    name = _propsWithDefaults$na === void 0 ? nameContext : _propsWithDefaults$na,
    value = propsWithDefaults.value,
    onClick = propsWithDefaults.onClick,
    onCheckboxClick = propsWithDefaults.onCheckboxClick,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(controlledChecked, defaultChecked),
    selfChecked = _useControlled[0],
    setSelfChecked = _useControlled[1],
    selfControlled = _useControlled[2];

  // Either <Checkbox> is checked itself or by parent <CheckboxGroup>
  var checked = useMemo(function () {
    var _checkboxGroupContext, _checkboxGroupContext2;
    if (!checkboxGroupContext) {
      return selfChecked;
    }

    // fixme value from group should not be nullable
    return (_checkboxGroupContext = (_checkboxGroupContext2 = checkboxGroupContext.value) === null || _checkboxGroupContext2 === void 0 ? void 0 : _checkboxGroupContext2.some(function (checkedValue) {
      return checkedValue === value;
    })) !== null && _checkboxGroupContext !== void 0 ? _checkboxGroupContext : false;
  }, [checkboxGroupContext, selfChecked, value]);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(color, {
    inline: inline,
    indeterminate: indeterminate,
    disabled: disabled,
    checked: checked
  }));
  var _partitionHTMLProps = partitionHTMLProps(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];

  // If <Checkbox> is within a <CheckboxGroup>, it's bound to be controlled
  // because its checked state is inferred from group's value, not retrieved from the DOM
  var controlled = checkboxGroupContext ? true : selfControlled;
  if (typeof controlled !== 'undefined') {
    // In uncontrolled situations, use defaultChecked instead of checked
    htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
  }
  var checkboxRef = useRef(null);
  var handleChange = useEventCallback(function (event) {
    var nextChecked = event.target.checked;
    if (disabled || readOnly) {
      return;
    }
    setSelfChecked(nextChecked);
    onChange === null || onChange === void 0 || onChange(value, nextChecked, event);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, nextChecked, event);
  });
  var handleLabelClick = useEventCallback(function (event) {
    // Prevent check when label is not clickable
    if (!labelClickable && event.target !== checkboxRef.current) {
      event.preventDefault();
    }
  });
  var labelId = useUniqueId('label-');
  if (plaintext) {
    return checked ? /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
      ref: ref,
      className: classes
    }), children) : null;
  }
  var control = /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["control"])))
  }, /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, inputProps, {
    "aria-disabled": disabled,
    "aria-checked": indeterminate ? 'mixed' : checked,
    "aria-labelledby": labelId,
    name: name,
    value: value,
    type: "checkbox",
    ref: mergeRefs(checkboxRef, inputRef),
    tabIndex: tabIndex,
    readOnly: readOnly,
    disabled: disabled,
    onClick: onCheckboxClick,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["inner"]))),
    "aria-hidden": true,
    "data-testid": "checkbox-control-inner"
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: ref,
    onClick: onClick,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["checker"])))
  }, /*#__PURE__*/React.createElement("label", {
    title: title,
    onClick: handleLabelClick
  }, checkable ? control : null, /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["label"]))),
    id: labelId
  }, children))));
});
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  as: PropTypes.elementType,
  checked: PropTypes.bool,
  checkable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  inline: PropTypes.bool,
  indeterminate: PropTypes.bool,
  inputProps: PropTypes.any,
  inputRef: refType,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onCheckboxClick: PropTypes.func
};
export default Checkbox;