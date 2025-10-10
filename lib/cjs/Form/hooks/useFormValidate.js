'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useFormValidate;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = require("react");
var _omit = _interopRequireDefault(require("lodash/omit"));
var _set = _interopRequireDefault(require("lodash/set"));
var _hooks = require("../../internals/hooks");
var _utils = require("../../FormControl/utils");
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function useFormValidate(_formError, props) {
  var formValue = props.formValue,
    getCombinedModel = props.getCombinedModel,
    onCheck = props.onCheck,
    onError = props.onError,
    nestedField = props.nestedField;
  var _useControlled = (0, _hooks.useControlled)(_formError, {}),
    realFormError = _useControlled[0],
    setFormError = _useControlled[1];
  var checkOptions = {
    nestedObject: nestedField
  };
  var realFormErrorRef = (0, _react.useRef)(realFormError);
  realFormErrorRef.current = realFormError;

  /**
   * Validate the form data and return a boolean.
   * The error message after verification is returned in the callback.
   * @param callback
   */
  var check = (0, _hooks.useEventCallback)(function (callback) {
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
  var checkFieldForNextValue = (0, _hooks.useEventCallback)(function (fieldName, nextValue, callback) {
    var model = getCombinedModel();
    var resultOfCurrentField = model.checkForField(fieldName, nextValue, checkOptions);
    var nextFormError = (0, _extends2.default)({}, realFormError);
    /**
     * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
     * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
     * so nestedField does not support proxy here
     */
    if (nestedField) {
      nextFormError = (0, _set.default)(nextFormError, (0, _utils.nameToPath)(fieldName), resultOfCurrentField);
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
            rest = (0, _objectWithoutPropertiesLoose2.default)(_nextFormError, [key].map(_toPropertyKey));
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
  var checkForField = (0, _hooks.useEventCallback)(function (fieldName, callback) {
    return checkFieldForNextValue(fieldName, formValue || {}, callback);
  });

  /**
   * Check form data asynchronously and return a Promise
   */
  var checkAsync = (0, _hooks.useEventCallback)(function () {
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
  var checkFieldAsyncForNextValue = (0, _hooks.useEventCallback)(function (fieldName, nextValue) {
    var model = getCombinedModel();
    return model.checkForFieldAsync(fieldName, nextValue, checkOptions).then(function (resultOfCurrentField) {
      var nextFormError = (0, _extends2.default)({}, realFormError);
      /**
       * when using proxy of schema-typed, we need to use getCheckResult to get all errors,
       * but if nestedField is used, it is impossible to distinguish whether the nested object has an error here,
       * so nestedField does not support proxy here
       */

      if (nestedField) {
        nextFormError = (0, _set.default)(nextFormError, (0, _utils.nameToPath)(fieldName), resultOfCurrentField);
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
              rest = (0, _objectWithoutPropertiesLoose2.default)(_nextFormError2, [key].map(_toPropertyKey));
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
  var checkForFieldAsync = (0, _hooks.useEventCallback)(function (fieldName) {
    return checkFieldAsyncForNextValue(fieldName, formValue || {});
  });
  var onRemoveError = (0, _react.useCallback)(function (name) {
    /**
     * when this function is called when the children component is unmount,
     * it's an old render frame so use Ref to get future error
     */
    var formError = (0, _omit.default)(realFormErrorRef.current, [nestedField ? (0, _utils.nameToPath)(name) : name]);
    realFormErrorRef.current = formError;
    setFormError(formError);
    onCheck === null || onCheck === void 0 || onCheck(formError);
    return formError;
  }, [nestedField, onCheck, setFormError]);
  var cleanErrors = (0, _hooks.useEventCallback)(function () {
    setFormError({});
  });
  var resetErrors = (0, _hooks.useEventCallback)(function (formError) {
    if (formError === void 0) {
      formError = {};
    }
    setFormError(formError);
  });
  var cleanErrorForField = (0, _hooks.useEventCallback)(function (fieldName) {
    setFormError((0, _omit.default)(realFormError, [nestedField ? (0, _utils.nameToPath)(fieldName) : fieldName]));
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