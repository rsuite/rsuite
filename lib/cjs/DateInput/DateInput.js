'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Input = _interopRequireDefault(require("../Input"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _date = require("../internals/utils/date");
var _utils2 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _useDateInputState2 = _interopRequireDefault(require("./hooks/useDateInputState"));
var _useKeyboardInputEvent = _interopRequireDefault(require("./hooks/useKeyboardInputEvent"));
var _useIsFocused2 = _interopRequireDefault(require("./hooks/useIsFocused"));
var _useFieldCursor2 = _interopRequireDefault(require("./hooks/useFieldCursor"));
var _useSelectedState2 = _interopRequireDefault(require("./hooks/useSelectedState"));
var _excluded = ["format", "value", "defaultValue", "placeholder", "onChange", "onKeyDown", "onBlur", "onFocus", "onPaste"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The DateInput component lets users select a date with the keyboard.
 * @version 5.58.0
 * @see https://rsuitejs.com/components/date-input/
 */
var DateInput = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('DateInput', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var inputRef = (0, _react.useRef)();
  var _useSelectedState = (0, _useSelectedState2.default)(),
    selectedState = _useSelectedState.selectedState,
    setSelectedState = _useSelectedState.setSelectedState;
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useDateInputState = (0, _useDateInputState2.default)({
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
  var _useFieldCursor = (0, _useFieldCursor2.default)(formatStr, valueProp),
    isMoveCursor = _useFieldCursor.isMoveCursor,
    isResetValue = _useFieldCursor.isResetValue,
    increment = _useFieldCursor.increment,
    reset = _useFieldCursor.reset;
  var dateString = toDateString();
  var keyPressOptions = (0, _react.useMemo)(function () {
    return {
      formatStr: formatStr,
      localize: dateLocale.localize,
      selectedMonth: dateField.month,
      dateString: dateString
    };
  }, [dateField, dateString, formatStr, dateLocale]);
  var setSelectionRange = (0, _utils2.useInputSelection)(inputRef);
  var handleChange = (0, _hooks.useEventCallback)(function (value, event) {
    onChange === null || onChange === void 0 || onChange(value, event);
    setValue(value);
  });
  var handleClear = (0, _hooks.useEventCallback)(function (event) {
    handleChange(null, event);
    setNewDate(null);
    setSelectionRange(0, 0);
    reset();
  });
  var onSegmentChange = (0, _hooks.useEventCallback)(function (event, nextDirection) {
    var input = event.target;
    var key = event.key;
    var direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var onSegmentValueChange = (0, _hooks.useEventCallback)(function (event) {
    var input = event.target;
    var key = event.key;
    var offset = key === 'ArrowUp' ? 1 : -1;
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
      input: input,
      valueOffset: offset
    }));
    setSelectedState(state);
    setDateOffset(state.selectedPattern, offset, function (date) {
      return handleChange(date, event);
    });
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });
  var onSegmentValueChangeWithNumericKeys = (0, _hooks.useEventCallback)(function (event) {
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
    if ((0, _utils2.validateDateTime)(field.name, padValue) && !isResetValue()) {
      // Check if the value entered by the user is a valid date
      newValue = padValue;
    }
    setDateField(pattern, newValue, function (date) {
      return handleChange(date, event);
    });

    // The currently selected month will be retained as a parameter of getInputSelectedState,
    // but if the user enters a month, the month value will be replaced with the value entered by the user.
    var selectedMonth = pattern === 'M' ? newValue : dateField.month;
    var nextState = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var onSegmentValueRemove = (0, _hooks.useEventCallback)(function (event) {
    var input = event.target;
    var value = input.value;

    // If the text is all selected, clear the value
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else if (selectedState.selectedPattern) {
      var nextState = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var handleClick = (0, _hooks.useEventCallback)(function (event) {
    var input = event.target;
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
      input: input
    }));
    setSelectedState(state);
    setSelectionRange(state.selectionStart, state.selectionEnd);
    if (selectedState.selectedPattern !== state.selectedPattern) {
      reset();
    }
  });
  var handlePaste = (0, _hooks.useEventCallback)(function (event) {
    var _event$clipboardData;
    event.preventDefault();
    var pasteText = (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.getData('text');
    var nextDate = parseDate(pasteText, formatStr);
    if ((0, _date.isValid)(nextDate)) {
      handleChange(nextDate, event);
      setNewDate(nextDate);
    }
    onPaste === null || onPaste === void 0 || onPaste(event);
  });
  var onKeyboardInput = (0, _useKeyboardInputEvent.default)({
    onSegmentChange: onSegmentChange,
    onSegmentValueChange: onSegmentValueChange,
    onSegmentValueChangeWithNumericKeys: onSegmentValueChangeWithNumericKeys,
    onSegmentValueRemove: onSegmentValueRemove,
    onKeyDown: onKeyDown
  });
  var _useIsFocused = (0, _useIsFocused2.default)({
      onBlur: onBlur,
      onFocus: onFocus
    }),
    focused = _useIsFocused[0],
    focusEventProps = _useIsFocused[1];
  var renderedValue = (0, _react.useMemo)(function () {
    if (!isEmptyValue()) {
      return dateString;
    }
    return !focused ? '' : dateString;
  }, [dateString, focused, isEmptyValue]);
  return /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({
    inputMode: focused ? 'numeric' : 'text',
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    ref: (0, _utils.mergeRefs)(inputRef, ref),
    onKeyDown: onKeyboardInput,
    onClick: handleClick,
    onPaste: handlePaste,
    value: renderedValue,
    placeholder: placeholder || formatStr
  }, focusEventProps, rest));
});
DateInput.displayName = 'DateInput';
DateInput.propTypes = {
  defaultValue: _propTypes.default.instanceOf(Date),
  format: _propTypes.default.string,
  value: _propTypes.default.instanceOf(Date),
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func
};
var _default = exports.default = DateInput;