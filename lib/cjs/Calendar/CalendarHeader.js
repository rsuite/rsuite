'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _PagePrevious = _interopRequireDefault(require("@rsuite/icons/PagePrevious"));
var _PageNext = _interopRequireDefault(require("@rsuite/icons/PageNext"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _Button = _interopRequireDefault(require("../Button"));
var _hooks = require("../internals/hooks");
var _date = require("../internals/utils/date");
var _CustomProvider = require("../CustomProvider");
var _hooks2 = require("./hooks");
var _hooks3 = require("../DateRangePicker/hooks");
var _excluded = ["as", "className", "classPrefix", "disabledBackward", "disabledForward", "showDate", "showMonth", "showTime", "disabledTime", "onMoveBackward", "onMoveForward", "onToggleMonthDropdown", "onToggleTimeDropdown", "renderTitle", "renderToolbar"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var CalendarHeader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-header' : _props$classPrefix,
    disabledBackward = props.disabledBackward,
    disabledForward = props.disabledForward,
    showDate = props.showDate,
    showMonth = props.showMonth,
    showTime = props.showTime,
    disabledTime = props.disabledTime,
    onMoveBackward = props.onMoveBackward,
    onMoveForward = props.onMoveForward,
    onToggleMonthDropdown = props.onToggleMonthDropdown,
    onToggleTimeDropdown = props.onToggleTimeDropdown,
    renderTitleProp = props.renderTitle,
    renderToolbar = props.renderToolbar,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    locale = _useCalendar.locale,
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    format = _useCalendar.format,
    inline = _useCalendar.inline,
    disabledDate = _useCalendar.disabledDate,
    targetId = _useCalendar.targetId;
  var _useDateRangePicker = (0, _hooks3.useDateRangePicker)(),
    isSelectedIdle = _useDateRangePicker.isSelectedIdle;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var btnProps = {
    appearance: 'subtle',
    size: inline ? 'sm' : 'xs'
  };
  var timeFormat = (0, _react.useMemo)(function () {
    var defaultTimeFormat = (locale === null || locale === void 0 ? void 0 : locale.shortTimeFormat) || 'HH:mm';
    if (!format) {
      return defaultTimeFormat;
    }
    return (0, _date.extractTimeFormat)(format) || defaultTimeFormat;
  }, [format, locale]);
  var dateFormat = (0, _react.useMemo)(function () {
    if (showMonth) {
      return (locale === null || locale === void 0 ? void 0 : locale.formattedMonthPattern) || 'yyyy-MM';
    }
    return 'yyyy';
  }, [locale, showMonth]);
  var renderTitle = function renderTitle() {
    var _renderTitleProp;
    return (_renderTitleProp = renderTitleProp === null || renderTitleProp === void 0 ? void 0 : renderTitleProp(date)) !== null && _renderTitleProp !== void 0 ? _renderTitleProp : date && /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
      date: date,
      formatStr: dateFormat
    });
  };
  var dateTitleClasses = prefix('title', 'title-date', {
    error: disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date)
  });
  var timeTitleClasses = prefix('title', 'title-time', {
    error: disabledTime === null || disabledTime === void 0 ? void 0 : disabledTime(date)
  });
  var backwardClass = prefix('backward', {
    'btn-disabled': disabledBackward
  });
  var forwardClass = prefix('forward', {
    'btn-disabled': disabledForward
  });
  var monthToolbar = /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('month-toolbar')
  }, /*#__PURE__*/_react.default.createElement(_IconButton.default, (0, _extends2.default)({}, btnProps, {
    // TODO: aria-label should be translated by i18n
    "aria-label": "Previous month",
    className: backwardClass,
    onClick: disabledBackward ? undefined : onMoveBackward,
    icon: /*#__PURE__*/_react.default.createElement(_PagePrevious.default, null)
  })), /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({}, btnProps, {
    "aria-label": "Select month",
    id: targetId ? targetId + "-grid-label" : undefined,
    className: dateTitleClasses,
    onClick: onToggleMonthDropdown
  }), renderTitle()), /*#__PURE__*/_react.default.createElement(_IconButton.default, (0, _extends2.default)({}, btnProps, {
    "aria-label": "Next month",
    className: forwardClass,
    onClick: disabledForward ? undefined : onMoveForward,
    icon: /*#__PURE__*/_react.default.createElement(_PageNext.default, null)
  })));
  var hasMonth = showDate || showMonth;
  var classes = merge(className, withClassPrefix({
    'has-month': hasMonth,
    'has-time': showTime
  }));

  // If the date is not selected, the time cannot be selected (it only works in DateRangePicker).
  var disableSelectTime = typeof isSelectedIdle === 'undefined' ? false : !isSelectedIdle;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), hasMonth && monthToolbar, showTime && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('time-toolbar')
  }, /*#__PURE__*/_react.default.createElement(_Button.default, (0, _extends2.default)({}, btnProps, {
    "aria-label": "Select time",
    className: timeTitleClasses,
    onClick: onToggleTimeDropdown,
    disabled: disableSelectTime
  }), date && /*#__PURE__*/_react.default.createElement(_CustomProvider.FormattedDate, {
    date: date,
    formatStr: timeFormat
  }))), renderToolbar === null || renderToolbar === void 0 ? void 0 : renderToolbar(date));
});
CalendarHeader.displayName = 'CalendarHeader';
var _default = exports.default = CalendarHeader;