'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _date = require("../../internals/utils/date");
var _constants = require("../../internals/constants");
var _hooks = require("../../internals/hooks");
var _hooks2 = require("../hooks");
var _GridCell = _interopRequireDefault(require("./GridCell"));
var _excluded = ["as", "className", "classPrefix", "weekendDate", "rowIndex"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var GridRow = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _locale$dateLocale$op, _locale$dateLocale;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-table' : _props$classPrefix,
    _props$weekendDate = props.weekendDate,
    weekendDate = _props$weekendDate === void 0 ? new Date() : _props$weekendDate,
    rowIndex = props.rowIndex,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    _useCalendar$date = _useCalendar.date,
    selected = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    dateRange = _useCalendar.dateRange,
    hoverRangeValue = _useCalendar.hoverRangeValue,
    isoWeek = _useCalendar.isoWeek,
    weekStart = _useCalendar.weekStart,
    showWeekNumbers = _useCalendar.showWeekNumbers,
    locale = _useCalendar.locale,
    inSameMonth = _useCalendar.inSameMonth,
    disabledDate = _useCalendar.disabledDate,
    onSelect = _useCalendar.onSelect;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var handleSelect = (0, _react.useCallback)(function (date, disabled, event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(date, event);
  }, [onSelect]);
  var renderDays = function renderDays() {
    var days = [];
    var _ref = dateRange || [],
      selectedStartDate = _ref[0],
      selectedEndDate = _ref[1];
    var _ref2 = hoverRangeValue !== null && hoverRangeValue !== void 0 ? hoverRangeValue : [],
      hoverStartDate = _ref2[0],
      hoverEndDate = _ref2[1];
    var isRangeSelectionMode = typeof dateRange !== 'undefined';
    for (var i = 0; i < 7; i += 1) {
      var thisDate = (0, _date.addDays)(weekendDate, i);
      var disabled = disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(thisDate, dateRange, _constants.DATERANGE_DISABLED_TARGET.CALENDAR);
      var unSameMonth = !(inSameMonth !== null && inSameMonth !== void 0 && inSameMonth(thisDate));
      var rangeStart = !unSameMonth && selectedStartDate && (0, _date.isSameDay)(thisDate, selectedStartDate);
      var rangeEnd = !unSameMonth && selectedEndDate && (0, _date.isSameDay)(thisDate, selectedEndDate);
      var isSelected = isRangeSelectionMode ? rangeStart || rangeEnd : (0, _date.isSameDay)(thisDate, selected);

      // TODO-Doma Move those logic that's for DatePicker/DateRangePicker to a separate component
      //           Calendar is not supposed to be reused this way
      var inRange = false;
      // for Selected
      if (selectedStartDate && selectedEndDate) {
        if ((0, _date.isBefore)(thisDate, selectedEndDate) && (0, _date.isAfter)(thisDate, selectedStartDate)) {
          inRange = true;
        }
        if ((0, _date.isBefore)(thisDate, selectedStartDate) && (0, _date.isAfter)(thisDate, selectedEndDate)) {
          inRange = true;
        }
      }

      // for Hovering
      if (!isSelected && hoverStartDate && hoverEndDate) {
        if (!(0, _date.isAfter)(thisDate, hoverEndDate) && !(0, _date.isBefore)(thisDate, hoverStartDate)) {
          inRange = true;
        }
        if (!(0, _date.isAfter)(thisDate, hoverStartDate) && !(0, _date.isBefore)(thisDate, hoverEndDate)) {
          inRange = true;
        }
      }
      days.push(/*#__PURE__*/_react.default.createElement(_GridCell.default, {
        key: (0, _date.format)(thisDate, 'yyyy-MM-dd'),
        date: thisDate,
        disabled: disabled,
        selected: isSelected,
        onSelect: handleSelect,
        unSameMonth: unSameMonth,
        rangeStart: rangeStart,
        rangeEnd: rangeEnd,
        inRange: inRange
      }));
    }
    return days;
  };
  var classes = merge(className, prefix('row'));
  var _ref3 = (_locale$dateLocale$op = locale === null || locale === void 0 || (_locale$dateLocale = locale.dateLocale) === null || _locale$dateLocale === void 0 ? void 0 : _locale$dateLocale.options) !== null && _locale$dateLocale$op !== void 0 ? _locale$dateLocale$op : {},
    firstWeekContainsDate = _ref3.firstWeekContainsDate;

  // ISO week starts on Monday
  var date = isoWeek ? (0, _date.addDays)(weekendDate, 1) : weekendDate;
  var week = (0, _date.format)(date, isoWeek ? 'I' : 'w', {
    locale: locale === null || locale === void 0 ? void 0 : locale.dateLocale,
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStart
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    role: "row",
    "aria-rowindex": rowIndex,
    className: classes
  }), showWeekNumbers && /*#__PURE__*/_react.default.createElement("div", {
    role: "rowheader",
    "aria-label": "Week " + week,
    className: prefix('cell-week-number')
  }, week), renderDays());
});
GridRow.displayName = 'CalendarGridRow';
var _default = exports.default = GridRow;