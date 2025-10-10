'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "disabled", "readOnly", "loading", "plaintext", "children", "className", "color", "checkedChildren", "unCheckedChildren", "classPrefix", "checked", "defaultChecked", "size", "locale", "onChange"];
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Plaintext from "../internals/Plaintext/index.js";
import Loader from "../Loader/index.js";
import { useClassNames, useControlled, useUniqueId, useEventCallback } from "../internals/hooks/index.js";
import { partitionHTMLProps } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Toggle` component is used to activate or deactivate an element.
 *
 * @see https://rsuitejs.com/components/toggle
 */
var Toggle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Toggle', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'span' : _propsWithDefaults$as,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    _propsWithDefaults$lo = propsWithDefaults.loading,
    loading = _propsWithDefaults$lo === void 0 ? false : _propsWithDefaults$lo,
    plaintext = propsWithDefaults.plaintext,
    children = propsWithDefaults.children,
    className = propsWithDefaults.className,
    color = propsWithDefaults.color,
    checkedChildren = propsWithDefaults.checkedChildren,
    unCheckedChildren = propsWithDefaults.unCheckedChildren,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'toggle' : _propsWithDefaults$cl,
    checkedProp = propsWithDefaults.checked,
    defaultChecked = propsWithDefaults.defaultChecked,
    size = propsWithDefaults.size,
    locale = propsWithDefaults.locale,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var inputRef = useRef(null);
  var _useControlled = useControlled(checkedProp, defaultChecked),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(size, color, {
    checked: checked,
    disabled: disabled,
    loading: loading
  }));
  var inner = checked ? checkedChildren : unCheckedChildren;
  var label = checked ? locale === null || locale === void 0 ? void 0 : locale.on : locale === null || locale === void 0 ? void 0 : locale.off;
  var labelId = useUniqueId('rs-label');
  var innerId = inner ? labelId + '-inner' : undefined;
  var labelledby = children ? labelId : innerId;
  var _partitionHTMLProps = partitionHTMLProps(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var handleInputChange = useEventCallback(function (e) {
    if (disabled || readOnly || loading) {
      return;
    }
    var checked = e.target.checked;
    setChecked(checked);
    onChange === null || onChange === void 0 || onChange(checked, e);
  });
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, null, inner || label);
  }
  return /*#__PURE__*/React.createElement("label", _extends({
    ref: ref,
    className: classes
  }, restProps), /*#__PURE__*/React.createElement("input", _extends({}, htmlInputProps, {
    ref: inputRef,
    type: "checkbox",
    checked: checkedProp,
    defaultChecked: defaultChecked,
    disabled: disabled,
    readOnly: readOnly,
    onChange: handleInputChange,
    className: prefix('input'),
    role: "switch",
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": labelledby,
    "aria-label": labelledby ? undefined : label,
    "aria-busy": loading || undefined
  })), /*#__PURE__*/React.createElement(Component, {
    className: prefix('presentation')
  }, /*#__PURE__*/React.createElement("span", {
    className: prefix('inner'),
    id: innerId
  }, inner), loading && /*#__PURE__*/React.createElement(Loader, {
    className: prefix('loader')
  })), children && /*#__PURE__*/React.createElement("span", {
    className: prefix('label'),
    id: labelId
  }, children));
});
Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  loading: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  as: PropTypes.elementType,
  size: oneOf(['sm', 'md', 'lg']),
  locale: PropTypes.shape({
    on: PropTypes.string,
    off: PropTypes.string
  })
};
export default Toggle;