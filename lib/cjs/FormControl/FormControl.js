'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Input = _interopRequireDefault(require("../Input"));
var _FormErrorMessage = _interopRequireDefault(require("../FormErrorMessage"));
var _FormContext = _interopRequireWildcard(require("../Form/FormContext"));
var _useRegisterModel = _interopRequireDefault(require("./hooks/useRegisterModel"));
var _useField2 = _interopRequireDefault(require("./hooks/useField"));
var _Toggle = _interopRequireDefault(require("../Toggle"));
var _hooks = require("../internals/hooks");
var _FormGroup = require("../FormGroup");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject;
var _excluded = ["as", "accepter", "classPrefix", "checkAsync", "checkTrigger", "errorPlacement", "errorMessage", "name", "value", "readOnly", "plaintext", "disabled", "onChange", "onBlur", "defaultValue", "shouldResetWithUnmount", "rule", "id"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Props that FormControl passes to its accepter
 */

/**
 * The `<Form.Control>` component is used to wrap the components that need to be validated.
 * @see https://rsuitejs.com/components/form/
 */
var FormControl = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _accepterProps;
  var _useCustom = (0, _CustomProvider.useCustom)('FormControl', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useContext = (0, _react.useContext)(_FormContext.default),
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
    AccepterComponent = _propsWithDefaults$ac === void 0 ? _Input.default : _propsWithDefaults$ac,
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useFormGroup = (0, _FormGroup.useFormGroup)(id),
    controlId = _useFormGroup.controlId,
    helpTextId = _useFormGroup.helpTextId,
    labelId = _useFormGroup.labelId,
    errorMessageId = _useFormGroup.errorMessageId;
  if (!onFieldChange) {
    throw new Error("\n      <FormControl> must be inside a component decorated with <Form>.\n      And need to update React to 16.6.0 +.\n    ");
  }
  (0, _useRegisterModel.default)(name, rule);
  (0, _hooks.useWillUnmount)(function () {
    if (shouldResetWithUnmount) {
      removeFieldValue === null || removeFieldValue === void 0 || removeFieldValue(name);
      removeFieldError === null || removeFieldError === void 0 || removeFieldError(name);
    }
  });
  var trigger = checkTrigger || contextCheckTrigger;
  var formValue = (0, _react.useContext)(_FormContext.FormValueContext);
  var _useField = (0, _useField2.default)({
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
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = withClassPrefix('wrapper');
  var handleFieldChange = (0, _hooks.useEventCallback)(function (value, event) {
    if (trigger === 'change') {
      handleFieldCheck(value);
    }
    onFieldChange === null || onFieldChange === void 0 || onFieldChange(name, value, event);
    onChange === null || onChange === void 0 || onChange(value, event);
  });
  var handleFieldBlur = (0, _hooks.useEventCallback)(function (event) {
    if (trigger === 'blur') {
      handleFieldCheck(fieldValue);
    }
    onBlur === null || onBlur === void 0 || onBlur(event);
  });
  var handleFieldCheck = (0, _hooks.useEventCallback)(function (value) {
    var nextFormValue = setFieldValue(name, value);
    if (checkAsync) {
      checkFieldAsyncForNextValue(name, nextFormValue);
    } else {
      checkFieldForNextValue(name, nextFormValue);
    }
  });
  var fieldHasError = Boolean(fieldError);

  // Toggle component is a special case that uses `checked` and `defaultChecked` instead of `value` and `defaultValue` props.
  var valueKey = AccepterComponent === _Toggle.default ? 'checked' : 'value';
  var accepterProps = (_accepterProps = {}, _accepterProps[valueKey] = fieldValue === undefined ? defaultValue : fieldValue, _accepterProps);
  return /*#__PURE__*/_react.default.createElement(Component, {
    className: classes,
    ref: ref,
    "data-testid": "form-control-wrapper"
  }, /*#__PURE__*/_react.default.createElement(AccepterComponent, (0, _extends2.default)({
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
  })), /*#__PURE__*/_react.default.createElement(_FormErrorMessage.default, {
    id: errorMessageId,
    role: "alert",
    "aria-relevant": "all",
    show: fieldHasError,
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["message-wrapper"]))),
    placement: errorPlacement
  }, fieldError));
});
FormControl.displayName = 'FormControl';
FormControl.propTypes = {
  name: _propTypes.default.string.isRequired,
  checkTrigger: (0, _propTypes2.oneOf)(['change', 'blur', 'none']),
  checkAsync: _propTypes.default.bool,
  accepter: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  classPrefix: _propTypes.default.string,
  errorMessage: _propTypes.default.node,
  errorPlacement: (0, _propTypes2.oneOf)(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd']),
  value: _propTypes.default.any
};
var _default = exports.default = FormControl;