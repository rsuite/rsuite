'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _date = require("../../internals/utils/date");
var _hooks = require("../../internals/hooks");
var _utils = require("../../internals/utils");
var _CustomProvider = require("../../CustomProvider");
var _hooks2 = require("../hooks");
var _utils2 = require("../utils");
var _excluded = ["as", "className", "classPrefix", "active", "disabled", "month", "year"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var MonthDropdownItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-month-dropdown-cell' : _props$classPrefix,
    active = props.active,
    disabled = props.disabled,
    _props$month = props.month,
    month = _props$month === void 0 ? 0 : _props$month,
    year = props.year,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    date = _useCalendar.date,
    onSelect = _useCalendar.onChangeMonth,
    overrideLocale = _useCalendar.locale;
  var _useCustom = (0, _CustomProvider.useCustom)('Calendar'),
    getLocale = _useCustom.getLocale,
    formatDate = _useCustom.formatDate;
  var _getLocale = getLocale('Calendar', overrideLocale),
    formatStr = _getLocale.formattedMonthPattern;
  var currentMonth = (0, _react.useMemo)(function () {
    if (year && month) {
      return (0, _utils.composeFunctions)(function (d) {
        return (0, _date.setYear)(d, year);
      }, function (d) {
        return (0, _date.setMonth)(d, month - 1);
      })(date);
    }
    return date;
  }, [date, month, year]);
  var handleClick = (0, _hooks.useEventCallback)(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(currentMonth, event);
  });
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    active: active
  }), {
    disabled: disabled
  });
  var ariaLabel = currentMonth ? (0, _utils2.getAriaLabel)(currentMonth, formatStr, formatDate) : '';
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    key: month,
    role: "gridcell",
    "aria-selected": active,
    "aria-disabled": disabled,
    "aria-label": ariaLabel,
    tabIndex: active ? 0 : -1,
    ref: ref,
    className: classes,
    onClick: handleClick
  }, rest), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('content')
  }, formatDate(currentMonth, 'MMM')));
});
MonthDropdownItem.displayName = 'MonthDropdownItem';
var _default = exports.default = MonthDropdownItem;