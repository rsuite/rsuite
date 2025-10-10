'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["as", "className", "classPrefix", "calendarDefaultDate", "cleanable", "caretAs", "editable", "defaultValue", "disabled", "readOnly", "plaintext", "format", "id", "isoWeek", "weekStart", "limitEndYear", "limitStartYear", "locale", "loading", "label", "menuClassName", "menuStyle", "appearance", "placement", "oneTap", "placeholder", "ranges", "value", "showMeridian", "showMeridiem", "showWeekNumbers", "style", "size", "monthDropdownProps", "shouldDisableDate", "shouldDisableHour", "shouldDisableMinute", "shouldDisableSecond", "onChange", "onChangeCalendarDate", "onClean", "onEnter", "onExit", "onNextMonth", "onOk", "onPrevMonth", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "onShortcutClick", "renderCell", "renderValue", "disabledDate", "disabledHours", "disabledMinutes", "disabledSeconds"];
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import CalenderSimpleIcon from '@rsuite/icons/CalenderSimple';
import TimeIcon from '@rsuite/icons/Time';
import CalendarContainer from "../Calendar/CalendarContainer.js";
import { useCalendarDate } from "../Calendar/hooks/index.js";
import { isEveryDateInMonth } from "../Calendar/utils/index.js";
import Toolbar from "./Toolbar.js";
import Stack from "../Stack/index.js";
import PredefinedRanges from "./PredefinedRanges.js";
import DateInput from "../DateInput/index.js";
import InputGroup from "../InputGroup/index.js";
import useMonthView from "./hooks/useMonthView.js";
import useFocus from "./hooks/useFocus.js";
import useCustomizedInput from "./hooks/useCustomizedInput.js";
import { mergeRefs, partitionHTMLProps, createChainedFunction } from "../internals/utils/index.js";
import { useClassNames, useControlled, useUniqueId, useEventCallback } from "../internals/hooks/index.js";
import { isValid, copyTime, disableTime, DateMode, useDateMode, calendarOnlyProps } from "../internals/utils/date/index.js";
import { PickerPopup, PickerLabel, PickerIndicator, PickerToggleTrigger, pickerPropTypes, pickTriggerPropKeys, usePickerClassName, usePickerRef, onMenuKeyDown } from "../internals/Picker/index.js";
import { OverlayCloseCause } from "../internals/Overlay/OverlayTrigger.js";
import { splitRanges, deprecatedPropTypes, getRestProps } from "./utils.js";
import { startOfToday } from "../internals/utils/date/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * A date picker allows users to select a date from a calendar.
 *
 * @see https://rsuitejs.com/components/date-picker
 */
var DatePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _merge;
  var _useCustom = useCustom('DatePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    calendarDefaultDate = propsWithDefaults.calendarDefaultDate,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    caretAsProp = propsWithDefaults.caretAs,
    _propsWithDefaults$ed = propsWithDefaults.editable,
    editable = _propsWithDefaults$ed === void 0 ? true : _propsWithDefaults$ed,
    defaultValue = propsWithDefaults.defaultValue,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    format = propsWithDefaults.format,
    idProp = propsWithDefaults.id,
    isoWeek = propsWithDefaults.isoWeek,
    weekStart = propsWithDefaults.weekStart,
    _propsWithDefaults$li = propsWithDefaults.limitEndYear,
    limitEndYear = _propsWithDefaults$li === void 0 ? 1000 : _propsWithDefaults$li,
    limitStartYear = propsWithDefaults.limitStartYear,
    locale = propsWithDefaults.locale,
    loading = propsWithDefaults.loading,
    label = propsWithDefaults.label,
    menuClassName = propsWithDefaults.menuClassName,
    menuStyle = propsWithDefaults.menuStyle,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    oneTap = propsWithDefaults.oneTap,
    _propsWithDefaults$pl2 = propsWithDefaults.placeholder,
    placeholder = _propsWithDefaults$pl2 === void 0 ? '' : _propsWithDefaults$pl2,
    ranges = propsWithDefaults.ranges,
    valueProp = propsWithDefaults.value,
    DEPRECATED_showMeridian = propsWithDefaults.showMeridian,
    _propsWithDefaults$sh = propsWithDefaults.showMeridiem,
    showMeridiem = _propsWithDefaults$sh === void 0 ? DEPRECATED_showMeridian : _propsWithDefaults$sh,
    showWeekNumbers = propsWithDefaults.showWeekNumbers,
    style = propsWithDefaults.style,
    size = propsWithDefaults.size,
    monthDropdownProps = propsWithDefaults.monthDropdownProps,
    shouldDisableDate = propsWithDefaults.shouldDisableDate,
    shouldDisableHour = propsWithDefaults.shouldDisableHour,
    shouldDisableMinute = propsWithDefaults.shouldDisableMinute,
    shouldDisableSecond = propsWithDefaults.shouldDisableSecond,
    onChange = propsWithDefaults.onChange,
    onChangeCalendarDate = propsWithDefaults.onChangeCalendarDate,
    onClean = propsWithDefaults.onClean,
    onEnter = propsWithDefaults.onEnter,
    onExit = propsWithDefaults.onExit,
    onNextMonth = propsWithDefaults.onNextMonth,
    onOk = propsWithDefaults.onOk,
    onPrevMonth = propsWithDefaults.onPrevMonth,
    onSelect = propsWithDefaults.onSelect,
    onToggleMonthDropdown = propsWithDefaults.onToggleMonthDropdown,
    onToggleTimeDropdown = propsWithDefaults.onToggleTimeDropdown,
    onShortcutClick = propsWithDefaults.onShortcutClick,
    renderCell = propsWithDefaults.renderCell,
    renderValue = propsWithDefaults.renderValue,
    DEPRECATED_disabledDate = propsWithDefaults.disabledDate,
    DEPRECATED_disabledHours = propsWithDefaults.disabledHours,
    DEPRECATED_disabledMinutes = propsWithDefaults.disabledMinutes,
    DEPRECATED_disabledSeconds = propsWithDefaults.disabledSeconds,
    restProps = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var id = useUniqueId('rs-', idProp);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay;
  var formatStr = format || (locale === null || locale === void 0 ? void 0 : locale.shortDateFormat) || 'yyyy-MM-dd';
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useControlled = useControlled(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useCalendarDate = useCalendarDate(value, calendarDefaultDate),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate,
    resetCalendarDate = _useCalendarDate.resetCalendarDate;
  var _useMonthView = useMonthView({
      onToggleMonthDropdown: onToggleMonthDropdown
    }),
    setMonthView = _useMonthView.setMonthView,
    monthView = _useMonthView.monthView,
    toggleMonthView = _useMonthView.toggleMonthView;
  var _useDateMode = useDateMode(formatStr),
    mode = _useDateMode.mode;

  // Show only the calendar month panel. formatStr = 'yyyy-MM'
  var showMonth = mode === DateMode.Month || monthView;
  var _useFocus = useFocus({
      target: target,
      showMonth: showMonth,
      id: id,
      locale: locale
    }),
    focusInput = _useFocus.focusInput,
    focusSelectedDate = _useFocus.focusSelectedDate,
    onKeyFocusEvent = _useFocus.onKeyFocusEvent;

  /**
   * Check whether the date is disabled.
   */
  var isDateDisabled = function isDateDisabled(date) {
    if (typeof shouldDisableDate === 'function') {
      return shouldDisableDate(date);
    }
    if (typeof DEPRECATED_disabledDate === 'function') {
      return DEPRECATED_disabledDate(date);
    }
    return false;
  };

  /**
   * Check whether the time is within the time range of the shortcut option in the toolbar.
   */
  var isDatetimeDisabled = function isDatetimeDisabled(date) {
    return (isDateDisabled === null || isDateDisabled === void 0 ? void 0 : isDateDisabled(date)) || disableTime(props, date);
  };

  /**
   * Check whether the month is disabled.
   * If any day in the month is disabled, the entire month is disabled
   */
  var isMonthDisabled = function isMonthDisabled(date) {
    return isEveryDateInMonth(date.getFullYear(), date.getMonth(), isDateDisabled);
  };

  /**
   * Whether "OK" button is disabled
   *
   * - If format is date, disable ok button if selected date is disabled
   * - If format is month, disable ok button if all dates in the month of selected date are disabled
   */
  var isOkButtonDisabled = function isOkButtonDisabled(selectedDate) {
    if (mode === DateMode.Month) {
      return isMonthDisabled(selectedDate);
    }
    return isDatetimeDisabled(selectedDate);
  };
  var isErrorValue = function isErrorValue(value) {
    if (!isValid(value)) {
      return true;
    } else if (value && isDateDisabled(value)) {
      return true;
    }
    return false;
  };

  /**
   * Switch to the callback triggered after the next month.
   */
  var handleMoveForward = useEventCallback(function (nextPageDate) {
    setCalendarDate(nextPageDate);
    onNextMonth === null || onNextMonth === void 0 || onNextMonth(nextPageDate);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextPageDate);
  });

  /**
   * Switch to the callback triggered after the previous month.
   */
  var handleMoveBackward = useEventCallback(function (nextPageDate) {
    setCalendarDate(nextPageDate);
    onPrevMonth === null || onPrevMonth === void 0 || onPrevMonth(nextPageDate);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextPageDate);
  });

  /**
   * The callback triggered when the date changes.
   */
  var handleDateChange = useEventCallback(function (nextValue, event) {
    onSelect === null || onSelect === void 0 || onSelect(nextValue, event);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextValue, event);
  });

  /**
   *  A callback triggered when the time on the calendar changes.
   */
  var handleChangeTime = useEventCallback(function (nextPageTime) {
    setCalendarDate(nextPageTime);
    handleDateChange(nextPageTime);
  });

  /**
   * Close the calendar panel.
   */
  var handleClose = useEventCallback(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var updateValue = function updateValue(event, date, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }
    var nextValue = typeof date !== 'undefined' ? date : calendarDate;
    setCalendarDate(nextValue || startOfToday());
    setValue(nextValue);
    if (nextValue !== value) {
      onChange === null || onChange === void 0 || onChange(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      handleClose();
    }
  };

  /**
   * The callback triggered after the date in the shortcut area is clicked.
   */
  var handleShortcutPageDate = useEventCallback(function (range, closeOverlay, event) {
    var value = range.value;
    updateValue(event, value, closeOverlay);
    handleDateChange(value, event);
    onShortcutClick === null || onShortcutClick === void 0 || onShortcutClick(range, event);
  });

  /**
   * The callback triggered after clicking the OK button.
   */
  var handleOK = useEventCallback(function (event) {
    updateValue(event);
    onOk === null || onOk === void 0 || onOk(calendarDate, event);
    focusInput();
  });

  /**
   * Callback after clicking the clear button.
   */

  var handleClean = useEventCallback(function (event) {
    event === null || event === void 0 || event.stopPropagation();
    updateValue(event, null);
    resetCalendarDate(null);
    onClean === null || onClean === void 0 || onClean(event);
  });
  var handlePickerPopupKeyDown = useEventCallback(function (event) {
    onKeyFocusEvent(event, {
      date: calendarDate,
      callback: setCalendarDate
    });
    if (event.key === 'Enter') {
      handleOK(event);
    }
  });
  var handleClick = useEventCallback(function () {
    if (editable) {
      return;
    }
    focusSelectedDate();
  });

  /**
   * Callback after the date is selected.
   */
  var handleCalendarSelect = useEventCallback(function (date, event, updatableValue) {
    if (updatableValue === void 0) {
      updatableValue = true;
    }
    var nextValue = copyTime({
      from: calendarDate,
      to: date
    });
    setCalendarDate(nextValue);
    handleDateChange(nextValue);
    if (oneTap && updatableValue) {
      updateValue(event, nextValue);
      focusInput();
    }
  });

  /**
   *  A callback triggered when the date on the calendar changes.
   */
  var handleChangeMonth = useEventCallback(function (nextPageDate, event) {
    setCalendarDate(nextPageDate);
    handleDateChange(nextPageDate);
    focusSelectedDate();
    if (oneTap && mode === DateMode.Month) {
      updateValue(event, nextPageDate);
      focusInput();
    }
  });

  /**
   * Callback after the input box value is changed.
   */
  var handleInputChange = useEventCallback(function (value, event) {
    if (!isErrorValue(value)) {
      handleCalendarSelect(value, event);
    }
    updateValue(event, value, false);
  });
  var handleInputKeyDown = useEventCallback(function (event) {
    onMenuKeyDown(event, {
      esc: handleClose,
      enter: function enter() {
        var _trigger$current2;
        var _ref = ((_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : _trigger$current2.getState()) || {},
          open = _ref.open;
        if (open) {
          if (isValid(calendarDate) && !isDateDisabled(calendarDate)) {
            updateValue(event);
            focusInput();
          }
        } else {
          var _trigger$current3;
          (_trigger$current3 = trigger.current) === null || _trigger$current3 === void 0 || _trigger$current3.open();
        }
      }
    });
  });
  var calendarProps = mapValues(pick(props, calendarOnlyProps), function (func) {
    return function (next, date) {
      var _func;
      return (_func = func === null || func === void 0 ? void 0 : func(next, date)) !== null && _func !== void 0 ? _func : false;
    };
  });
  var _splitRanges = splitRanges(ranges),
    sideRanges = _splitRanges.sideRanges,
    bottomRanges = _splitRanges.bottomRanges;
  var renderCalendarOverlay = function renderCalendarOverlay(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(menuClassName, className, prefix('popup-date'));
    var styles = _extends({}, menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      role: "dialog",
      "aria-labelledby": label ? id + "-label" : undefined,
      tabIndex: -1,
      className: classes,
      ref: mergeRefs(overlay, speakerRef),
      style: styles,
      target: trigger,
      onKeyDown: handlePickerPopupKeyDown
    }, /*#__PURE__*/React.createElement(Stack, {
      alignItems: "flex-start"
    }, sideRanges.length > 0 && /*#__PURE__*/React.createElement(PredefinedRanges, {
      direction: "column",
      spacing: 0,
      className: prefix('date-predefined'),
      ranges: sideRanges,
      calendarDate: calendarDate,
      locale: locale,
      disableShortcut: isDatetimeDisabled,
      onShortcutClick: handleShortcutPageDate
    }), /*#__PURE__*/React.createElement(Stack.Item, null, /*#__PURE__*/React.createElement(CalendarContainer, _extends({}, calendarProps, {
      targetId: id,
      locale: locale,
      showWeekNumbers: showWeekNumbers,
      showMeridiem: showMeridiem,
      disabledDate: isDateDisabled,
      disabledHours: shouldDisableHour !== null && shouldDisableHour !== void 0 ? shouldDisableHour : DEPRECATED_disabledHours,
      disabledMinutes: shouldDisableMinute !== null && shouldDisableMinute !== void 0 ? shouldDisableMinute : DEPRECATED_disabledMinutes,
      disabledSeconds: shouldDisableSecond !== null && shouldDisableSecond !== void 0 ? shouldDisableSecond : DEPRECATED_disabledSeconds,
      limitEndYear: limitEndYear,
      limitStartYear: limitStartYear,
      format: formatStr,
      isoWeek: isoWeek,
      weekStart: weekStart,
      calendarDate: calendarDate,
      monthDropdownProps: monthDropdownProps,
      renderCellOnPicker: renderCell,
      onMoveForward: handleMoveForward,
      onMoveBackward: handleMoveBackward,
      onSelect: handleCalendarSelect,
      onToggleMonthDropdown: toggleMonthView,
      onToggleTimeDropdown: onToggleTimeDropdown,
      onChangeMonth: handleChangeMonth,
      onChangeTime: handleChangeTime
    })), /*#__PURE__*/React.createElement(Toolbar, {
      locale: locale,
      ranges: bottomRanges,
      calendarDate: calendarDate,
      disableOkBtn: isOkButtonDisabled,
      disableShortcut: isDatetimeDisabled,
      onShortcutClick: handleShortcutPageDate,
      onOk: handleOK,
      hideOkBtn: oneTap
    }))));
  };
  var hasValue = isValid(value);
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      className: className,
      classPrefix: classPrefix,
      name: 'date',
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
    return caretAsProp || (mode === DateMode.Time ? TimeIcon : CalenderSimpleIcon);
  }, [caretAsProp, mode]);
  var handleTriggerClose = useEventCallback(function (cause) {
    var _props$onClose;
    // Unless overlay is closing on user clicking "OK" button,
    // reset the selected date on calendar panel
    if (cause !== OverlayCloseCause.ImperativeHandle) {
      resetCalendarDate();
    }
    setMonthView(false);
    (_props$onClose = props.onClose) === null || _props$onClose === void 0 || _props$onClose.call(props);
  });
  var showCleanButton = cleanable && hasValue && !readOnly;
  var _partitionHTMLProps = partitionHTMLProps(restProps, {
      htmlProps: [],
      includeAria: true
    }),
    ariaProps = _partitionHTMLProps[0],
    rest = _partitionHTMLProps[1];
  var invalidValue = value && isErrorValue(value);
  var customizedProps = {
    value: value,
    formatStr: formatStr,
    renderValue: renderValue,
    readOnly: readOnly,
    editable: editable,
    loading: loading
  };
  var _useCustomizedInput = useCustomizedInput(customizedProps),
    customValue = _useCustomizedInput.customValue,
    inputReadOnly = _useCustomizedInput.inputReadOnly,
    Input = _useCustomizedInput.Input,
    events = _useCustomizedInput.events;
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    trigger: "active",
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onClose: handleTriggerClose,
    onEnter: createChainedFunction(events.onActive, onEnter),
    onExit: createChainedFunction(events.onInactive, onExit),
    speaker: renderCalendarOverlay
  }, /*#__PURE__*/React.createElement(Component, {
    className: merge(classes, (_merge = {}, _merge[prefix('error')] = invalidValue, _merge)),
    style: style,
    ref: root
  }, plaintext ? /*#__PURE__*/React.createElement(DateInput, {
    value: value,
    format: formatStr,
    plaintext: plaintext
  }) : /*#__PURE__*/React.createElement(InputGroup, _extends({}, getRestProps(rest, usedClassNamePropKeys), {
    inside: true,
    size: size,
    disabled: disabled,
    className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["input-group"]))),
    onClick: handleClick
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
    format: formatStr,
    placeholder: placeholder ? placeholder : formatStr,
    disabled: disabled,
    readOnly: inputReadOnly,
    onChange: handleInputChange,
    onKeyDown: handleInputKeyDown
  })), /*#__PURE__*/React.createElement(PickerIndicator, {
    loading: loading,
    caretAs: caretAs,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = _extends({}, pickerPropTypes, deprecatedPropTypes, {
  calendarDefaultDate: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  shouldDisableDate: PropTypes.func,
  shouldDisableHour: PropTypes.func,
  shouldDisableMinute: PropTypes.func,
  shouldDisableSecond: PropTypes.func,
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  weekStart: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  limitEndYear: PropTypes.number,
  limitStartYear: PropTypes.number,
  onChange: PropTypes.func,
  onChangeCalendarDate: PropTypes.func,
  onNextMonth: PropTypes.func,
  onOk: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  oneTap: PropTypes.bool,
  ranges: PropTypes.array,
  showMeridiem: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: PropTypes.instanceOf(Date)
});
export default DatePicker;