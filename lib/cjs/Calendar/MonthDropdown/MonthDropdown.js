'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _MonthDropdownItem = _interopRequireDefault(require("./MonthDropdownItem"));
var _date = require("../../internals/utils/date");
var _Windowing = require("../../internals/Windowing");
var _hooks = require("../../internals/hooks");
var _hooks2 = require("../hooks");
var _utils = require("../utils");
var _excluded = ["as", "className", "classPrefix", "limitStartYear", "limitEndYear", "show", "height", "width", "disabledMonth"],
  _excluded2 = ["className", "itemClassName", "as", "itemAs"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Array representing the index of each month
var MONTHS_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// The height of each item
var ITEM_SIZE = 108;
var MonthDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'calendar-month-dropdown' : _props$classPrefix,
    limitStartYear = props.limitStartYear,
    _props$limitEndYear = props.limitEndYear,
    limitEndYear = _props$limitEndYear === void 0 ? 5 : _props$limitEndYear,
    show = props.show,
    _props$height = props.height,
    defaultHeight = _props$height === void 0 ? 221 : _props$height,
    _props$width = props.width,
    defaultWidth = _props$width === void 0 ? 256 : _props$width,
    disabledMonth = props.disabledMonth,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCalendar = (0, _hooks2.useCalendar)(),
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    targetId = _useCalendar.targetId,
    monthDropdownProps = _useCalendar.monthDropdownProps;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var thisYear = (0, _date.getYear)(new Date());
  var startYear = limitStartYear ? thisYear - limitStartYear + 1 : 1900;
  var rowCount = (0, _react.useMemo)(function () {
    var endYear = thisYear + limitEndYear;
    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);
  var isMonthDisabled = (0, _react.useCallback)(function (year, month) {
    if (disabledMonth) {
      return (0, _utils.isEveryDateInMonth)(year, month, disabledMonth);
    }
    return false;
  }, [disabledMonth]);
  var _ref = monthDropdownProps || {},
    listClassName = _ref.className,
    itemClassName = _ref.itemClassName,
    List = _ref.as,
    _ref$itemAs = _ref.itemAs,
    Item = _ref$itemAs === void 0 ? 'div' : _ref$itemAs,
    restListProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
  var rowRenderer = (0, _react.useCallback)(function (_ref2) {
    var index = _ref2.index,
      style = _ref2.style;
    var selectedMonth = (0, _date.getMonth)(date);
    var selectedYear = (0, _date.getYear)(date);
    var year = startYear + index;
    var isSelectedYear = year === selectedYear;
    var titleClassName = prefix('year', {
      'year-active': isSelectedYear
    });
    return /*#__PURE__*/_react.default.createElement(Item, {
      role: "row",
      "aria-label": "" + year,
      className: merge(itemClassName, prefix('row'), {
        'first-row': index === 0,
        'last-row': index === rowCount - 1
      }),
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: titleClassName,
      role: "rowheader"
    }, year), /*#__PURE__*/_react.default.createElement("div", {
      className: prefix('list')
    }, MONTHS_INDEX.map(function (item, month) {
      return /*#__PURE__*/_react.default.createElement(_MonthDropdownItem.default, {
        disabled: isMonthDisabled(year, month),
        active: isSelectedYear && month === selectedMonth,
        key: month + "_" + item,
        month: month + 1,
        year: year
      });
    })));
  }, [Item, date, isMonthDisabled, merge, prefix, itemClassName, rowCount, startYear]);
  var classes = merge(className, withClassPrefix(), {
    show: show
  });
  var initialItemIndex = (0, _date.getYear)(date) - startYear;
  var initialScrollOffset = ITEM_SIZE * initialItemIndex;
  if (!show) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    role: "grid",
    tabIndex: -1,
    className: classes,
    "aria-labelledby": targetId ? targetId + "-grid-label" : undefined,
    id: targetId ? targetId + "-calendar-month-dropdown" : undefined,
    "data-testid": "calendar-month-dropdown"
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('scroll')
  }, /*#__PURE__*/_react.default.createElement(_Windowing.AutoSizer, {
    defaultHeight: defaultHeight,
    defaultWidth: defaultWidth
  }, function (_ref3) {
    var height = _ref3.height,
      width = _ref3.width;
    return /*#__PURE__*/_react.default.createElement(_Windowing.FixedSizeList, (0, _extends2.default)({
      className: merge(prefix('row-wrapper'), listClassName),
      width: width || defaultWidth,
      height: height || defaultHeight,
      itemSize: ITEM_SIZE,
      itemCount: rowCount,
      initialScrollOffset: initialScrollOffset,
      innerElementType: List
    }, restListProps), rowRenderer);
  })));
});
MonthDropdown.displayName = 'MonthDropdown';
var _default = exports.default = MonthDropdown;