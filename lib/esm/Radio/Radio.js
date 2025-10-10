'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["as", "title", "className", "children", "checked", "color", "defaultChecked", "classPrefix", "tabIndex", "inputRef", "inputProps", "disabled", "readOnly", "plaintext", "inline", "name", "value", "onChange", "onClick"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RadioContext } from "../RadioGroup/RadioGroup.js";
import { useClassNames, useControlled, useEventCallback, useUniqueId } from "../internals/hooks/index.js";
import { partitionHTMLProps } from "../internals/utils/index.js";
import { refType } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Radio` component is a simple radio button.
 * @see https://rsuitejs.com/components/radio
 */
var Radio = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var radioContext = useContext(RadioContext);
  var _useCustom = useCustom('Radio', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _ref = radioContext !== null && radioContext !== void 0 ? radioContext : {},
    groupValue = _ref.value,
    inlineContext = _ref.inline,
    nameContext = _ref.name,
    disabledContext = _ref.disabled,
    readOnlyContext = _ref.readOnly,
    plaintextContext = _ref.plaintext,
    onGroupChange = _ref.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    title = propsWithDefaults.title,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    checkedProp = propsWithDefaults.checked,
    color = propsWithDefaults.color,
    defaultChecked = propsWithDefaults.defaultChecked,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio' : _propsWithDefaults$cl,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
    inputRef = propsWithDefaults.inputRef,
    inputProps = propsWithDefaults.inputProps,
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
    onChange = propsWithDefaults.onChange,
    onClick = propsWithDefaults.onClick,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1],
    selfControlled = _useControlled[2];
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(color, {
    inline: inline,
    disabled: disabled,
    checked: checked
  }));
  var _partitionHTMLProps = partitionHTMLProps(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var handleChange = useEventCallback(function (event) {
    if (disabled || readOnly) {
      return;
    }
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, event);
    onChange === null || onChange === void 0 || onChange(value, true, event);
  });
  var controlled = radioContext ? true : selfControlled;
  if (typeof controlled !== 'undefined') {
    // In uncontrolled situations, use defaultChecked instead of checked
    htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
  }
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
    "aria-labelledby": labelId,
    "aria-checked": checked,
    "aria-disabled": disabled,
    ref: inputRef,
    type: "radio",
    name: name,
    value: value,
    tabIndex: tabIndex,
    readOnly: readOnly,
    disabled: disabled,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["inner"]))),
    "aria-hidden": true
  }));
  return /*#__PURE__*/React.createElement(Component, _extends({}, restProps, {
    ref: ref,
    onClick: onClick,
    className: classes
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["checker"])))
  }, children ? /*#__PURE__*/React.createElement("label", {
    title: title
  }, control, /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject4 || (_templateObject4 = _taggedTemplateLiteralLoose(["label"]))),
    id: labelId
  }, children)) : control));
});
Radio.displayName = 'Radio';
Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  inputProps: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  value: PropTypes.any,
  inputRef: refType,
  onChange: PropTypes.func
};
export default Radio;