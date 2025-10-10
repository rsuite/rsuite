'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _mapValues = _interopRequireDefault(require("lodash/mapValues"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _CalenderSimple = _interopRequireDefault(require("@rsuite/icons/CalenderSimple"));
var _Time = _interopRequireDefault(require("@rsuite/icons/Time"));
var _CalendarContainer = _interopRequireDefault(require("../Calendar/CalendarContainer"));
var _hooks = require("../Calendar/hooks");
var _utils = require("../Calendar/utils");
var _Toolbar = _interopRequireDefault(require("./Toolbar"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _PredefinedRanges = _interopRequireDefault(require("./PredefinedRanges"));
var _DateInput = _interopRequireDefault(require("../DateInput"));
var _InputGroup = _interopRequireDefault(require("../InputGroup"));
var _useMonthView2 = _interopRequireDefault(require("./hooks/useMonthView"));
var _useFocus2 = _interopRequireDefault(require("./hooks/useFocus"));
var _useCustomizedInput2 = _interopRequireDefault(require("./hooks/useCustomizedInput"));
var _utils2 = require("../internals/utils");
var _hooks2 = require("../internals/hooks");
var _date = require("../internals/utils/date");
var _Picker = require("../internals/Picker");
var _OverlayTrigger = require("../internals/Overlay/OverlayTrigger");
var _utils3 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2;
var _excluded = ["as", "className", "classPrefix", "calendarDefaultDate", "cleanable", "caretAs", "editable", "defaultValue", "disabled", "readOnly", "plaintext", "format", "id", "isoWeek", "weekStart", "limitEndYear", "limitStartYear", "locale", "loading", "label", "menuClassName", "menuStyle", "appearance", "placement", "oneTap", "placeholder", "ranges", "value", "showMeridian", "showMeridiem", "showWeekNumbers", "style", "size", "monthDropdownProps", "shouldDisableDate", "shouldDisableHour", "shouldDisableMinute", "shouldDisableSecond", "onChange", "onChangeCalendarDate", "onClean", "onEnter", "onExit", "onNextMonth", "onOk", "onPrevMonth", "onSelect", "onToggleMonthDropdown", "onToggleTimeDropdown", "onShortcutClick", "renderCell", "renderValue", "disabledDate", "disabledHours", "disabledMinutes", "disabledSeconds"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * A date picker allows users to select a date from a calendar.
 *
 * @see https://rsuitejs.com/components/date-picker
 */
var DatePicker = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _merge;
  var _useCustom = (0, _CustomProvider.useCustom)('DatePicker', props),
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
    restProps = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var id = (0, _hooks2.useUniqueId)('rs-', idProp);
  var _usePickerRef = (0, _Picker.usePickerRef)(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay;
  var formatStr = format || (locale === null || locale === void 0 ? void 0 : locale.shortDateFormat) || 'yyyy-MM-dd';
  var _useClassNames = (0, _hooks2.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useControlled = (0, _hooks2.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var _useCalendarDate = (0, _hooks.useCalendarDate)(value, calendarDefaultDate),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate,
    resetCalendarDate = _useCalendarDate.resetCalendarDate;
  var _useMonthView = (0, _useMonthView2.default)({
      onToggleMonthDropdown: onToggleMonthDropdown
    }),
    setMonthView = _useMonthView.setMonthView,
    monthView = _useMonthView.monthView,
    toggleMonthView = _useMonthView.toggleMonthView;
  var _useDateMode = (0, _date.useDateMode)(formatStr),
    mode = _useDateMode.mode;

  // Show only the calendar month panel. formatStr = 'yyyy-MM'
  var showMonth = mode === _date.DateMode.Month || monthView;
  var _useFocus = (0, _useFocus2.default)({
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
    return (isDateDisabled === null || isDateDisabled === void 0 ? void 0 : isDateDisabled(date)) || (0, _date.disableTime)(props, date);
  };

  /**
   * Check whether the month is disabled.
   * If any day in the month is disabled, the entire month is disabled
   */
  var isMonthDisabled = function isMonthDisabled(date) {
    return (0, _utils.isEveryDateInMonth)(date.getFullYear(), date.getMonth(), isDateDisabled);
  };

  /**
   * Whether "OK" button is disabled
   *
   * - If format is date, disable ok button if selected date is disabled
   * - If format is month, disable ok button if all dates in the month of selected date are disabled
   */
  var isOkButtonDisabled = function isOkButtonDisabled(selectedDate) {
    if (mode === _date.DateMode.Month) {
      return isMonthDisabled(selectedDate);
    }
    return isDatetimeDisabled(selectedDate);
  };
  var isErrorValue = function isErrorValue(value) {
    if (!(0, _date.isValid)(value)) {
      return true;
    } else if (value && isDateDisabled(value)) {
      return true;
    }
    return false;
  };

  /**
   * Switch to the callback triggered after the next month.
   */
  var handleMoveForward = (0, _hooks2.useEventCallback)(function (nextPageDate) {
    setCalendarDate(nextPageDate);
    onNextMonth === null || onNextMonth === void 0 || onNextMonth(nextPageDate);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextPageDate);
  });

  /**
   * Switch to the callback triggered after the previous month.
   */
  var handleMoveBackward = (0, _hooks2.useEventCallback)(function (nextPageDate) {
    setCalendarDate(nextPageDate);
    onPrevMonth === null || onPrevMonth === void 0 || onPrevMonth(nextPageDate);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextPageDate);
  });

  /**
   * The callback triggered when the date changes.
   */
  var handleDateChange = (0, _hooks2.useEventCallback)(function (nextValue, event) {
    onSelect === null || onSelect === void 0 || onSelect(nextValue, event);
    onChangeCalendarDate === null || onChangeCalendarDate === void 0 || onChangeCalendarDate(nextValue, event);
  });

  /**
   *  A callback triggered when the time on the calendar changes.
   */
  var handleChangeTime = (0, _hooks2.useEventCallback)(function (nextPageTime) {
    setCalendarDate(nextPageTime);
    handleDateChange(nextPageTime);
  });

  /**
   * Close the calendar panel.
   */
  var handleClose = (0, _hooks2.useEventCallback)(function () {
    var _trigger$current, _trigger$current$clos;
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var updateValue = function updateValue(event, date, closeOverlay) {
    if (closeOverlay === void 0) {
      closeOverlay = true;
    }
    var nextValue = typeof date !== 'undefined' ? date : calendarDate;
    setCalendarDate(nextValue || (0, _date.startOfToday)());
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
  var handleShortcutPageDate = (0, _hooks2.useEventCallback)(function (range, closeOverlay, event) {
    var value = range.value;
    updateValue(event, value, closeOverlay);
    handleDateChange(value, event);
    onShortcutClick === null || onShortcutClick === void 0 || onShortcutClick(range, event);
  });

  /**
   * The callback triggered after clicking the OK button.
   */
  var handleOK = (0, _hooks2.useEventCallback)(function (event) {
    updateValue(event);
    onOk === null || onOk === void 0 || onOk(calendarDate, event);
    focusInput();
  });

  /**
   * Callback after clicking the clear button.
   */

  var handleClean = (0, _hooks2.useEventCallback)(function (event) {
    event === null || event === void 0 || event.stopPropagation();
    updateValue(event, null);
    resetCalendarDate(null);
    onClean === null || onClean === void 0 || onClean(event);
  });
  var handlePickerPopupKeyDown = (0, _hooks2.useEventCallback)(function (event) {
    onKeyFocusEvent(event, {
      date: calendarDate,
      callback: setCalendarDate
    });
    if (event.key === 'Enter') {
      handleOK(event);
    }
  });
  var handleClick = (0, _hooks2.useEventCallback)(function () {
    if (editable) {
      return;
    }
    focusSelectedDate();
  });

  /**
   * Callback after the date is selected.
   */
  var handleCalendarSelect = (0, _hooks2.useEventCallback)(function (date, event, updatableValue) {
    if (updatableValue === void 0) {
      updatableValue = true;
    }
    var nextValue = (0, _date.copyTime)({
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
  var handleChangeMonth = (0, _hooks2.useEventCallback)(function (nextPageDate, event) {
    setCalendarDate(nextPageDate);
    handleDateChange(nextPageDate);
    focusSelectedDate();
    if (oneTap && mode === _date.DateMode.Month) {
      updateValue(event, nextPageDate);
      focusInput();
    }
  });

  /**
   * Callback after the input box value is changed.
   */
  var handleInputChange = (0, _hooks2.useEventCallback)(function (value, event) {
    if (!isErrorValue(value)) {
      handleCalendarSelect(value, event);
    }
    updateValue(event, value, false);
  });
  var handleInputKeyDown = (0, _hooks2.useEventCallback)(function (event) {
    (0, _Picker.onMenuKeyDown)(event, {
      esc: handleClose,
      enter: function enter() {
        var _trigger$current2;
        var _ref = ((_trigger$current2 = trigger.current) === null || _trigger$current2 === void 0 ? void 0 : _trigger$current2.getState()) || {},
          open = _ref.open;
        if (open) {
          if ((0, _date.isValid)(calendarDate) && !isDateDisabled(calendarDate)) {
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
  var calendarProps = (0, _mapValues.default)((0, _pick.default)(props, _date.calendarOnlyProps), function (func) {
    return function (next, date) {
      var _func;
      return (_func = func === null || func === void 0 ? void 0 : func(next, date)) !== null && _func !== void 0 ? _func : false;
    };
  });
  var _splitRanges = (0, _utils3.splitRanges)(ranges),
    sideRanges = _splitRanges.sideRanges,
    bottomRanges = _splitRanges.bottomRanges;
  var renderCalendarOverlay = function renderCalendarOverlay(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(menuClassName, className, prefix('popup-date'));
    var styles = (0, _extends2.default)({}, menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/_react.default.createElement(_Picker.PickerPopup, {
      role: "dialog",
      "aria-labelledby": label ? id + "-label" : undefined,
      tabIndex: -1,
      className: classes,
      ref: (0, _utils2.mergeRefs)(overlay, speakerRef),
      style: styles,
      target: trigger,
      onKeyDown: handlePickerPopupKeyDown
    }, /*#__PURE__*/_react.default.createElement(_Stack.default, {
      alignItems: "flex-start"
    }, sideRanges.length > 0 && /*#__PURE__*/_react.default.createElement(_PredefinedRanges.default, {
      direction: "column",
      spacing: 0,
      className: prefix('date-predefined'),
      ranges: sideRanges,
      calendarDate: calendarDate,
      locale: locale,
      disableShortcut: isDatetimeDisabled,
      onShortcutClick: handleShortcutPageDate
    }), /*#__PURE__*/_react.default.createElement(_Stack.default.Item, null, /*#__PURE__*/_react.default.createElement(_CalendarContainer.default, (0, _extends2.default)({}, calendarProps, {
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
    })), /*#__PURE__*/_react.default.createElement(_Toolbar.default, {
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
  var hasValue = (0, _date.isValid)(value);
  var _usePickerClassName = (0, _Picker.usePickerClassName)((0, _extends2.default)({}, props, {
      className: className,
      classPrefix: classPrefix,
      name: 'date',
      appearance: appearance,
      hasValue: hasValue,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  var caretAs = (0, _react.useMemo)(function () {
    if (caretAsProp === null) {
      return null;
    }
    return caretAsProp || (mode === _date.DateMode.Time ? _Time.default : _CalenderSimple.default);
  }, [caretAsProp, mode]);
  var handleTriggerClose = (0, _hooks2.useEventCallback)(function (cause) {
    var _props$onClose;
    // Unless overlay is closing on user clicking "OK" button,
    // reset the selected date on calendar panel
    if (cause !== _OverlayTrigger.OverlayCloseCause.ImperativeHandle) {
      resetCalendarDate();
    }
    setMonthView(false);
    (_props$onClose = props.onClose) === null || _props$onClose === void 0 || _props$onClose.call(props);
  });
  var showCleanButton = cleanable && hasValue && !readOnly;
  var _partitionHTMLProps = (0, _utils2.partitionHTMLProps)(restProps, {
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
  var _useCustomizedInput = (0, _useCustomizedInput2.default)(customizedProps),
    customValue = _useCustomizedInput.customValue,
    inputReadOnly = _useCustomizedInput.inputReadOnly,
    Input = _useCustomizedInput.Input,
    events = _useCustomizedInput.events;
  return /*#__PURE__*/_react.default.createElement(_Picker.PickerToggleTrigger, {
    trigger: "active",
    pickerProps: (0, _pick.default)(props, _Picker.pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onClose: handleTriggerClose,
    onEnter: (0, _utils2.createChainedFunction)(events.onActive, onEnter),
    onExit: (0, _utils2.createChainedFunction)(events.onInactive, onExit),
    speaker: renderCalendarOverlay
  }, /*#__PURE__*/_react.default.createElement(Component, {
    className: merge(classes, (_merge = {}, _merge[prefix('error')] = invalidValue, _merge)),
    style: style,
    ref: root
  }, plaintext ? /*#__PURE__*/_react.default.createElement(_DateInput.default, {
    value: value,
    format: formatStr,
    plaintext: plaintext
  }) : /*#__PURE__*/_react.default.createElement(_InputGroup.default, (0, _extends2.default)({}, (0, _utils3.getRestProps)(rest, usedClassNamePropKeys), {
    inside: true,
    size: size,
    disabled: disabled,
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["input-group"]))),
    onClick: handleClick
  }), /*#__PURE__*/_react.default.createElement(_Picker.PickerLabel, {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["label"]))),
    id: id + "-label"
  }, label), /*#__PURE__*/_react.default.createElement(Input, (0, _extends2.default)({
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
  })), /*#__PURE__*/_react.default.createElement(_Picker.PickerIndicator, {
    loading: loading,
    caretAs: caretAs,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = (0, _extends2.default)({}, _Picker.pickerPropTypes, _utils3.deprecatedPropTypes, {
  calendarDefaultDate: _propTypes.default.instanceOf(Date),
  defaultValue: _propTypes.default.instanceOf(Date),
  shouldDisableDate: _propTypes.default.func,
  shouldDisableHour: _propTypes.default.func,
  shouldDisableMinute: _propTypes.default.func,
  shouldDisableSecond: _propTypes.default.func,
  format: _propTypes.default.string,
  hideHours: _propTypes.default.func,
  hideMinutes: _propTypes.default.func,
  hideSeconds: _propTypes.default.func,
  isoWeek: _propTypes.default.bool,
  weekStart: _propTypes.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
  limitEndYear: _propTypes.default.number,
  limitStartYear: _propTypes.default.number,
  onChange: _propTypes.default.func,
  onChangeCalendarDate: _propTypes.default.func,
  onNextMonth: _propTypes.default.func,
  onOk: _propTypes.default.func,
  onPrevMonth: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onToggleMonthDropdown: _propTypes.default.func,
  onToggleTimeDropdown: _propTypes.default.func,
  oneTap: _propTypes.default.bool,
  ranges: _propTypes.default.array,
  showMeridiem: _propTypes.default.bool,
  showWeekNumbers: _propTypes.default.bool,
  value: _propTypes.default.instanceOf(Date)
});
var _default = exports.default = DatePicker;