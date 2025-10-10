'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "className", "show", "children", "placement"];
import React from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import { useClassNames } from "../internals/hooks/index.js";
import { placementPolyfill } from "../internals/utils/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `<Form.ErrorMessage>` component is used to display error messages in the form.
 * @see https://rsuitejs.com/components/form/
 */
var FormErrorMessage = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _prefix;
  var _useCustom = useCustom('FormErrorMessage', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-error-message' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    show = propsWithDefaults.show,
    children = propsWithDefaults.children,
    placement = propsWithDefaults.placement,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = withClassPrefix('show');
  var wrapperClasses = merge(className, prefix('wrapper', (_prefix = {}, _prefix["placement-" + kebabCase(placementPolyfill(placement))] = placement, _prefix)));
  return show ? /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: wrapperClasses
  }), /*#__PURE__*/React.createElement("span", {
    className: classes
  }, /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["arrow"])))
  }), /*#__PURE__*/React.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["inner"])))
  }, children))) : null;
});
FormErrorMessage.displayName = 'FormErrorMessage';
FormErrorMessage.propTypes = {
  show: PropTypes.bool,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  placement: oneOf(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd'])
};
export default FormErrorMessage;