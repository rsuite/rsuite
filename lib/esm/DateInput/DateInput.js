'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["format", "value", "defaultValue", "placeholder", "onChange", "onKeyDown", "onBlur", "onFocus", "onPaste"];
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from "../Input/index.js";
import { useControlled, useEventCallback } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { isValid } from "../internals/utils/date/index.js";
import { getInputSelectedState, validateDateTime, useInputSelection } from "./utils.js";
import { useCustom } from "../CustomProvider/index.js";
import useDateInputState from "./hooks/useDateInputState.js";
import useKeyboardInputEvent from "./hooks/useKeyboardInputEvent.js";
import useIsFocused from "./hooks/useIsFocused.js";
import useFieldCursor from "./hooks/useFieldCursor.js";
import useSelectedState from "./hooks/useSelectedState.js";
/**
 * The DateInput component lets users select a date with the keyboard.
 * @version 5.58.0
 * @see https://rsuitejs.com/components/date-input/
 */
var DateInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('DateInput', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    parseDate = _useCustom.parseDate,
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('DateTimeFormats'),
    dateLocale = _getLocale.dateLocale,
    shortDateFormat = _getLocale.shortDateFormat;
  var _propsWithDefaults$fo = propsWithDefaults.format,
    formatStr = _propsWithDefaults$fo === void 0 ? shortDateFormat : _propsWithDefaults$fo,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    placeholder = propsWithDefaults.placeholder,
    onChange = propsWithDefaults.onChange,
    onKeyDown = propsWithDefaults.onKeyDown,
    onBlur = propsWithDefaults.onBlur,
    onFocus = propsWithDefaults.onFocus,
    onPaste = propsWithDefaults.onPaste,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var inputRef = useRef();
  var _useSelectedState = useSelectedState(),
    selectedState = _useSelectedState.selectedState,
    setSelectedState = _useSelectedState.setSelectedState;
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useDateInputState = useDateInputState({
      formatStr: formatStr,
      locale: dateLocale,
      date: value,
      isControlledDate: isControlled
    }),
    dateField = _useDateInputState.dateField,
    setDateOffset = _useDateInputState.setDateOffset,
    setDateField = _useDateInputState.setDateField,
    setNewDate = _useDateInputState.setNewDate,
    getDateField = _useDateInputState.getDateField,
    toDateString = _useDateInputState.toDateString,
    isEmptyValue = _useDateInputState.isEmptyValue;
  var _useFieldCursor = useFieldCursor(formatStr, valueProp),
    isMoveCursor = _useFieldCursor.isMoveCursor,
    isResetValue = _useFieldCursor.isResetValue,
    increment = _useFieldCursor.increment,
    reset = _useFieldCursor.reset;
  var dateString = toDateString();
  var keyPressOptions = useMemo(function () {
    return {
      formatStr: formatStr,
      localize: dateLocale.localize,
      selectedMonth: dateField.month,
      dateString: dateString
    };
  }, [dateField, dateString, formatStr, dateLocale]);
  var setSelectionRange = useInputSelection(inputRef);
  var handleChange = useEventCallback(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
    setValue(value);
  });
  var handleClear = useEventCallback(function (event) {
    handleChange(null, event);
    setNewDate(null);
    setSelectionRange(0, 0);
    reset();
  });
  var onSegmentChange = useEventCallback(function (event, nextDirection) {
    var input = event.target;
    var key = event.key;
    var direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');
    var state = getInputSelectedState(_extends({}, keyPressOptions, {
      input: input,
      direction: direction
    }));
    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);

    // If the selected field changes, reset the input state
    if (selectedState.selectedPattern !== state.selectedPattern) {
      reset();
    }
  });
  var onSegmentValueChange = useEventCallback(function (event) {
    var input = event.target;
    var key = event.key;
    var offset = key === 'ArrowUp' ? 1 : -1;
    var state = getInputSelectedState(_extends({}, keyPressOptions, {
      input: input,
      valueOffset: offset
    }));
    setSelectedState(state);
    setDateOffset(state.selectedPattern, offset, function (date) {
      return handleChange(date, event);
    });
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });
  var onSegmentValueChangeWithNumericKeys = useEventCallback(function (event) {
    var input = event.target;
    var key = event.key;
    var isFunctionKey = key.startsWith('F') && !isNaN(Number(key.slice(1)));
    if (isFunctionKey) {
      return;
    }
    var pattern = selectedState.selectedPattern;
    if (!pattern) {
      return;
    }
    var field = getDateField(pattern);
    var value = parseInt(key, 10);
    var padValue = parseInt("" + (field.value || '') + key, 10);
    var newValue = value;
    if (validateDateTime(field.name, padValue) && !isResetValue()) {
      // Check if the value entered by the user is a valid date
      newValue = padValue;
    }
    setDateField(pattern, newValue, function (date) {
      return handleChange(date, event);
    });

    // The currently selected month will be retained as a parameter of getInputSelectedState,
    // but if the user enters a month, the month value will be replaced with the value entered by the user.
    var selectedMonth = pattern === 'M' ? newValue : dateField.month;
    var nextState = getInputSelectedState(_extends({}, keyPressOptions, {
      input: input,
      selectedMonth: selectedMonth
    }));
    setSelectedState(nextState);
    setSelectionRange(nextState.selectionStart, nextState.selectionEnd);
    increment();

    // If the field is full value, move the cursor to the next field
    if (isMoveCursor(newValue, pattern) && input.selectionEnd !== input.value.length) {
      onSegmentChange(event, 'right');
    }
  });
  var onSegmentValueRemove = useEventCallback(function (event) {
    var input = event.target;
    var value = input.value;

    // If the text is all selected, clear the value
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else if (selectedState.selectedPattern) {
      var nextState = getInputSelectedState(_extends({}, keyPressOptions, {
        input: input,
        valueOffset: null
      }));
      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);
      setDateField(selectedState.selectedPattern, null, function (date) {
        return handleChange(date, event);
      });
      reset();
    }
  });
  var handleClick = useEventCallback(function (event) {
    var input = event.target;
    var state = getInputSelectedState(_extends({}, keyPressOptions, {
      input: input
    }));
    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);
    if (selectedState.selectedPattern !== state.selectedPattern) {
      reset();
    }
  });
  var handlePaste = useEventCallback(function (event) {
    var _event$clipboardData;
    event.preventDefault();
    var pasteText = (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.getData('text');
    var nextDate = parseDate(pasteText, formatStr);
    if (isValid(nextDate)) {
      handleChange(nextDate, event);
      setNewDate(nextDate);
    }
    onPaste === null || onPaste === void 0 || onPaste(event);
  });
  var onKeyboardInput = useKeyboardInputEvent({
    onSegmentChange: onSegmentChange,
    onSegmentValueChange: onSegmentValueChange,
    onSegmentValueChangeWithNumericKeys: onSegmentValueChangeWithNumericKeys,
    onSegmentValueRemove: onSegmentValueRemove,
    onKeyDown: onKeyDown
  });
  var _useIsFocused = useIsFocused({
      onBlur: onBlur,
      onFocus: onFocus
    }),
    focused = _useIsFocused[0],
    focusEventProps = _useIsFocused[1];
  var renderedValue = useMemo(function () {
    if (!isEmptyValue()) {
      return dateString;
    }
    return !focused ? '' : dateString;
  }, [dateString, focused, isEmptyValue]);
  return /*#__PURE__*/React.createElement(Input, _extends({
    inputMode: focused ? 'numeric' : 'text',
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    ref: mergeRefs(inputRef, ref),
    onKeyDown: onKeyboardInput,
    onClick: handleClick,
    onPaste: handlePaste,
    value: renderedValue,
    placeholder: placeholder || formatStr
  }, focusEventProps, rest));
});
DateInput.displayName = 'DateInput';
DateInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  format: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};
export default DateInput;