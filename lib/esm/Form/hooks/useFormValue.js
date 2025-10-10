'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { useControlled } from "../../internals/hooks/index.js";
export default function useFormValue(controlledValue, props) {
  var formDefaultValue = props.formDefaultValue,
    nestedField = props.nestedField;
  var _useControlled = useControlled(controlledValue, formDefaultValue),
    formValue = _useControlled[0],
    setFormValue = _useControlled[1];
  var realFormValueRef = useRef(formValue);
  realFormValueRef.current = formValue;
  var setFieldValue = useCallback(function (fieldName, fieldValue) {
    var _extends2;
    var nextFormError = nestedField ? set(_extends({}, formValue), fieldName, fieldValue) : _extends({}, formValue, (_extends2 = {}, _extends2[fieldName] = fieldValue, _extends2));
    setFormValue(nextFormError);
    return nextFormError;
  }, [formValue, nestedField, setFormValue]);
  var onRemoveValue = useCallback(function (name) {
    /**
     * when this function is called when the children component is unmount,
     * it's an old render frame so use Ref to get future value
     */
    var formValue = omit(realFormValueRef.current, [name]);
    realFormValueRef.current = formValue;
    setFormValue(formValue);
    return formValue;
  }, [setFormValue]);
  var resetFormValue = useCallback(function (nextValue) {
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