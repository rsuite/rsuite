'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "className", "appearance", "editable", "cleanable", "character", "calendarSnapping", "defaultCalendarValue", "defaultValue", "plaintext", "disabled", "disabledDate", "shouldDisableDate", "shouldDisableHour", "shouldDisableMinute", "shouldDisableSecond", "format", "hoverRange", "id", "isoWeek", "weekStart", "limitEndYear", "limitStartYear", "locale", "loading", "label", "menuClassName", "menuStyle", "oneTap", "placeholder", "placement", "ranges", "readOnly", "showOneCalendar", "showWeekNumbers", "showMeridian", "showMeridiem", "showHeader", "style", "size", "caretAs", "value", "monthDropdownProps", "hideHours", "hideMinutes", "hideSeconds", "onChange", "onClean", "onEnter", "onExit", "onOk", "onSelect", "onShortcutClick", "renderTitle", "renderValue", "renderCell"];
import React, { useEffect, useRef, useState, useMemo } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import CalendarIcon from '@rsuite/icons/Calendar';
import TimeIcon from '@rsuite/icons/Time';
import Toolbar from "../DatePicker/Toolbar.js";
import PredefinedRanges from "../DatePicker/PredefinedRanges.js";
import Stack from "../Stack/index.js";
import { DateRangePickerProvider } from "./DateRangePickerProvider.js";
import DateRangeInput from "../DateRangeInput/index.js";
import InputGroup from "../InputGroup/index.js";
import Header from "./Header.js";
import useDateDisabled from "./hooks/useDateDisabled.js";
import useCustomizedInput from "../DatePicker/hooks/useCustomizedInput.js";
import Calendar from "./Calendar.js";
import { getSafeCalendarDate, getMonthHoverRange, getWeekHoverRange, isSameRange } from "./utils.js";
import { deprecatePropTypeNew, oneOf } from "../internals/propTypes/index.js";
import { DATERANGE_DISABLED_TARGET as TARGET } from "../internals/constants/index.js";
import { useClassNames, useControlled, useUniqueId, useEventCallback } from "../internals/hooks/index.js";
import { omitTriggerPropKeys, PickerPopup, pickerPropTypes, PickerToggleTrigger, PickerIndicator, PickerLabel, pickTriggerPropKeys, usePickerClassName, usePickerRef, onMenuKeyDown } from "../internals/Picker/index.js";
import { createChainedFunction, mergeRefs, partitionHTMLProps, getStringLength } from "../internals/utils/index.js";
import { addMonths, addDays, copyTime, calendarOnlyProps, endOfDay, isValid, isBefore, isSameDay, isAfter, isSameMonth, reverseDateRangeOmitTime, startOfDay, DateMode, useDateMode } from "../internals/utils/date/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
var DateRangePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _ref, _ref2, _merge;
  var _useCustom = useCustom('DateRangePicker', props),
    formatDate = _useCustom.formatDate,
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$ed = propsWithDefaults.editable,
    editable = _propsWithDefaults$ed === void 0 ? true : _propsWithDefaults$ed,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$ch = propsWithDefaults.character,
    character = _propsWithDefaults$ch === void 0 ? ' ~ ' : _propsWithDefaults$ch,
    calendarSnapping = propsWithDefaults.calendarSnapping,
    defaultCalendarValue = propsWithDefaults.defaultCalendarValue,
    defaultValue = propsWithDefaults.defaultValue,
    plaintext = propsWithDefaults.plaintext,
    disabled = propsWithDefaults.disabled,
    DEPRECATED_disabledDate = propsWithDefaults.disabledDate,
    shouldDisableDate = propsWithDefaults.shouldDisableDate,
    shouldDisableHour = propsWithDefaults.shouldDisableHour,
    shouldDisableMinute = propsWithDefaults.shouldDisableMinute,
    shouldDisableSecond = propsWithDefaults.shouldDisableSecond,
    format = propsWithDefaults.format,
    hoverRange = propsWithDefaults.hoverRange,
    idProp = propsWithDefaults.id,
    _propsWithDefaults$is = propsWithDefaults.isoWeek,
    isoWeek = _propsWithDefaults$is === void 0 ? false : _propsWithDefaults$is,
    weekStart = propsWithDefaults.weekStart,
    _propsWithDefaults$li = propsWithDefaults.limitEndYear,
    limitEndYear = _propsWithDefaults$li === void 0 ? 1000 : _propsWithDefaults$li,
    limitStartYear = propsWithDefaults.limitStartYear,
    locale = propsWithDefaults.locale,
    loading = propsWithDefaults.loading,
    label = propsWithDefaults.label,
    menuClassName = propsWithDefaults.menuClassName,
    menuStyle = propsWithDefaults.menuStyle,
    oneTap = propsWithDefaults.oneTap,
    _propsWithDefaults$pl = propsWithDefaults.placeholder,
    placeholder = _propsWithDefaults$pl === void 0 ? '' : _propsWithDefaults$pl,
    _propsWithDefaults$pl2 = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl2 === void 0 ? 'bottomStart' : _propsWithDefaults$pl2,
    ranges = propsWithDefaults.ranges,
    readOnly = propsWithDefaults.readOnly,
    _propsWithDefaults$sh = propsWithDefaults.showOneCalendar,
    showOneCalendar = _propsWithDefaults$sh === void 0 ? false : _propsWithDefaults$sh,
    showWeekNumbers = propsWithDefaults.showWeekNumbers,
    DEPRECATED_showMeridian = propsWithDefaults.showMeridian,
    _propsWithDefaults$sh2 = propsWithDefaults.showMeridiem,
    showMeridiem = _propsWithDefaults$sh2 === void 0 ? DEPRECATED_showMeridian : _propsWithDefaults$sh2,
    _propsWithDefaults$sh3 = propsWithDefaults.showHeader,
    showHeader = _propsWithDefaults$sh3 === void 0 ? true : _propsWithDefaults$sh3,
    style = propsWithDefaults.style,
    size = propsWithDefaults.size,
    caretAsProp = propsWithDefaults.caretAs,
    valueProp = propsWithDefaults.value,
    monthDropdownProps = propsWithDefaults.monthDropdownProps,
    hideHours = propsWithDefaults.hideHours,
    hideMinutes = propsWithDefaults.hideMinutes,
    hideSeconds = propsWithDefaults.hideSeconds,
    onChange = propsWithDefaults.onChange,
    onClean = propsWithDefaults.onClean,
    onEnter = propsWithDefaults.onEnter,
    onExit = propsWithDefaults.onExit,
    onOk = propsWithDefaults.onOk,
    onSelect = propsWithDefaults.onSelect,
    onShortcutClick = propsWithDefaults.onShortcutClick,
    renderTitle = propsWithDefaults.renderTitle,
    renderValue = propsWithDefaults.renderValue,
    renderCell = propsWithDefaults.renderCell,
    restProps = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var id = useUniqueId('rs-', idProp);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var formatStr = format || (locale === null || locale === void 0 ? void 0 : locale.shortDateFormat) || 'yyyy-MM-dd';
  var rangeFormatStr = "" + formatStr + character + formatStr;
  var _useControlled = useControlled(valueProp, defaultValue !== null && defaultValue !== void 0 ? defaultValue : null),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useDateMode = useDateMode(formatStr),
    mode = _useDateMode.mode,
    has = _useDateMode.has;

  // Show only the calendar month panel. formatStr = 'yyyy-MM'
  var onlyShowMonth = mode === DateMode.Month;

  // Only show the time panel. formatStr = 'HH:mm:ss'
  var onlyShowTime = mode === DateMode.Time;

  // Allows two calendar panels to display the same month.
  var allowSameMonth = onlyShowMonth || showOneCalendar || onlyShowTime;

  // Default gap between two calendars, if `showOneCalendar` is set, the gap is 0
  var calendarGap = allowSameMonth ? 0 : 1;

  /**
   * Whether to complete the selection.
   * Everytime selection will change this value. If the value is false, it means that the selection has not been completed.
   *
   * In `oneTap` mode, select action will not change this value, its value should be true always.
   */
  var _useState = useState(true),
    isSelectedIdle = _useState[0],
    setSelectedIdle = _useState[1];

  /**
   * The currently selected date range.
   *
   * The time range is selected by two clicks. After the first click,
   * the cursor will store a temporary event date in the process until
   * the second click to determine the end date of the date range.
   *
   */
  var _useState2 = useState((_ref = valueProp !== null && valueProp !== void 0 ? valueProp : defaultValue) !== null && _ref !== void 0 ? _ref : []),
    selectedDates = _useState2[0],
    setSelectedDates = _useState2[1];

  // The date of the current hover, used to reduce the calculation of `handleMouseMove`
  var _useState3 = useState(value),
    hoverDateRange = _useState3[0],
    setHoverDateRange = _useState3[1];

  // The displayed calendar panel is rendered based on this value.
  var _useState4 = useState(getSafeCalendarDate({
      value: (_ref2 = value !== null && value !== void 0 ? value : defaultCalendarValue) !== null && _ref2 !== void 0 ? _ref2 : null,
      allowSameMonth: allowSameMonth
    })),
    calendarDateRange = _useState4[0],
    setCalendarDateRangeValue = _useState4[1];

  /**
   * When hoverRange is set, `selectValue` will be updated during the hover process,
   * which will cause the `selectValue` to be updated after the first click,
   * so declare a Ref to temporarily store the `selectValue` of the first click.
   */
  var selectRangeValueRef = useRef(null);

  /**
   *
   * The key of the currently active calendar panel.
   * Used to switch when only one calendar panel is displayed.
   */
  var _useState5 = useState(),
    activeCalendarKey = _useState5[0],
    setActiveCalendarKey = _useState5[1];

  /**
   * Get the time on the calendar.
   */
  var getCalendarDatetime = function getCalendarDatetime(calendarKey) {
    var index = calendarKey === 'start' ? 0 : 1;
    return (calendarDateRange === null || calendarDateRange === void 0 ? void 0 : calendarDateRange[index]) || (defaultCalendarValue === null || defaultCalendarValue === void 0 ? void 0 : defaultCalendarValue[index]);
  };

  /**
   * Call this function to update the calendar panel rendering benchmark value.
   * If params `value` is not passed, it defaults to [new Date(), addMonth(new Date(), 1)].
   */
  var setCalendarDateRange = function setCalendarDateRange(_ref3) {
    var dateRange = _ref3.dateRange,
      calendarKey = _ref3.calendarKey,
      eventName = _ref3.eventName;
    var nextValue = dateRange;

    // The time should remain the same when the dates in the date range are changed.
    if (has('time') && dateRange !== null && dateRange !== void 0 && dateRange.length && (eventName === 'changeDate' || eventName === 'changeMonth')) {
      var startDate = copyTime({
        from: getCalendarDatetime('start'),
        to: dateRange[0]
      });
      var endDate = copyTime({
        from: getCalendarDatetime('end'),
        to: dateRange.length === 1 ? addMonths(startDate, calendarGap) : dateRange[1]
      });
      nextValue = [startDate, endDate];
    } else if (dateRange === null && typeof defaultCalendarValue !== 'undefined') {
      // Make the calendar render the value of defaultCalendarValue after clearing the value.
      nextValue = defaultCalendarValue;
    }
    var nextCalendarDate = getSafeCalendarDate({
      value: nextValue,
      calendarKey: calendarKey,
      allowSameMonth: allowSameMonth
    });
    setCalendarDateRangeValue(nextCalendarDate);
    if (onlyShowMonth && eventName === 'changeMonth') {
      setSelectedDates(nextCalendarDate);
    }
  };
  useEffect(function () {
    // If value changes, update the selected and hover date values on the calendar panel.
    setSelectedDates(valueProp !== null && valueProp !== void 0 ? valueProp : []);
    setHoverDateRange(valueProp !== null && valueProp !== void 0 ? valueProp : null);
  }, [valueProp]);
  var getInputHtmlSize = function getInputHtmlSize() {
    var padding = 4;
    var strings = rangeFormatStr;
    if (value) {
      var startDate = value[0],
        endDate = value[1];
      strings = "" + formatDate(startDate, formatStr) + character + formatDate(endDate, formatStr);
    }
    return getStringLength(strings) + padding;
  };

  /**
   * preset hover range
   */
  var getHoverRangeValue = function getHoverRangeValue(date) {
    function getHoverRangeFunc() {
      if (hoverRange === 'week') {
        return function (date) {
          return getWeekHoverRange(date, {
            isoWeek: isoWeek,
            weekStart: weekStart,
            locale: locale === null || locale === void 0 ? void 0 : locale.dateLocale
          });
        };
      } else if (hoverRange === 'month') {
        return getMonthHoverRange;
      }
      return hoverRange;
    }
    var hoverRangeFunc = getHoverRangeFunc();
    if (isNil(hoverRangeFunc)) {
      return null;
    }
    var hoverValues = hoverRangeFunc(date);
    var isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
    if (!isHoverRangeValid) {
      return null;
    }
    if (isAfter(hoverValues[0], hoverValues[1])) {
      hoverValues = reverseDateRangeOmitTime(hoverValues);
    }
    return hoverValues;
  };
  var setDateRange = function setDateRange(event, nextValue, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }
    // If nextValue is null, it means that the user is erasing the selected dates.
    setSelectedDates(nextValue !== null && nextValue !== void 0 ? nextValue : []);
    setValue(nextValue);
    if (!isSameRange(nextValue, value, formatStr)) {
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      handleClose();
    }
  };

  /**
   * Select the date range. If oneTap is not set, you need to click twice to select the start time and end time.
   * The MouseMove event is called between the first click and the second click to update the selection state.
   */
  var onMouseMove = useEventCallback(function (date) {
    var nextHoverDateRange = getHoverRangeValue(date);

    // If hasDoneSelect is false,
    // it means there's already one selected date
    // and waiting for user to select the second date to complete the selection.
    if (!isSelectedIdle) {
      // If `hoverRange` is set, you need to change the value of hoverDateRange according to the rules
      if (!isNil(nextHoverDateRange) && !isNil(selectRangeValueRef.current)) {
        var nextSelectedDates = [selectRangeValueRef.current[0], nextHoverDateRange[1]];
        if (isBefore(nextHoverDateRange[0], selectRangeValueRef.current[0])) {
          nextSelectedDates = [nextHoverDateRange[0], selectRangeValueRef.current[1]];
        }
        setSelectedDates(nextSelectedDates);
      } else {
        setHoverDateRange(function (prevHoverValue) {
          return isNil(prevHoverValue) ? null : [prevHoverValue[0], date];
        });
      }

      // Before the first click, if nextHoverDateRange has a value, hoverDateRange needs to be updated
    } else if (!isNil(nextHoverDateRange)) {
      setHoverDateRange(nextHoverDateRange);
    }
  });

  /**
   * Callback for selecting a date cell in the calendar grid
   */
  var handleSelectDate = useEventCallback(function (index, date, event) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextSelectDates = hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : [];
    var hoverRangeValue = getHoverRangeValue(date);
    var noHoverRangeValid = isNil(hoverRangeValue);

    // in `oneTap` mode
    if (oneTap) {
      setDateRange(event, noHoverRangeValid ? [startOfDay(date), endOfDay(date)] : hoverRangeValue);
      onSelect === null || onSelect === void 0 || onSelect(date, event);
      return;
    }

    // no preset hover range can use
    if (noHoverRangeValid) {
      // start select
      if (isSelectedIdle) {
        nextSelectDates = [date];
      } else {
        // finish select
        nextSelectDates[1] = date;
      }
    } else {
      if (!isSelectedIdle) {
        nextSelectDates = selectedDates;
        selectRangeValueRef.current = null;
      } else {
        nextSelectDates = hoverRangeValue;
        selectRangeValueRef.current = hoverRangeValue;
      }
    }
    if (nextSelectDates.length === 2) {
      // If user have completed the selection, then sort the selected dates.
      if (isAfter(nextSelectDates[0], nextSelectDates[1])) {
        nextSelectDates = reverseDateRangeOmitTime(nextSelectDates);
      }
      if (has('time')) {
        nextSelectDates = [copyTime({
          from: getCalendarDatetime('start'),
          to: nextSelectDates[0]
        }), copyTime({
          from: getCalendarDatetime('end'),
          to: nextSelectDates[1]
        })];
      }
      setHoverDateRange(nextSelectDates);
    } else {
      setHoverDateRange([nextSelectDates[0], nextSelectDates[0]]);
    }
    if (isSelectedIdle) {
      setActiveCalendarKey('end');
    } else {
      setActiveCalendarKey('start');
    }
    setSelectedDates(nextSelectDates);
    if (!isSameMonth(calendarDateRange[index], date) || calendarSnapping) {
      setCalendarDateRange({
        dateRange: nextSelectDates,
        calendarKey: calendarKey,
        eventName: 'changeDate'
      });
    }
    onSelect === null || onSelect === void 0 || onSelect(date, event);
    setSelectedIdle(!isSelectedIdle);
  });

  /**
   * If `selectValue` changed, there will be the following effects.
   * 1. Check if the selection is completed.
   * 2. if the selection is completed, set the temporary `hoverValue` empty.
   */
  useEffect(function () {
    var selectValueLength = selectedDates.length;
    var doneSelected = selectValueLength === 0 || selectValueLength === 2;
    doneSelected && setHoverDateRange(null);
  }, [selectedDates]);
  var onChangeCalendarMonth = useEventCallback(function (index, date) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextCalendarDate = Array.from(calendarDateRange);
    nextCalendarDate[index] = date;
    setCalendarDateRange({
      dateRange: nextCalendarDate,
      calendarKey: calendarKey,
      eventName: 'changeMonth'
    });
  });
  var onChangeCalendarTime = useEventCallback(function (index, date) {
    var calendarKey = index === 0 ? 'start' : 'end';
    var nextCalendarDate = Array.from(calendarDateRange);
    nextCalendarDate[index] = date;
    setCalendarDateRange({
      dateRange: nextCalendarDate,
      calendarKey: calendarKey,
      eventName: 'changeTime'
    });
    setSelectedDates(function (prev) {
      var next = [].concat(prev);

      // if next[index] is not empty, only update the time after aligning the year, month and day
      next[index] = next[index] ? copyTime({
        from: date,
        to: next[index]
      }) : new Date(date.valueOf());
      return next;
    });
  });
  var handleEnter = useEventCallback(function () {
    var nextCalendarDate;
    if (value && value.length) {
      var startDate = value[0],
        endData = value[1];
      nextCalendarDate = [startDate, isSameMonth(startDate, endData) ? addMonths(endData, calendarGap) : endData];
    } else {
      // Reset the date on the calendar to the default date
      nextCalendarDate = getSafeCalendarDate({
        value: defaultCalendarValue !== null && defaultCalendarValue !== void 0 ? defaultCalendarValue : null,
        allowSameMonth: allowSameMonth
      });
    }
    setSelectedDates(value !== null && value !== void 0 ? value : []);
    setCalendarDateRange({
      dateRange: nextCalendarDate
    });
  });
  var handleExit = useEventCallback(function () {
    setSelectedIdle(true);
  });

  /**
   * Toolbar operation callback function
   */
  var handleShortcutPageDate = useEventCallback(function (range, closeOverlay, event) {
    if (closeOverlay === void 0) {
      closeOverlay = false;
    }
    var value = range.value;
    setCalendarDateRange({
      dateRange: value,
      eventName: 'shortcutSelection'
    });
    if (closeOverlay) {
      setDateRange(event, value, closeOverlay);
    } else {
      setSelectedDates(value !== null && value !== void 0 ? value : []);
    }
    onShortcutClick === null || onShortcutClick === void 0 || onShortcutClick(range, event);

    // End unfinished selections.
    setSelectedIdle(true);
  });
  var calculateDateRange = function calculateDateRange() {
    var _selectedDates$ = selectedDates[0],
      start = _selectedDates$ === void 0 ? calendarDateRange[0] : _selectedDates$,
      _selectedDates$2 = selectedDates[1],
      end = _selectedDates$2 === void 0 ? calendarDateRange[1] : _selectedDates$2;
    if (onlyShowTime) {
      return [start, end];
    }
    return selectedDates;
  };
  var handleClickOK = useEventCallback(function (event) {
    var nextValue = calculateDateRange();
    setDateRange(event, nextValue);
    onOk === null || onOk === void 0 || onOk(nextValue, event);
  });
  var handleClean = useEventCallback(function (event) {
    setCalendarDateRange({
      dateRange: null
    });
    setDateRange(event, null);
    onClean === null || onClean === void 0 || onClean(event);
    event.stopPropagation();
  });

  /**
   * Callback after the input box value is changed.
   */
  var handleInputChange = useEventCallback(function (value, event) {
    if (!value) {
      return;
    }
    var startDate = value[0],
      endDate = value[1];
    var selectValue = [startDate, endDate];
    setHoverDateRange(selectValue);
    setSelectedDates(selectValue);
    setCalendarDateRange({
      dateRange: selectValue
    });
    setDateRange(event, selectValue, false);
  });

  /**
   * Check if the date is disabled
   */
  var isDateDisabled = useDateDisabled({
    shouldDisableDate: shouldDisableDate,
    DEPRECATED_disabledDate: DEPRECATED_disabledDate
  });

  /**
   * Check if a date range is disabled
   */
  var isRangeDisabled = function isRangeDisabled(start, end, target) {
    if (isDateDisabled) {
      // If the date is between the start and the end the button is disabled
      while (isBefore(start, end) || isSameDay(start, end)) {
        if (isDateDisabled(start, {
          selectDate: selectedDates,
          selectedDone: isSelectedIdle,
          target: target
        })) {
          return true;
        }
        start = addDays(start, 1);
      }
    }
    return false;
  };

  /**
   * Determine if the OK button should be disabled
   */
  var shouldDisableOkButton = function shouldDisableOkButton() {
    var _calculateDateRange = calculateDateRange(),
      startDate = _calculateDateRange[0],
      endDate = _calculateDateRange[1];

    // Check if start or end dates are missing
    if (!startDate || !endDate) {
      return true;
    }

    // Additional condition if only showing time
    if (!onlyShowTime && !isSelectedIdle) {
      return true;
    }

    // Check if there is any error in the selected date range
    if (isErrorValue([startDate, endDate])) {
      return true;
    }
    return false;
  };

  /**
   * Check if a shortcut is disabled based on the selected date range
   */
  var shouldDisableShortcut = function shouldDisableShortcut(selectedDates) {
    if (selectedDates === void 0) {
      selectedDates = [];
    }
    if (selectedDates === null) {
      return false;
    }
    var _selectedDates = selectedDates,
      startDate = _selectedDates[0],
      endDate = _selectedDates[1];

    // Disable if either start or end date is missing
    if (!startDate || !endDate) {
      return true;
    }

    // Check if the date range is disabled for the shortcut
    return isRangeDisabled(startDate, endDate, TARGET.TOOLBAR_SHORTCUT);
  };
  var handleClose = useEventCallback(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var handleInputKeyDown = useEventCallback(function (event) {
    onMenuKeyDown(event, {
      esc: handleClose,
      enter: function enter() {
        var _trigger$current2;
        var _ref4 = ((_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : _trigger$current2.getState()) || {},
          open = _ref4.open;
        if (!open) {
          var _trigger$current3;
          (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 || _trigger$current3.open();
        }
      }
    });
  });
  var disableCalendarDate = isDateDisabled ? function (date, values, type) {
    return isDateDisabled(date, {
      selectDate: values,
      selectedDone: isSelectedIdle,
      target: type
    });
  } : undefined;
  var renderCalendarOverlay = function renderCalendarOverlay(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, menuClassName, prefix('popup-daterange'));
    var panelClasses = prefix('daterange-panel', {
      'daterange-panel-show-one-calendar': showOneCalendar,
      'daterange-panel-only-time': onlyShowTime
    });

    /**
     * Set a min-width (528px) when there are two calendars
     * @see https://github.com/rsuite/rsuite/issues/3522
     */
    var panelStyles = {
      minWidth: showOneCalendar || onlyShowTime ? 'auto' : 528
    };
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    var calendarProps = {
      locale: locale,
      isoWeek: isoWeek,
      weekStart: weekStart,
      limitEndYear: limitEndYear,
      showMeridiem: showMeridiem,
      calendarDateRange: calendarDateRange,
      limitStartYear: limitStartYear,
      showWeekNumbers: showWeekNumbers,
      format: formatStr,
      value: selectedDates,
      monthDropdownProps: monthDropdownProps,
      hoverRangeValue: hoverDateRange !== null && hoverDateRange !== void 0 ? hoverDateRange : undefined,
      hideHours: hideHours,
      hideMinutes: hideMinutes,
      hideSeconds: hideSeconds,
      disabledHours: shouldDisableHour,
      disabledMinutes: shouldDisableMinute,
      disabledSeconds: shouldDisableSecond,
      disabledDate: disableCalendarDate,
      onSelect: handleSelectDate,
      onChangeCalendarMonth: onChangeCalendarMonth,
      onChangeCalendarTime: onChangeCalendarTime,
      onMouseMove: onMouseMove,
      renderTitle: renderTitle,
      renderCellOnPicker: renderCell
    };
    var getCalendars = function getCalendars() {
      if (showOneCalendar) {
        return /*#__PURE__*/React.createElement(Calendar, _extends({
          index: activeCalendarKey === 'end' ? 1 : 0
        }, calendarProps));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Calendar, _extends({
        index: 0
      }, calendarProps)), /*#__PURE__*/React.createElement(Calendar, _extends({
        index: 1
      }, calendarProps)));
    };
    var sideRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
      return (range === null || range === void 0 ? void 0 : range.placement) === 'left';
    })) || [];
    var bottomRanges = ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
      return (range === null || range === void 0 ? void 0 : range.placement) === 'bottom' || (range === null || range === void 0 ? void 0 : range.placement) === undefined;
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      role: "dialog",
      "aria-labelledby": label ? id + "-label" : undefined,
      tabIndex: -1,
      className: classes,
      ref: mergeRefs(overlay, speakerRef),
      target: trigger,
      style: styles
    }, /*#__PURE__*/React.createElement("div", {
      className: panelClasses,
      style: panelStyles
    }, /*#__PURE__*/React.createElement(Stack, {
      alignItems: "flex-start"
    }, sideRanges.length > 0 && /*#__PURE__*/React.createElement(PredefinedRanges, {
      direction: "column",
      spacing: 0,
      className: prefix('daterange-predefined'),
      ranges: sideRanges,
      calendarDate: calendarDateRange,
      locale: locale,
      disableShortcut: shouldDisableShortcut,
      onShortcutClick: handleShortcutPageDate,
      "data-testid": "daterange-predefined-side"
    }), /*#__PURE__*/React.createElement(Stack.Item, null, /*#__PURE__*/React.createElement("div", {
      className: prefix('daterange-content')
    }, showHeader && /*#__PURE__*/React.createElement(Header, {
      value: isSelectedIdle ? selectedDates : hoverDateRange,
      formatStr: formatStr,
      character: character,
      clickable: showOneCalendar,
      activeKey: activeCalendarKey,
      onSelect: setActiveCalendarKey
    }), /*#__PURE__*/React.createElement("div", {
      className: prefix("daterange-calendar-" + (showOneCalendar ? 'single' : 'group'))
    }, /*#__PURE__*/React.createElement(DateRangePickerProvider, {
      value: {
        isSelectedIdle: isSelectedIdle
      }
    }, getCalendars()))), /*#__PURE__*/React.createElement(Toolbar, {
      locale: locale,
      calendarDate: selectedDates,
      disableOkBtn: shouldDisableOkButton,
      disableShortcut: shouldDisableShortcut,
      hideOkBtn: oneTap,
      onOk: handleClickOK,
      onShortcutClick: handleShortcutPageDate,
      ranges: bottomRanges
    })))));
  };
  var hasValue = !isNil(value) && value.length > 1;
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      className: className,
      name: 'daterange',
      appearance: appearance,
      hasValue: hasValue,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  var caretAs = useMemo(function () {
    if (caretAsProp === null) {
      return null;
    }
    return caretAsProp || (onlyShowTime ? TimeIcon : CalendarIcon);
  }, [caretAsProp, onlyShowTime]);
  var isErrorValue = function isErrorValue(value) {
    if (!value) {
      return false;
    }

    // If the value is an empty array, it is not an error value.
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    var startDate = value[0],
      endDate = value[1];
    if (!isValid(startDate) || !isValid(endDate)) {
      return true;
    }
    if (isBefore(endDate, startDate)) {
      return true;
    }
    var disabledOptions = {
      selectDate: value,
      selectedDone: isSelectedIdle,
      target: TARGET.INPUT
    };
    if (isDateDisabled !== null && isDateDisabled !== void 0 && isDateDisabled(startDate, disabledOptions) || isDateDisabled !== null && isDateDisabled !== void 0 && isDateDisabled(endDate, disabledOptions)) {
      return true;
    }
    return false;
  };
  var _partitionHTMLProps = partitionHTMLProps(restProps, {
      htmlProps: [],
      includeAria: true
    }),
    ariaProps = _partitionHTMLProps[0],
    rest = _partitionHTMLProps[1];
  var showCleanButton = cleanable && hasValue && !readOnly;
  var invalidValue = value && isErrorValue(value);
  var _useCustomizedInput = useCustomizedInput({
      mode: 'dateRange',
      value: value,
      formatStr: formatStr,
      renderValue: renderValue,
      readOnly: readOnly,
      editable: editable,
      loading: loading
    }),
    customValue = _useCustomizedInput.customValue,
    inputReadOnly = _useCustomizedInput.inputReadOnly,
    Input = _useCustomizedInput.Input,
    events = _useCustomizedInput.events;
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    trigger: "active",
    ref: trigger,
    pickerProps: pick(props, pickTriggerPropKeys),
    placement: placement,
    onEnter: createChainedFunction(events.onActive, handleEnter, onEnter),
    onExit: createChainedFunction(events.onInactive, handleExit, onExit),
    speaker: renderCalendarOverlay
  }, /*#__PURE__*/React.createElement(Component, {
    ref: root,
    className: merge(classes, (_merge = {}, _merge[prefix('error')] = invalidValue, _merge)),
    style: style
  }, plaintext ? /*#__PURE__*/React.createElement(DateRangeInput, {
    value: value,
    format: formatStr,
    plaintext: plaintext
  }) : /*#__PURE__*/React.createElement(InputGroup, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys, calendarOnlyProps)), {
    inside: true,
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["input-group"]))),
    disabled: disabled,
    size: size
  }), /*#__PURE__*/React.createElement(PickerLabel, {
    className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["label"]))),
    id: id + "-label"
  }, label), /*#__PURE__*/React.createElement(Input, _extends({
    "aria-haspopup": "dialog",
    "aria-invalid": invalidValue,
    "aria-labelledby": label ? id + "-label" : undefined
  }, ariaProps, {
    ref: target,
    id: id,
    value: customValue || value,
    character: character,
    format: formatStr,
    placeholder: placeholder ? placeholder : rangeFormatStr,
    disabled: disabled,
    readOnly: inputReadOnly,
    htmlSize: getInputHtmlSize(),
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown
  })), /*#__PURE__*/React.createElement(PickerIndicator, {
    loading: loading,
    caretAs: caretAs,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.propTypes = _extends({}, pickerPropTypes, {
  ranges: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultCalendarValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverRange: PropTypes.oneOfType([oneOf(['week', 'month']), PropTypes.func]),
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  weekStart: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  oneTap: PropTypes.bool,
  limitEndYear: PropTypes.number,
  limitStartYear: PropTypes.number,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableDate" property instead.'),
  shouldDisableDate: PropTypes.func,
  onSelect: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  showMeridiem: PropTypes.bool,
  showOneCalendar: PropTypes.bool
});
export default DateRangePicker;