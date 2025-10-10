'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _date = require("../../internals/utils/date");
var _Input = _interopRequireDefault(require("../../Input"));
var _DateInput = _interopRequireDefault(require("../../DateInput"));
var _DateRangeInput = _interopRequireDefault(require("../../DateRangeInput"));
function useCustomizedInput(props) {
  var value = props.value,
    formatStr = props.formatStr,
    readOnly = props.readOnly,
    editable = props.editable,
    loading = props.loading,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? 'date' : _props$mode,
    renderValue = props.renderValue;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var onActive = (0, _react.useCallback)(function () {
    return setActive(true);
  }, []);
  var onInactive = (0, _react.useCallback)(function () {
    return setActive(false);
  }, []);

  // Custom rendering of the selected value
  var customValue = null;

  // Input box is read-only when the component is uneditable or loading state
  var inputReadOnly = readOnly || !editable || loading || false;

  // If the component is not active or editable, the custom rendering value is displayed
  var customized = !active || !editable;
  if (typeof renderValue === 'function' && value && customized) {
    if (Array.isArray(value) ? value.every(_date.isValid) : (0, _date.isValid)(value)) {
      customValue = renderValue(value, formatStr);

      // If the custom rendering value, the input box is read-only
      inputReadOnly = true;
    }
  }
  var TargetInput = mode === 'dateRange' ? _DateRangeInput.default : _DateInput.default;
  var CustomizedInput = customValue ? _Input.default : TargetInput;
  return {
    customValue: customValue,
    Input: CustomizedInput,
    inputReadOnly: inputReadOnly,
    events: {
      onActive: onActive,
      onInactive: onInactive
    }
  };
}
var _default = exports.default = useCustomizedInput;