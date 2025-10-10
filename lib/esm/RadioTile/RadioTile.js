'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "children", "classPrefix", "checked", "className", "defaultChecked", "disabled", "icon", "value", "label", "name", "tabIndex", "onChange"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@rsuite/icons/Check';
import Stack from "../Stack/index.js";
import { RadioTileContext } from "../RadioTileGroup/RadioTileGroup.js";
import { useClassNames, useControlled, useUniqueId } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { partitionHTMLProps } from "../internals/utils/index.js";
/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTile = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('RadioTile', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useContext = useContext(RadioTileContext),
    groupValue = _useContext.value,
    nameContext = _useContext.name,
    disabledContext = _useContext.disabled,
    onGroupChange = _useContext.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? Stack : _propsWithDefaults$as,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-tile' : _propsWithDefaults$cl,
    checkedProp = propsWithDefaults.checked,
    className = propsWithDefaults.className,
    defaultChecked = propsWithDefaults.defaultChecked,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? disabledContext : _propsWithDefaults$di,
    icon = propsWithDefaults.icon,
    value = propsWithDefaults.value,
    label = propsWithDefaults.label,
    _propsWithDefaults$na = propsWithDefaults.name,
    name = _propsWithDefaults$na === void 0 ? nameContext : _propsWithDefaults$na,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _partitionHTMLProps = partitionHTMLProps(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleChange = useCallback(function (event) {
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, event);
    onChange === null || onChange === void 0 || onChange(value, event);
  }, [onChange, onGroupChange, setChecked, value]);
  var classes = merge(className, withClassPrefix({
    checked: checked,
    disabled: disabled
  }));
  var radioId = useUniqueId('radio-');
  return /*#__PURE__*/React.createElement(Component, _extends({
    spacing: 6
  }, restProps, {
    childrenRenderMode: "clone",
    ref: ref,
    className: classes,
    as: "label"
  }), /*#__PURE__*/React.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: prefix('body')
  }, /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    tabIndex: tabIndex,
    disabled: disabled,
    onChange: handleChange,
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": radioId + "-label",
    "aria-describedby": radioId + "-desc"
  })), /*#__PURE__*/React.createElement("div", {
    className: prefix('label'),
    id: radioId + "-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: prefix('content'),
    id: radioId + "-desc"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: prefix('mark')
  }, /*#__PURE__*/React.createElement(CheckIcon, {
    className: prefix('mark-icon')
  }))));
});
RadioTile.displayName = 'RadioTile';
RadioTile.propTypes = {
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.node,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
};
export default RadioTile;