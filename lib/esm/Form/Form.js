'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["checkTrigger", "classPrefix", "errorFromContext", "formDefaultValue", "formValue", "formError", "fluid", "nestedField", "layout", "model", "readOnly", "plaintext", "className", "children", "disabled", "onSubmit", "onReset", "onCheck", "onError", "onChange"];
import React from 'react';
import PropTypes from 'prop-types';
import { SchemaModel } from 'schema-typed';
import FormControl from "../FormControl/index.js";
import FormControlLabel from "../FormControlLabel/index.js";
import FormErrorMessage from "../FormErrorMessage/index.js";
import FormGroup from "../FormGroup/index.js";
import FormHelpText from "../FormHelpText/index.js";
import { useEventCallback } from "../internals/hooks/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { FormValueProvider, FormProvider } from "./FormContext.js";
import { useCustom } from "../CustomProvider/index.js";
import useSchemaModel from "./hooks/useSchemaModel.js";
import useFormValidate from "./hooks/useFormValidate.js";
import useFormValue from "./hooks/useFormValue.js";
import useFormClassNames from "./hooks/useFormClassNames.js";
import useFormRef from "./hooks/useFormRef.js";
var defaultSchema = SchemaModel({});

/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
var Form = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Form', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$ch = propsWithDefaults.checkTrigger,
    checkTrigger = _propsWithDefaults$ch === void 0 ? 'change' : _propsWithDefaults$ch,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form' : _propsWithDefaults$cl,
    _propsWithDefaults$er = propsWithDefaults.errorFromContext,
    errorFromContext = _propsWithDefaults$er === void 0 ? true : _propsWithDefaults$er,
    _propsWithDefaults$fo = propsWithDefaults.formDefaultValue,
    formDefaultValue = _propsWithDefaults$fo === void 0 ? {} : _propsWithDefaults$fo,
    controlledFormValue = propsWithDefaults.formValue,
    controlledFormError = propsWithDefaults.formError,
    fluid = propsWithDefaults.fluid,
    _propsWithDefaults$ne = propsWithDefaults.nestedField,
    nestedField = _propsWithDefaults$ne === void 0 ? false : _propsWithDefaults$ne,
    _propsWithDefaults$la = propsWithDefaults.layout,
    layout = _propsWithDefaults$la === void 0 ? 'vertical' : _propsWithDefaults$la,
    _propsWithDefaults$mo = propsWithDefaults.model,
    formModel = _propsWithDefaults$mo === void 0 ? defaultSchema : _propsWithDefaults$mo,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    disabled = propsWithDefaults.disabled,
    onSubmit = propsWithDefaults.onSubmit,
    onReset = propsWithDefaults.onReset,
    onCheck = propsWithDefaults.onCheck,
    onError = propsWithDefaults.onError,
    onChange = propsWithDefaults.onChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useSchemaModel = useSchemaModel(formModel, nestedField),
    getCombinedModel = _useSchemaModel.getCombinedModel,
    pushFieldRule = _useSchemaModel.pushFieldRule,
    removeFieldRule = _useSchemaModel.removeFieldRule;
  var _useFormValue = useFormValue(controlledFormValue, {
      formDefaultValue: formDefaultValue,
      nestedField: nestedField
    }),
    formValue = _useFormValue.formValue,
    onRemoveValue = _useFormValue.onRemoveValue,
    setFieldValue = _useFormValue.setFieldValue,
    resetFormValue = _useFormValue.resetFormValue;
  var formValidateProps = {
    formValue: formValue,
    getCombinedModel: getCombinedModel,
    onCheck: onCheck,
    onError: onError,
    nestedField: nestedField
  };
  var _useFormValidate = useFormValidate(controlledFormError, formValidateProps),
    formError = _useFormValidate.formError,
    onRemoveError = _useFormValidate.onRemoveError,
    check = _useFormValidate.check,
    checkAsync = _useFormValidate.checkAsync,
    checkForField = _useFormValidate.checkForField,
    checkFieldForNextValue = _useFormValidate.checkFieldForNextValue,
    checkForFieldAsync = _useFormValidate.checkForFieldAsync,
    checkFieldAsyncForNextValue = _useFormValidate.checkFieldAsyncForNextValue,
    cleanErrors = _useFormValidate.cleanErrors,
    resetErrors = _useFormValidate.resetErrors,
    cleanErrorForField = _useFormValidate.cleanErrorForField;
  var classes = useFormClassNames({
    classPrefix: classPrefix,
    className: className,
    fluid: fluid,
    layout: layout,
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled
  });
  var submit = useEventCallback(function (event) {
    // Check the form before submitting
    if (check()) {
      onSubmit === null || onSubmit === void 0 || onSubmit(formValue, event);
    }
  });
  var reset = useEventCallback(function (event) {
    resetErrors();
    onReset === null || onReset === void 0 || onReset(resetFormValue(), event);
  });
  var handleSubmit = useEventCallback(function (event) {
    var _event$preventDefault, _event$stopPropagatio;
    event === null || event === void 0 || (_event$preventDefault = event.preventDefault) === null || _event$preventDefault === void 0 || _event$preventDefault.call(event);
    event === null || event === void 0 || (_event$stopPropagatio = event.stopPropagation) === null || _event$stopPropagatio === void 0 || _event$stopPropagatio.call(event);

    // Prevent submission when the form is disabled, readOnly, or plaintext
    if (disabled || readOnly || plaintext) {
      return;
    }
    submit(event);
  });
  var handleReset = useEventCallback(function (event) {
    var _event$preventDefault2, _event$stopPropagatio2;
    event === null || event === void 0 || (_event$preventDefault2 = event.preventDefault) === null || _event$preventDefault2 === void 0 || _event$preventDefault2.call(event);
    event === null || event === void 0 || (_event$stopPropagatio2 = event.stopPropagation) === null || _event$stopPropagatio2 === void 0 || _event$stopPropagatio2.call(event);

    // Prevent reset when the form is disabled, readOnly, or plaintext
    if (disabled || readOnly || plaintext) {
      return;
    }
    reset(event);
  });
  var imperativeMethods = {
    check: check,
    checkForField: checkForField,
    checkAsync: checkAsync,
    checkForFieldAsync: checkForFieldAsync,
    cleanErrors: cleanErrors,
    cleanErrorForField: cleanErrorForField,
    reset: reset,
    resetErrors: resetErrors,
    submit: submit
  };
  var formRef = useFormRef(ref, {
    imperativeMethods: imperativeMethods
  });
  var removeFieldValue = useEventCallback(function (name) {
    var formValue = onRemoveValue(name);
    onChange === null || onChange === void 0 || onChange(formValue);
  });
  var removeFieldError = useEventCallback(function (name) {
    onRemoveError(name);
  });
  var onFieldChange = useEventCallback(function (name, value, event) {
    var nextFormValue = setFieldValue(name, value);
    onChange === null || onChange === void 0 || onChange(nextFormValue, event);
  });
  var formContextValue = {
    errorFromContext: errorFromContext,
    checkTrigger: checkTrigger,
    plaintext: plaintext,
    readOnly: readOnly,
    disabled: disabled,
    formError: formError,
    nestedField: nestedField,
    pushFieldRule: pushFieldRule,
    removeFieldValue: removeFieldValue,
    removeFieldError: removeFieldError,
    removeFieldRule: removeFieldRule,
    onFieldChange: onFieldChange,
    checkFieldForNextValue: checkFieldForNextValue,
    checkFieldAsyncForNextValue: checkFieldAsyncForNextValue
  };
  return /*#__PURE__*/React.createElement("form", _extends({}, rest, {
    ref: formRef,
    onSubmit: handleSubmit,
    onReset: handleReset,
    className: classes
  }), /*#__PURE__*/React.createElement(FormProvider, {
    value: formContextValue
  }, /*#__PURE__*/React.createElement(FormValueProvider, {
    value: formValue
  }, children)));
});
Form.Control = FormControl;
Form.ControlLabel = FormControlLabel;
Form.ErrorMessage = FormErrorMessage;
Form.Group = FormGroup;
Form.HelpText = FormHelpText;
Form.displayName = 'Form';
Form.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  children: PropTypes.node,
  errorFromContext: PropTypes.bool,
  layout: oneOf(['horizontal', 'vertical', 'inline']),
  fluid: PropTypes.bool,
  formValue: PropTypes.object,
  formDefaultValue: PropTypes.object,
  formError: PropTypes.object,
  checkTrigger: oneOf(['change', 'blur', 'none']),
  onChange: PropTypes.func,
  onError: PropTypes.func,
  onCheck: PropTypes.func,
  onSubmit: PropTypes.func,
  model: PropTypes.any,
  readOnly: PropTypes.bool,
  plaintext: PropTypes.bool,
  disabled: PropTypes.bool
};
export default Form;