'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "accepter", "classPrefix", "checkAsync", "checkTrigger", "errorPlacement", "errorMessage", "name", "value", "readOnly", "plaintext", "disabled", "onChange", "onBlur", "defaultValue", "shouldResetWithUnmount", "rule", "id"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Input from "../Input/index.js";
import FormErrorMessage from "../FormErrorMessage/index.js";
import FormContext, { FormValueContext } from "../Form/FormContext.js";
import useRegisterModel from "./hooks/useRegisterModel.js";
import useField from "./hooks/useField.js";
import Toggle from "../Toggle/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useFormGroup } from "../FormGroup/index.js";
import { useWillUnmount, useEventCallback } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";

/**
 * Props that FormControl passes to its accepter
 */

/**
 * The `<Form.Control>` component is used to wrap the components that need to be validated.
 * @see https://rsuitejs.com/components/form/
 */
var FormControl = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _accepterProps;
  var _useCustom = useCustom('FormControl', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useContext = useContext(FormContext),
    readOnlyContext = _useContext.readOnly,
    plaintextContext = _useContext.plaintext,
    disabledContext = _useContext.disabled,
    errorFromContext = _useContext.errorFromContext,
    formError = _useContext.formError,
    nestedField = _useContext.nestedField,
    removeFieldValue = _useContext.removeFieldValue,
    removeFieldError = _useContext.removeFieldError,
    onFieldChange = _useContext.onFieldChange,
    contextCheckTrigger = _useContext.checkTrigger,
    checkFieldForNextValue = _useContext.checkFieldForNextValue,
    checkFieldAsyncForNextValue = _useContext.checkFieldAsyncForNextValue;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ac = propsWithDefaults.accepter,
    AccepterComponent = _propsWithDefaults$ac === void 0 ? Input : _propsWithDefaults$ac,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-control' : _propsWithDefaults$cl,
    checkAsync = propsWithDefaults.checkAsync,
    checkTrigger = propsWithDefaults.checkTrigger,
    _propsWithDefaults$er = propsWithDefaults.errorPlacement,
    errorPlacement = _propsWithDefaults$er === void 0 ? 'bottomStart' : _propsWithDefaults$er,
    errorMessage = propsWithDefaults.errorMessage,
    name = propsWithDefaults.name,
    value = propsWithDefaults.value,
    _propsWithDefaults$re = propsWithDefaults.readOnly,
    readOnly = _propsWithDefaults$re === void 0 ? readOnlyContext : _propsWithDefaults$re,
    _propsWithDefaults$pl = propsWithDefaults.plaintext,
    plaintext = _propsWithDefaults$pl === void 0 ? plaintextContext : _propsWithDefaults$pl,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? disabledContext : _propsWithDefaults$di,
    onChange = propsWithDefaults.onChange,
    onBlur = propsWithDefaults.onBlur,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$sh = propsWithDefaults.shouldResetWithUnmount,
    shouldResetWithUnmount = _propsWithDefaults$sh === void 0 ? false : _propsWithDefaults$sh,
    rule = propsWithDefaults.rule,
    id = propsWithDefaults.id,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useFormGroup = useFormGroup(id),
    controlId = _useFormGroup.controlId,
    helpTextId = _useFormGroup.helpTextId,
    labelId = _useFormGroup.labelId,
    errorMessageId = _useFormGroup.errorMessageId;
  if (!onFieldChange) {
    throw new Error("\n      <FormControl> must be inside a component decorated with <Form>.\n      And need to update React to 16.6.0 +.\n    ");
  }
  useRegisterModel(name, rule);
  useWillUnmount(function () {
    if (shouldResetWithUnmount) {
      removeFieldValue === null || removeFieldValue === void 0 || removeFieldValue(name);
      removeFieldError === null || removeFieldError === void 0 || removeFieldError(name);
    }
  });
  var trigger = checkTrigger || contextCheckTrigger;
  var formValue = useContext(FormValueContext);
  var _useField = useField({
      name: name,
      errorMessage: errorMessage,
      formValue: formValue,
      formError: formError,
      value: value,
      nestedField: nestedField,
      errorFromContext: errorFromContext
    }),
    fieldValue = _useField.fieldValue,
    fieldError = _useField.fieldError,
    setFieldValue = _useField.setFieldValue;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = withClassPrefix('wrapper');
  var handleFieldChange = useEventCallback(function (value, event) {
    if (trigger === 'change') {
      handleFieldCheck(value);
    }
    onFieldChange === null || onFieldChange === void 0 || onFieldChange(name, value, event);
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleFieldBlur = useEventCallback(function (event) {
    if (trigger === 'blur') {
      handleFieldCheck(fieldValue);
    }
    onBlur === null || onBlur === void 0 || onBlur(event);
  });
  var handleFieldCheck = useEventCallback(function (value) {
    var nextFormValue = setFieldValue(name, value);
    if (checkAsync) {
      checkFieldAsyncForNextValue(name, nextFormValue);
    } else {
      checkFieldForNextValue(name, nextFormValue);
    }
  });
  var fieldHasError = Boolean(fieldError);

  // Toggle component is a special case that uses `checked` and `defaultChecked` instead of `value` and `defaultValue` props.
  var valueKey = AccepterComponent === Toggle ? 'checked' : 'value';
  var accepterProps = (_accepterProps = {}, _accepterProps[valueKey] = fieldValue === undefined ? defaultValue : fieldValue, _accepterProps);
  return /*#__PURE__*/React.createElement(Component, {
    className: classes,
    ref: ref,
    "data-testid": "form-control-wrapper"
  }, /*#__PURE__*/React.createElement(AccepterComponent, _extends({
    id: controlId,
    "aria-labelledby": labelId,
    "aria-describedby": helpTextId,
    "aria-invalid": fieldHasError || undefined,
    "aria-errormessage": fieldHasError ? errorMessageId : undefined
  }, accepterProps, rest, {
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled,
    name: name,
    onChange: handleFieldChange,
    onBlur: handleFieldBlur
  })), /*#__PURE__*/React.createElement(FormErrorMessage, {
    id: errorMessageId,
    role: "alert",
    "aria-relevant": "all",
    show: fieldHasError,
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["message-wrapper"]))),
    placement: errorPlacement
  }, fieldError));
});
FormControl.displayName = 'FormControl';
FormControl.propTypes = {
  name: PropTypes.string.isRequired,
  checkTrigger: oneOf(['change', 'blur', 'none']),
  checkAsync: PropTypes.bool,
  accepter: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  classPrefix: PropTypes.string,
  errorMessage: PropTypes.node,
  errorPlacement: oneOf(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd']),
  value: PropTypes.any
};
export default FormControl;