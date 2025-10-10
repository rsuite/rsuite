'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import { isValidElement, useCallback, useMemo } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import { nameToPath } from "../utils.js";
function getErrorMessage(error) {
  var _error$array;
  if (typeof error === 'string') {
    return error;
  }

  /**
   * When using some components as the field, such as TagInput, and using `ArrayType().of` as the validation rule,
   * the error object won't contain the errorMessage directly. @see https://github.com/rsuite/rsuite/issues/3866
   */
  if (error !== null && error !== void 0 && error.array && ((_error$array = error.array) === null || _error$array === void 0 ? void 0 : _error$array.length) > 0) {
    var _error$array$find;
    return (_error$array$find = error.array.find(function (item) {
      return item.hasError;
    })) === null || _error$array$find === void 0 ? void 0 : _error$array$find.errorMessage;
  }
  if (/*#__PURE__*/isValidElement(error)) {
    return error;
  }
  return error === null || error === void 0 ? void 0 : error.errorMessage;
}
function useField(props) {
  var name = props.name,
    formValue = props.formValue,
    formError = props.formError,
    value = props.value,
    nestedField = props.nestedField,
    errorMessage = props.errorMessage,
    errorFromContext = props.errorFromContext;
  var fieldValue = useMemo(function () {
    if (typeof value !== 'undefined') {
      return value;
    }
    return nestedField ? get(formValue, name) : formValue === null || formValue === void 0 ? void 0 : formValue[name];
  }, [formValue, name, nestedField, value]);
  var fieldError = useMemo(function () {
    if (typeof errorMessage !== 'undefined' || !errorFromContext) {
      return errorMessage;
    }
    if (nestedField) {
      return getErrorMessage(get(formError, nameToPath(name)));
    }
    var fieldError = formError === null || formError === void 0 ? void 0 : formError[name];
    if (typeof fieldError === 'string') {
      return fieldError;
    }
    return getErrorMessage(fieldError);
  }, [errorFromContext, errorMessage, formError, name, nestedField]);
  var setFieldValue = useCallback(function (fieldName, fieldValue) {
    var _extends2;
    if (nestedField) {
      return set(_extends({}, formValue), fieldName, fieldValue);
    }
    return _extends({}, formValue, (_extends2 = {}, _extends2[fieldName] = fieldValue, _extends2));
  }, [formValue, nestedField]);
  return {
    fieldValue: fieldValue,
    fieldError: fieldError,
    setFieldValue: setFieldValue
  };
}
export default useField;