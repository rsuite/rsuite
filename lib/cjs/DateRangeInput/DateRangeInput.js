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
var _date = require("../internals/utils/date");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _DateInput = require("../DateInput");
var _CustomProvider = require("../CustomProvider");
var _utils2 = require("./utils");
var _excluded = ["className", "classPrefix", "character", "format", "value", "defaultValue", "placeholder", "onChange", "onKeyDown", "onBlur", "onFocus", "onPaste"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The DateRangeInput component lets users select a date with the keyboard.
 * @version 5.59.0
 * @see https://rsuitejs.com/components/date-range-input/
 */
var DateRangeInput = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Calendar', props),
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  var inputRef = (0, _react.useRef)();
  var _useSelectedState = (0, _DateInput.useSelectedState)(),
    selectedState = _useSelectedState.selectedState,
    setSelectedState = _useSelectedState.setSelectedState;
  var rangeFormatStr = "" + formatStr + character + formatStr;
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var _useState = (0, _react.useState)(_utils2.DateType.Start),
    dateType = _useState[0],
    setDateType = _useState[1];
  var dateInputOptions = {
    formatStr: formatStr,
    locale: dateLocale,
    isControlledDate: isControlled
  };
  var startDateState = (0, _DateInput.useDateInputState)((0, _extends2.default)({}, dateInputOptions, {
    date: (value === null || value === void 0 ? void 0 : value[0]) || null
  }));
  var endDateState = (0, _DateInput.useDateInputState)((0, _extends2.default)({}, dateInputOptions, {
    date: (value === null || value === void 0 ? void 0 : value[1]) || null
  }));
  var _useFieldCursor = (0, _DateInput.useFieldCursor)(formatStr, valueProp),
    isMoveCursor = _useFieldCursor.isMoveCursor,
    isResetValue = _useFieldCursor.isResetValue,
    increment = _useFieldCursor.increment,
    reset = _useFieldCursor.reset;
  var getActiveState = function getActiveState(type) {
    if (type === void 0) {
      type = dateType;
    }
    return type === _utils2.DateType.Start ? startDateState : endDateState;
  };
  var _useIsFocused = (0, _DateInput.useIsFocused)({
      onBlur: onBlur,
      onFocus: onFocus
    }),
    focused = _useIsFocused[0],
    focusEventProps = _useIsFocused[1];
  var renderedValue = (0, _react.useMemo)(function () {
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
  var setSelectionRange = (0, _DateInput.useInputSelection)(inputRef);
  var handleChange = (0, _hooks.useEventCallback)(function (date, event) {
    var nextValue = dateType === _utils2.DateType.Start ? [date, value === null || value === void 0 ? void 0 : value[1]] : [value === null || value === void 0 ? void 0 : value[0], date];
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    setValue(nextValue);
  });
  var handleClear = (0, _hooks.useEventCallback)(function (event) {
    startDateState.setNewDate(null);
    endDateState.setNewDate(null);
    setSelectionRange(0, 0);
    reset();
    setValue(null);
    onChange === null || onChange === void 0 || onChange(null, event);
  });
  var onSegmentChange = (0, _hooks.useEventCallback)(function (event, nextDirection) {
    var input = event.target;
    var key = event.key;
    var direction = nextDirection || (key === 'ArrowRight' ? 'right' : 'left');
    if (input.selectionEnd === null || input.selectionStart === null) {
      return;
    }
    var cursorIndex = direction === 'right' ? input.selectionEnd : input.selectionStart;
    var nextDateType = dateType;
    if ((0, _utils2.isSwitchDateType)(renderedValue, character, cursorIndex, direction)) {
      nextDateType = dateType === _utils2.DateType.Start ? _utils2.DateType.End : _utils2.DateType.Start;
      setDateType(nextDateType);
    }
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var onSegmentValueChange = (0, _hooks.useEventCallback)(function (event) {
    var input = event.target;
    var key = event.key;
    var offset = key === 'ArrowUp' ? 1 : -1;
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
      input: input,
      valueOffset: offset
    }));
    setSelectedState(state);
    getActiveState().setDateOffset(state.selectedPattern, offset, function (date) {
      return handleChange(date, event);
    });
    setSelectionRange(state.selectionStart, state.selectionEnd);
  });
  var onSegmentValueChangeWithNumericKeys = (0, _hooks.useEventCallback)(function (event) {
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
    if ((0, _DateInput.validateDateTime)(field.name, padValue) && !isResetValue()) {
      newValue = padValue;
    }
    getActiveState().setDateField(pattern, newValue, function (date) {
      return handleChange(date, event);
    });

    // The currently selected month will be retained as a parameter of getInputSelectedState,
    // but if the user enters a month, the month value will be replaced with the value entered by the user.
    var selectedMonth = pattern === 'M' ? newValue : getActiveState().dateField.month;
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
    if (input.selectionStart === 0 && value && input.selectionEnd === value.length) {
      handleClear(event);
    } else if (selectedState.selectedPattern) {
      var nextState = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var handleClick = (0, _hooks.useEventCallback)(function (event) {
    var input = event.target;
    if (input.selectionStart === null) {
      return;
    }
    var cursorIndex = input.selectionStart === renderedValue.length ? 0 : input.selectionStart;
    var dateType = (0, _utils2.getDateType)(renderedValue || rangeFormatStr, character, cursorIndex);
    var state = (0, _utils2.getInputSelectedState)((0, _extends2.default)({}, keyPressOptions, {
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
  var handlePaste = (0, _hooks.useEventCallback)(function (event) {
    var _event$clipboardData;
    event.preventDefault();
    var pasteText = (_event$clipboardData = event.clipboardData) === null || _event$clipboardData === void 0 ? void 0 : _event$clipboardData.getData('text');
    var _ref = pasteText.split(character).map(function (date) {
        return parseDate(date, formatStr);
      }),
      start = _ref[0],
      end = _ref[1];
    if ((0, _date.isValid)(start) && (0, _date.isValid)(end)) {
      var nextValue = [start, end];
      onChange === null || onChange === void 0 || onChange(nextValue, event);
      setValue(nextValue);
      startDateState.setNewDate(start);
      endDateState.setNewDate(end);
    }
    onPaste === null || onPaste === void 0 || onPaste(event);
  });
  var onKeyboardInput = (0, _DateInput.useKeyboardInputEvent)({
    onSegmentChange: onSegmentChange,
    onSegmentValueChange: onSegmentValueChange,
    onSegmentValueChangeWithNumericKeys: onSegmentValueChangeWithNumericKeys,
    onSegmentValueRemove: onSegmentValueRemove,
    onKeyDown: onKeyDown
  });
  return /*#__PURE__*/_react.default.createElement(_Input.default, (0, _extends2.default)({
    inputMode: focused ? 'numeric' : 'text',
    autoComplete: "off",
    autoCorrect: "off",
    spellCheck: false,
    className: classes,
    ref: (0, _utils.mergeRefs)(inputRef, ref),
    onKeyDown: onKeyboardInput,
    onClick: handleClick,
    onPaste: handlePaste,
    value: renderedValue,
    placeholder: placeholder || rangeFormatStr
  }, focusEventProps, rest));
});
DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.propTypes = {
  character: _propTypes.default.string,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  format: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
};
var _default = exports.default = DateRangeInput;