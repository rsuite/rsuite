'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "limitStartYear", "limitEndYear", "show", "height", "width", "disabledMonth"],
  _excluded2 = ["className", "itemClassName", "as", "itemAs"];
import React, { useCallback, useMemo } from 'react';
import MonthDropdownItem from "./MonthDropdownItem.js";
import { getMonth, getYear } from "../../internals/utils/date/index.js";
import { AutoSizer, FixedSizeList } from "../../internals/Windowing/index.js";
import { useClassNames } from "../../internals/hooks/index.js";
import { useCalendar } from "../hooks/index.js";
import { isEveryDateInMonth } from "../utils/index.js";
// Array representing the index of each month
var MONTHS_INDEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// The height of each item
var ITEM_SIZE = 108;
var MonthDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCalendar = useCalendar(),
    _useCalendar$date = _useCalendar.date,
    date = _useCalendar$date === void 0 ? new Date() : _useCalendar$date,
    targetId = _useCalendar.targetId,
    monthDropdownProps = _useCalendar.monthDropdownProps;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var thisYear = getYear(new Date());
  var startYear = limitStartYear ? thisYear - limitStartYear + 1 : 1900;
  var rowCount = useMemo(function () {
    var endYear = thisYear + limitEndYear;
    return endYear - startYear;
  }, [limitEndYear, startYear, thisYear]);
  var isMonthDisabled = useCallback(function (year, month) {
    if (disabledMonth) {
      return isEveryDateInMonth(year, month, disabledMonth);
    }
    return false;
  }, [disabledMonth]);
  var _ref = monthDropdownProps || {},
    listClassName = _ref.className,
    itemClassName = _ref.itemClassName,
    List = _ref.as,
    _ref$itemAs = _ref.itemAs,
    Item = _ref$itemAs === void 0 ? 'div' : _ref$itemAs,
    restListProps = _objectWithoutPropertiesLoose(_ref, _excluded2);
  var rowRenderer = useCallback(function (_ref2) {
    var index = _ref2.index,
      style = _ref2.style;
    var selectedMonth = getMonth(date);
    var selectedYear = getYear(date);
    var year = startYear + index;
    var isSelectedYear = year === selectedYear;
    var titleClassName = prefix('year', {
      'year-active': isSelectedYear
    });
    return /*#__PURE__*/React.createElement(Item, {
      role: "row",
      "aria-label": "" + year,
      className: merge(itemClassName, prefix('row'), {
        'first-row': index === 0,
        'last-row': index === rowCount - 1
      }),
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      className: titleClassName,
      role: "rowheader"
    }, year), /*#__PURE__*/React.createElement("div", {
      className: prefix('list')
    }, MONTHS_INDEX.map(function (item, month) {
      return /*#__PURE__*/React.createElement(MonthDropdownItem, {
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
  var initialItemIndex = getYear(date) - startYear;
  var initialScrollOffset = ITEM_SIZE * initialItemIndex;
  if (!show) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    role: "grid",
    tabIndex: -1,
    className: classes,
    "aria-labelledby": targetId ? targetId + "-grid-label" : undefined,
    id: targetId ? targetId + "-calendar-month-dropdown" : undefined,
    "data-testid": "calendar-month-dropdown"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: prefix('scroll')
  }, /*#__PURE__*/React.createElement(AutoSizer, {
    defaultHeight: defaultHeight,
    defaultWidth: defaultWidth
  }, function (_ref3) {
    var height = _ref3.height,
      width = _ref3.width;
    return /*#__PURE__*/React.createElement(FixedSizeList, _extends({
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
export default MonthDropdown;