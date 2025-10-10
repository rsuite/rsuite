'use client';
import { useState, useCallback } from 'react';
import { isValid } from "../../internals/utils/date/index.js";
import Input from "../../Input/index.js";
import DateInput from "../../DateInput/index.js";
import DateRangeInput from "../../DateRangeInput/index.js";
function useCustomizedInput(props) {
  var value = props.value,
    formatStr = props.formatStr,
    readOnly = props.readOnly,
    editable = props.editable,
    loading = props.loading,
    _props$mode = props.mode,
    mode = _props$mode === void 0 ? 'date' : _props$mode,
    renderValue = props.renderValue;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var onActive = useCallback(function () {
    return setActive(true);
  }, []);
  var onInactive = useCallback(function () {
    return setActive(false);
  }, []);

  // Custom rendering of the selected value
  var customValue = null;

  // Input box is read-only when the component is uneditable or loading state
  var inputReadOnly = readOnly || !editable || loading || false;

  // If the component is not active or editable, the custom rendering value is displayed
  var customized = !active || !editable;
  if (typeof renderValue === 'function' && value && customized) {
    if (Array.isArray(value) ? value.every(isValid) : isValid(value)) {
      customValue = renderValue(value, formatStr);

      // If the custom rendering value, the input box is read-only
      inputReadOnly = true;
    }
  }
  var TargetInput = mode === 'dateRange' ? DateRangeInput : DateInput;
  var CustomizedInput = customValue ? Input : TargetInput;
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
export default useCustomizedInput;