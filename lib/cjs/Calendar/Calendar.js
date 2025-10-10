'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CalendarContainer = _interopRequireDefault(require("./CalendarContainer"));
var _Button = _interopRequireDefault(require("../Button"));
var _date = require("../internals/utils/date");
var _CustomProvider = require("../CustomProvider");
var _hooks = require("../internals/hooks");
var _hooks2 = require("./hooks");
var _excluded = ["as", "bordered", "className", "classPrefix", "compact", "defaultValue", "isoWeek", "weekStart", "locale", "onChange", "onMonthChange", "onSelect", "renderCell", "value", "cellClassName"];
/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
var Calendar = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Calendar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? _CalendarContainer.default : _propsWithDefaults$as,
    bordered = propsWithDefaults.bordered,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'calendar' : _propsWithDefaults$cl,
    compact = propsWithDefaults.compact,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? (0, _date.startOfDay)(new Date()) : _propsWithDefaults$de,
    isoWeek = propsWithDefaults.isoWeek,
    weekStart = propsWithDefaults.weekStart,
    locale = propsWithDefaults.locale,
    onChange = propsWithDefaults.onChange,
    onMonthChange = propsWithDefaults.onMonthChange,
    onSelect = propsWithDefaults.onSelect,
    renderCell = propsWithDefaults.renderCell,
    value = propsWithDefaults.value,
    cellClassName = propsWithDefaults.cellClassName,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useCalendarDate = (0, _hooks2.useCalendarDate)(value, defaultValue),
    calendarDate = _useCalendarDate.calendarDate,
    setCalendarDate = _useCalendarDate.setCalendarDate;
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue) {
    setCalendarDate(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue);
    if (!(0, _date.isSameMonth)(nextValue, calendarDate)) {
      onMonthChange === null || onMonthChange === void 0 || onMonthChange(nextValue);
    }
  });
  var handleClickToday = (0, _hooks.useEventCallback)(function () {
    handleChange(new Date());
  });
  var handleSelect = (0, _hooks.useEventCallback)(function (nextValue) {
    onSelect === null || onSelect === void 0 || onSelect(nextValue);
    handleChange(nextValue);
  });
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var renderToolbar = function renderToolbar() {
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      className: prefix('btn-today'),
      size: "sm",
      onClick: handleClickToday
    }, (locale === null || locale === void 0 ? void 0 : locale.today) || 'Today');
  };
  var renderTitle = function renderTitle(date) {
    return /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
      date: date,
      formatStr: (locale === null || locale === void 0 ? void 0 : locale.formattedMonthPattern) || 'MMMM  yyyy'
    });
  };
  var classes = merge(className, withClassPrefix('panel', {
    bordered: bordered,
    compact: compact
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    inline: true,
    className: classes,
    ref: ref,
    isoWeek: isoWeek,
    weekStart: weekStart,
    format: "yyyy-MM-dd",
    calendarDate: calendarDate,
    limitEndYear: 1000,
    locale: locale,
    renderTitle: renderTitle,
    renderToolbar: renderToolbar,
    renderCell: renderCell,
    cellClassName: cellClassName,
    onMoveForward: handleChange,
    onMoveBackward: handleChange,
    onChangeMonth: handleChange,
    onSelect: handleSelect
  }));
});
Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  defaultValue: _propTypes.default.instanceOf(Date),
  isoWeek: _propTypes.default.bool,
  weekStart: _propTypes.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
  compact: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  locale: _propTypes.default.object,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  renderCell: _propTypes.default.func
};
var _default = exports.default = Calendar;