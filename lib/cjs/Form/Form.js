'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _schemaTyped = require("schema-typed");
var _FormControl = _interopRequireDefault(require("../FormControl"));
var _FormControlLabel = _interopRequireDefault(require("../FormControlLabel"));
var _FormErrorMessage = _interopRequireDefault(require("../FormErrorMessage"));
var _FormGroup = _interopRequireDefault(require("../FormGroup"));
var _FormHelpText = _interopRequireDefault(require("../FormHelpText"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _FormContext = require("./FormContext");
var _CustomProvider = require("../CustomProvider");
var _useSchemaModel2 = _interopRequireDefault(require("./hooks/useSchemaModel"));
var _useFormValidate2 = _interopRequireDefault(require("./hooks/useFormValidate"));
var _useFormValue2 = _interopRequireDefault(require("./hooks/useFormValue"));
var _useFormClassNames = _interopRequireDefault(require("./hooks/useFormClassNames"));
var _useFormRef = _interopRequireDefault(require("./hooks/useFormRef"));
var _excluded = ["checkTrigger", "classPrefix", "errorFromContext", "formDefaultValue", "formValue", "formError", "fluid", "nestedField", "layout", "model", "readOnly", "plaintext", "className", "children", "disabled", "onSubmit", "onReset", "onCheck", "onError", "onChange"];
var defaultSchema = (0, _schemaTyped.SchemaModel)({});

/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
var Form = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Form', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useSchemaModel = (0, _useSchemaModel2.default)(formModel, nestedField),
    getCombinedModel = _useSchemaModel.getCombinedModel,
    pushFieldRule = _useSchemaModel.pushFieldRule,
    removeFieldRule = _useSchemaModel.removeFieldRule;
  var _useFormValue = (0, _useFormValue2.default)(controlledFormValue, {
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
  var _useFormValidate = (0, _useFormValidate2.default)(controlledFormError, formValidateProps),
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
  var classes = (0, _useFormClassNames.default)({
    classPrefix: classPrefix,
    className: className,
    fluid: fluid,
    layout: layout,
    readOnly: readOnly,
    plaintext: plaintext,
    disabled: disabled
  });
  var submit = (0, _hooks.useEventCallback)(function (event) {
    // Check the form before submitting
    if (check()) {
      onSubmit === null || onSubmit === void 0 || onSubmit(formValue, event);
    }
  });
  var reset = (0, _hooks.useEventCallback)(function (event) {
    resetErrors();
    onReset === null || onReset === void 0 || onReset(resetFormValue(), event);
  });
  var handleSubmit = (0, _hooks.useEventCallback)(function (event) {
    var _event$preventDefault, _event$stopPropagatio;
    event === null || event === void 0 || (_event$preventDefault = event.preventDefault) === null || _event$preventDefault === void 0 || _event$preventDefault.call(event);
    event === null || event === void 0 || (_event$stopPropagatio = event.stopPropagation) === null || _event$stopPropagatio === void 0 || _event$stopPropagatio.call(event);

    // Prevent submission when the form is disabled, readOnly, or plaintext
    if (disabled || readOnly || plaintext) {
      return;
    }
    submit(event);
  });
  var handleReset = (0, _hooks.useEventCallback)(function (event) {
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
  var formRef = (0, _useFormRef.default)(ref, {
    imperativeMethods: imperativeMethods
  });
  var removeFieldValue = (0, _hooks.useEventCallback)(function (name) {
    var formValue = onRemoveValue(name);
    onChange === null || onChange === void 0 || onChange(formValue);
  });
  var removeFieldError = (0, _hooks.useEventCallback)(function (name) {
    onRemoveError(name);
  });
  var onFieldChange = (0, _hooks.useEventCallback)(function (name, value, event) {
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
  return /*#__PURE__*/_react.default.createElement("form", (0, _extends2.default)({}, rest, {
    ref: formRef,
    onSubmit: handleSubmit,
    onReset: handleReset,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_FormContext.FormProvider, {
    value: formContextValue
  }, /*#__PURE__*/_react.default.createElement(_FormContext.FormValueProvider, {
    value: formValue
  }, children)));
});
Form.Control = _FormControl.default;
Form.ControlLabel = _FormControlLabel.default;
Form.ErrorMessage = _FormErrorMessage.default;
Form.Group = _FormGroup.default;
Form.HelpText = _FormHelpText.default;
Form.displayName = 'Form';
Form.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  errorFromContext: _propTypes.default.bool,
  layout: (0, _propTypes2.oneOf)(['horizontal', 'vertical', 'inline']),
  fluid: _propTypes.default.bool,
  formValue: _propTypes.default.object,
  formDefaultValue: _propTypes.default.object,
  formError: _propTypes.default.object,
  checkTrigger: (0, _propTypes2.oneOf)(['change', 'blur', 'none']),
  onChange: _propTypes.default.func,
  onError: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  model: _propTypes.default.any,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
var _default = exports.default = Form;