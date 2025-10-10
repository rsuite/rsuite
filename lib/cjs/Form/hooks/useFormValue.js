'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useFormValue;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
var _omit = _interopRequireDefault(require("lodash/omit"));
var _set = _interopRequireDefault(require("lodash/set"));
var _hooks = require("../../internals/hooks");
function useFormValue(controlledValue, props) {
  var formDefaultValue = props.formDefaultValue,
    nestedField = props.nestedField;
  var _useControlled = (0, _hooks.useControlled)(controlledValue, formDefaultValue),
    formValue = _useControlled[0],
    setFormValue = _useControlled[1];
  var realFormValueRef = (0, _react.useRef)(formValue);
  realFormValueRef.current = formValue;
  var setFieldValue = (0, _react.useCallback)(function (fieldName, fieldValue) {
    var _extends2;
    var nextFormError = nestedField ? (0, _set.default)((0, _extends3.default)({}, formValue), fieldName, fieldValue) : (0, _extends3.default)({}, formValue, (_extends2 = {}, _extends2[fieldName] = fieldValue, _extends2));
    setFormValue(nextFormError);
    return nextFormError;
  }, [formValue, nestedField, setFormValue]);
  var onRemoveValue = (0, _react.useCallback)(function (name) {
    /**
     * when this function is called when the children component is unmount,
     * it's an old render frame so use Ref to get future value
     */
    var formValue = (0, _omit.default)(realFormValueRef.current, [name]);
    realFormValueRef.current = formValue;
    setFormValue(formValue);
    return formValue;
  }, [setFormValue]);
  var resetFormValue = (0, _react.useCallback)(function (nextValue) {
    var value = nextValue || formDefaultValue;
    setFormValue(value);
    return value;
  }, [formDefaultValue, setFormValue]);
  return {
    formValue: formValue,
    setFormValue: setFormValue,
    setFieldValue: setFieldValue,
    onRemoveValue: onRemoveValue,
    resetFormValue: resetFormValue
  };
}