'use client';
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { useRef, useCallback } from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import { useControlled, useEventCallback } from "../../internals/hooks/index.js";
import { nameToPath } from "../../FormControl/utils.js";
export default function useFormValidate(_formError, props) {
  var formValue = props.formValue,
    getCombinedModel = props.getCombinedModel,
    onCheck = props.onCheck,
    onError = props.onError,
    nestedField = props.nestedField;
  var _useControlled = useControlled(_formError, {}),
    realFormError = _useControlled[0],
    setFormError = _useControlled[1];
  var checkOptions = {
    nestedObject: nestedField
  };
  var realFormErrorRef = useRef(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  var check = useEventCallback(function (callback) {
    var formError = {};
    var errorCount = 0;
    var model = getCombinedModel();
    var _checkField = function checkField(key, type, value, formErrorObj) {
      model.setSchemaOptionsForAllType(formValue || {});
      var checkResult = type.check(value, formValue, key);
      if (checkResult.hasError === true) {
        errorCount += 1;
        formErrorObj[key] = (checkResult === null || checkResult === void 0 ? void 0 : checkResult.errorMessage) || checkResult;
      }

      // Check nested object
      if (type !== null && type !== void 0 && type.objectTypeSchemaSpec) {
        Object.entries(type.objectTypeSchemaSpec).forEach(function (_ref) {
          var nestedKey = _ref[0],
            nestedType = _ref[1];
          formErrorObj[key] = formErrorObj[key] || {
            object: {}
          };
          _checkField(nestedKey, nestedType, value === null || value === void 0 ? void 0 : value[nestedKey], formErrorObj[key].object);
        });
      }
    };
    Object.entries(model.getSchemaSpec()).forEach(function (_ref2) {
      var key = _ref2[0],
        type = _ref2[1];
      _checkField(key, type, formValue[key], formError);
    });
    setFormError(formError);
    onCheck === null || onCheck === void 0 || onCheck(formError);
    callback === null || callback === void 0 || callback(formError);
    if (errorCount > 0) {
      onError === null || onError === void 0 || onError(formError);
      return false;
    }
    return true;
  });
  var checkFieldForNextValue = useEventCallback(function (fieldName, nextValue, callback) {
    var model = getCombinedModel();
    var resultOfCurrentField = model.checkForField(fieldName, nextValue, checkOptions);
    var nextFormError = _extends({}, realFormError);
    /**
     * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
     * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
     * so nestedField does not support proxy here
     */
    if (nestedField) {
      nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
      setFormError(nextFormError);
      onCheck === null || onCheck === void 0 || onCheck(nextFormError);
      callback === null || callback === void 0 || callback(resultOfCurrentField);
      if (resultOfCurrentField.hasError) {
        onError === null || onError === void 0 || onError(nextFormError);
      }
      return !resultOfCurrentField.hasError;
    } else {
      var allResults = model.getCheckResult();
      var hasError = false;
      Object.keys(allResults).forEach(function (key) {
        var currentResult = allResults[key];
        if (currentResult.hasError) {
          nextFormError[key] = currentResult.errorMessage || currentResult;
          hasError = true;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          var _nextFormError = nextFormError,
            _ = _nextFormError[key],
            rest = _objectWithoutPropertiesLoose(_nextFormError, [key].map(_toPropertyKey));
          nextFormError = rest;
        }
      });
      setFormError(nextFormError);
      onCheck === null || onCheck === void 0 || onCheck(nextFormError);
      callback === null || callback === void 0 || callback(resultOfCurrentField);
      if (hasError) {
        onError === null || onError === void 0 || onError(nextFormError);
      }
      return !hasError;
    }
  });
  /**
   * Check the data field
   * @param fieldName
   * @param callback
   */
  var checkForField = useEventCallback(function (fieldName, callback) {
    return checkFieldForNextValue(fieldName, formValue || {}, callback);
  });

  /**
   * Check form data asynchronously and return a Promise
   */
  var checkAsync = useEventCallback(function () {
    var promises = [];
    var keys = [];
    var model = getCombinedModel();
    Object.keys(model.getSchemaSpec()).forEach(function (key) {
      keys.push(key);
      promises.push(model.checkForFieldAsync(key, formValue || {}, checkOptions));
    });
    return Promise.all(promises).then(function (values) {
      var formError = {};
      var errorCount = 0;
      for (var i = 0; i < values.length; i++) {
        if (values[i].hasError) {
          errorCount += 1;
          formError[keys[i]] = values[i].errorMessage;
        }
      }
      onCheck === null || onCheck === void 0 || onCheck(formError);
      setFormError(formError);
      if (errorCount > 0) {
        onError === null || onError === void 0 || onError(formError);
      }
      return {
        hasError: errorCount > 0,
        formError: formError
      };
    });
  });
  var checkFieldAsyncForNextValue = useEventCallback(function (fieldName, nextValue) {
    var model = getCombinedModel();
    return model.checkForFieldAsync(fieldName, nextValue, checkOptions).then(function (resultOfCurrentField) {
      var nextFormError = _extends({}, realFormError);
      /**
       * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
       * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
       * so nestedField does not support proxy here
       */

      if (nestedField) {
        nextFormError = set(nextFormError, nameToPath(fieldName), resultOfCurrentField);
        onCheck === null || onCheck === void 0 || onCheck(nextFormError);
        setFormError(nextFormError);
        if (resultOfCurrentField.hasError) {
          onError === null || onError === void 0 || onError(nextFormError);
        }
        return resultOfCurrentField;
      } else {
        var allResults = model.getCheckResult();
        var hasError = false;
        Object.keys(allResults).forEach(function (key) {
          var currentResult = allResults[key];
          if (currentResult.hasError) {
            nextFormError[key] = currentResult.errorMessage || currentResult;
            hasError = true;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var _nextFormError2 = nextFormError,
              _ = _nextFormError2[key],
              rest = _objectWithoutPropertiesLoose(_nextFormError2, [key].map(_toPropertyKey));
            nextFormError = rest;
          }
        });
        setFormError(nextFormError);
        onCheck === null || onCheck === void 0 || onCheck(nextFormError);
        if (hasError) {
          onError === null || onError === void 0 || onError(nextFormError);
        }
        return resultOfCurrentField;
      }
    });
  });

  /**
   * Asynchronously check form fields and return Promise
   * @param fieldName
   */
  var checkForFieldAsync = useEventCallback(function (fieldName) {
    return checkFieldAsyncForNextValue(fieldName, formValue || {});
  });
  var onRemoveError = useCallback(function (name) {
    /**
     * when this function is called when the children component is unmount,
     * it's an old render frame so use Ref to get future error
     */
    var formError = omit(realFormErrorRef.current, [nestedField ? nameToPath(name) : name]);
    realFormErrorRef.current = formError;
    setFormError(formError);
    onCheck === null || onCheck === void 0 || onCheck(formError);
    return formError;
  }, [nestedField, onCheck, setFormError]);
  var cleanErrors = useEventCallback(function () {
    setFormError({});
  });
  var resetErrors = useEventCallback(function (formError) {
    if (formError === void 0) {
      formError = {};
    }
    setFormError(formError);
  });
  var cleanErrorForField = useEventCallback(function (fieldName) {
    setFormError(omit(realFormError, [nestedField ? nameToPath(fieldName) : fieldName]));
  });
  return {
    formError: realFormError,
    check: check,
    checkForField: checkForField,
    checkFieldForNextValue: checkFieldForNextValue,
    checkAsync: checkAsync,
    checkForFieldAsync: checkForFieldAsync,
    checkFieldAsyncForNextValue: checkFieldAsyncForNextValue,
    cleanErrors: cleanErrors,
    resetErrors: resetErrors,
    cleanErrorForField: cleanErrorForField,
    onRemoveError: onRemoveError
  };
}