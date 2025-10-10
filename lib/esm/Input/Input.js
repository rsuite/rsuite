'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "classPrefix", "as", "type", "disabled", "value", "defaultValue", "inputRef", "id", "size", "htmlSize", "plaintext", "placeholder", "readOnly", "onPressEnter", "onFocus", "onBlur", "onKeyDown", "onChange"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormGroup } from "../FormGroup/index.js";
import { InputGroupContext } from "../InputGroup/InputGroup.js";
import Plaintext from "../internals/Plaintext/index.js";
import { KEY_VALUES } from "../internals/constants/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { createChainedFunction, mergeRefs } from "../internals/utils/index.js";
import { refType, oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `<Input>` component is used to get user input in a text field.
 *
 * @see https://rsuitejs.com/components/input
 */
var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Input', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'input' : _propsWithDefaults$cl,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'input' : _propsWithDefaults$as,
    _propsWithDefaults$ty = propsWithDefaults.type,
    type = _propsWithDefaults$ty === void 0 ? 'text' : _propsWithDefaults$ty,
    disabled = propsWithDefaults.disabled,
    value = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    inputRef = propsWithDefaults.inputRef,
    id = propsWithDefaults.id,
    size = propsWithDefaults.size,
    htmlSize = propsWithDefaults.htmlSize,
    plaintext = propsWithDefaults.plaintext,
    placeholder = propsWithDefaults.placeholder,
    readOnly = propsWithDefaults.readOnly,
    onPressEnter = propsWithDefaults.onPressEnter,
    onFocus = propsWithDefaults.onFocus,
    onBlur = propsWithDefaults.onBlur,
    onKeyDown = propsWithDefaults.onKeyDown,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === KEY_VALUES.ENTER) {
      onPressEnter === null || onPressEnter === void 0 || onPressEnter(event);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  };
  var handleChange = function handleChange(event) {
    var _event$target;
    onChange === null || onChange === void 0 || onChange((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value, event);
  };
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    plaintext: plaintext
  }));
  var inputGroupContext = useContext(InputGroupContext);
  var _useFormGroup = useFormGroup(),
    controlId = _useFormGroup.controlId;

  // Make the Input component display in plain text,
  // and display default characters when there is no value.
  if (plaintext) {
    return /*#__PURE__*/React.createElement(Plaintext, {
      ref: ref,
      localeKey: "unfilled",
      placeholder: placeholder
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var inputable = !disabled && !readOnly;
  var eventProps = {};
  if (inputable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
    eventProps.onFocus = createChainedFunction(onFocus, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onFocus);
    eventProps.onBlur = createChainedFunction(onBlur, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onBlur);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({}, rest, eventProps, {
    ref: mergeRefs(ref, inputRef),
    className: classes,
    type: type,
    id: id || controlId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    readOnly: readOnly,
    size: htmlSize,
    placeholder: placeholder
  }));
});
Input.displayName = 'Input';
Input.propTypes = {
  type: PropTypes.string,
  as: PropTypes.elementType,
  id: PropTypes.string,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: oneOf(['lg', 'md', 'sm', 'xs']),
  inputRef: refType,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPressEnter: PropTypes.func
};
export default Input;