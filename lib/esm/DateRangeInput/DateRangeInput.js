'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "classPrefix", "character", "format", "value", "defaultValue", "placeholder", "onChange", "onKeyDown", "onBlur", "onFocus", "onPaste"];
import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from "../Input/index.js";
import { isValid } from "../internals/utils/date/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { validateDateTime, useDateInputState, useInputSelection, useKeyboardInputEvent, useIsFocused, useSelectedState, useFieldCursor } from "../DateInput/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { getInputSelectedState, DateType, getDateType, isSwitchDateType } from "./utils.js";
/**
 * The DateRangeInput component lets users select a date with the keyboard.
 * @version 5.59.0
 * @see https://rsuitejs.com/components/date-range-input/
 */
var DateRangeInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Calendar', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    parseDate = _useCustom.parseDate,
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('DateTimeFormats'),
    shortDateFormat = _getLocale.shortDateFormat,
    dateLocale = _getLocale.dateLocale;
  var className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'date-range-input' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.character,
    character = _propsWithDefaults$ch === void 0 ? ' ~ ' : _propsWithDefaults$ch,
    _propsWithDefaults$fo = propsWithDefaults.format,
    formatStr = _propsWithDefaults$fo === void 0 ? shortDateFormat : _propsWithDefaults$fo,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? [] : _propsWithDefaults$de,
    placeholder = propsWithDefaults.placeholder,
    onChange = propsWithDefaults.onChange,
    onKeyDown = propsWithDefaults.onKeyDown,
    onBlur = propsWithDefaults.onBlur,
    onFocus = propsWithDefaults.onFocus,
    onPaste = propsWithDefaults.onPaste,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var inputRef = useRef();
  var _useSelectedState = useSelectedState(),
    selectedState = _useSelectedState.selectedState,
    setSelectedState = _useSelectedState.setSelectedState;
  var rangeFormatStr = "" + formatStr + character + formatStr;
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useState = useState(DateType.Start),
    dateType = _useState[0],
    setDateType = _useState[1];
  var dateInputOptions = {
    formatStr: formatStr,
    locale: dateLocale,
    isControlledDate: isControlled
  };
  var startDateState = useDateInputState(_extends({}, dateInputOptions, {
    date: (value === null || value === void 0 ? void 0 : value[0]) || null
  }));
  var endDateState = useDateInputState(_extends({}, dateInputOptions, {
    date: (value === null || value === void 0 ? void 0 : value[1]) || null
  }));
  var _useFieldCursor = useFieldCursor(formatStr, valueProp),
    isMoveCursor = _useFieldCursor.isMoveCursor,
    isResetValue = _useFieldCursor.isResetValue,
    increment = _useFieldCursor.increment,
    reset = _useFieldCursor.reset;
  var getActiveState = function getActiveState(type) {
    if (type === void 0) {
      type = dateType;
    }
    return type === DateType.Start ? startDateState : endDateState;
  };
  var _useIsFocused = useIsFocused({
      onBlur: onBlur,
      onFocus: onFocus
    }),
    focused = _useIsFocused[0],
    focusEventProps = _useIsFocused[1];
  var renderedValue = useMemo(function () {
    var dateString = startDateState.toDateString() + character + endDateState.toDateString();
    if (!startDateState.isEmptyValue() || !endDateState.isEmptyValue()) {
      return dateString;
    }
    return !focused ? '' : dateString;
  }, [character, endDateState, focused, startDateState]);
  var keyPressOptions = {
    formatStr: formatStr,
    rangeFormatStr: rangeFormatStr,
    localize: dateLocale.localize,
    selectedMonth: getActiveState().dateField.month,
    dateString: renderedValue,
    dateType: dateType,
    character: character
  };
  var setSelectionRange = useInputSelection(inputRef);
  var handleChange = useEventCallback(function (date, event) {
    var nextValue = dateType === DateType.Start ? [date, value === null || value === void 0 ? void 0 : value[1]] : [value === null || value === void 0 ? void 0 : value[0], date];
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    setValue(nextValue);
  });
  var handleClear = useEventCallback(function (event) {
    startDateState.setNewDate(null);
    endDateState.setNewDate(null);
    setSelectionRange(0, 0);
    reset();
    setValue(null);
    onChange === null || onChange === void 0 || onChange(null, event);
  });
  var onSegmentChange = useEventCallback(function (event, nextDirection) {
    var input = event.target;
    var key = event.key;
    var direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');
    if (input.selectionEnd === null || input.selectionStart === null) {
      return;
    }
    var cursorIndex = direction === 'right' ? input.selectionEnd : input.selectionStart;
    var nextDateType = dateType;
    if (isSwitchDateType(renderedValue, character, cursorIndex, direction)) {
      nextDateType = dateType === DateType.Start ? DateType.End : DateType.Start;
      setDateType(nextDateType);
    }
    var state = getInputSelectedState(_extends({}, keyPressOptions, {
      dateType: nextDateType,
      selectedMonth: getActiveState(nextDateType).dateField.month,
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
    getActiveState().setDateOffset(state.selectedPattern, offset, function (date) {
      return handleChange(date, event);
    });
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });
  var onSegmentValueChangeWithNumericKeys = useEventCallback(function (event) {
    var input = event.target;
    var key = event.key;
    var pattern = selectedState.selectedPattern;
    var isFunctionKey = key.startsWith('F') && !isNaN(Number(key.slice(1)));
    if (isFunctionKey) {
      return;
    }
    if (!pattern) {
      return;
    }
    var field = getActiveState().getDateField(pattern);
    var value = parseInt(key, 10);
    var padValue = parseInt("" + (field.value || '') + key, 10);
    var newValue = value;

    // Check if the value entered by the user is a valid date
    if (validateDateTime(field.name, padValue) && !isResetValue()) {
      newValue = padValue;
    }
    getActiveState().setDateField(pattern, newValue, function (date) {
      return handleChange(date, event);
    });

    // The currently selected month will be retained as a parameter of getInputSelectedState,
    // but if the user enters a month, the month value will be replaced with the value entered by the user.
    var selectedMonth = pattern === 'M' ? newValue : getActiveState().dateField.month;
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
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else if (selectedState.selectedPattern) {
      var nextState = getInputSelectedState(_extends({}, keyPressOptions, {
        input: input,
        valueOffset: null
      }));
      setSelectedState(nextState);
      setSelectionRange(nextState.selectionStart, nextState.selectionEnd);
      getActiveState().setDateField(selectedState.selectedPattern, null, function (date) {
        return handleChange(date, event);
      });
      reset();
    }
  });
  var handleClick = useEventCallback(function (event) {
    var input = event.target;
    if (input.selectionStart === null) {
      return;
    }
    var cursorIndex = input.selectionStart === renderedValue.length ? 0 : input.selectionStart;
    var dateType = getDateType(renderedValue || rangeFormatStr, character, cursorIndex);
    var state = getInputSelectedState(_extends({}, keyPressOptions, {
      dateType: dateType,
      selectedMonth: getActiveState(dateType).dateField.month,
      input: input
    }));
    setDateType(dateType);
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
    var _ref = pasteText.split(character).map(function (date) {
        return parseDate(date, formatStr);
      }),
      start = _ref[0],
      end = _ref[1];
    if (isValid(start) && isValid(end)) {
      var nextValue = [start, end];
      onChange === null || onChange === void 0 || onChange(nextValue, event);
      setValue(nextValue);
      startDateState.setNewDate(start);
      endDateState.setNewDate(end);
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
  return /*#__PURE__*/React.createElement(Input, _extends({
    inputMode: focused ? 'numeric' : 'text',
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    className: classes,
    ref: mergeRefs(inputRef, ref),
    onKeyDown: onKeyboardInput,
    onClick: handleClick,
    onPaste: handlePaste,
    value: renderedValue,
    placeholder: placeholder || rangeFormatStr
  }, focusEventProps, rest));
});
DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.propTypes = {
  character: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  format: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};
export default DateRangeInput;