'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["as", "active", "appearance", "block", "className", "children", "classPrefix", "color", "disabled", "loading", "ripple", "size", "startIcon", "endIcon", "type"];
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Ripple from "../internals/Ripple/index.js";
import SafeAnchor from "../SafeAnchor/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { ButtonGroupContext } from "../ButtonGroup/index.js";
import { isOneOf } from "../internals/utils/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The Button component is used to trigger a custom action.
 * @see https://rsuitejs.com/components/button
 */
var Button = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Button', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var as = propsWithDefaults.as,
    active = propsWithDefaults.active,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    block = propsWithDefaults.block,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn' : _propsWithDefaults$cl,
    color = propsWithDefaults.color,
    disabled = propsWithDefaults.disabled,
    loading = propsWithDefaults.loading,
    _propsWithDefaults$ri = propsWithDefaults.ripple,
    ripple = _propsWithDefaults$ri === void 0 ? true : _propsWithDefaults$ri,
    sizeProp = propsWithDefaults.size,
    startIcon = propsWithDefaults.startIcon,
    endIcon = propsWithDefaults.endIcon,
    typeProp = propsWithDefaults.type,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var buttonGroup = useContext(ButtonGroupContext);
  var size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : buttonGroup === null || buttonGroup === void 0 ? void 0 : buttonGroup.size;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(appearance, color, size, {
    active: active,
    disabled: disabled,
    loading: loading,
    block: block
  }));
  var buttonContent = useMemo(function () {
    var spin = /*#__PURE__*/React.createElement("span", {
      className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["spin"])))
    });
    var rippleElement = ripple && !isOneOf(appearance, ['link', 'ghost']) ? /*#__PURE__*/React.createElement(Ripple, null) : null;
    return /*#__PURE__*/React.createElement(React.Fragment, null, loading && spin, startIcon ? /*#__PURE__*/React.createElement("span", {
      className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["start-icon"])))
    }, startIcon) : null, children, endIcon ? /*#__PURE__*/React.createElement("span", {
      className: prefix(_templateObject3 || (_templateObject3 = _taggedTemplateLiteralLoose(["end-icon"])))
    }, endIcon) : null, rippleElement);
  }, [appearance, children, endIcon, loading, prefix, ripple, startIcon]);
  if (rest.href) {
    return /*#__PURE__*/React.createElement(SafeAnchor, _extends({}, rest, {
      as: as,
      ref: ref,
      "aria-disabled": disabled,
      disabled: disabled,
      className: classes
    }), buttonContent);
  }
  var Component = as || 'button';
  var type = typeProp || (Component === 'button' ? 'button' : undefined);
  var role = rest.role || (Component !== 'button' ? 'button' : undefined);
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    role: role,
    type: type,
    ref: ref,
    disabled: disabled,
    "aria-disabled": disabled,
    className: classes
  }), buttonContent);
});
Button.displayName = 'Button';
Button.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  appearance: oneOf(['default', 'primary', 'link', 'subtle', 'ghost']),
  block: PropTypes.bool,
  children: PropTypes.node,
  color: oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  loading: PropTypes.bool,
  ripple: PropTypes.bool,
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  type: oneOf(['button', 'reset', 'submit'])
};
export default Button;