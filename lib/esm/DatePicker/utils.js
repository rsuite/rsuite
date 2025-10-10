'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["value"];
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { deprecatePropTypeNew } from "../internals/propTypes/index.js";
import { omitTriggerPropKeys } from "../internals/Picker/index.js";
import { subDays, startOfDay, endOfDay, calendarOnlyProps, startOfToday } from "../internals/utils/date/index.js";
export function getDefaultRanges(value) {
  var today = startOfToday();

  /**
   * If it is an array type, it returns the default shortcut key suitable for DateRangePicker Toolbar,
   * otherwise it returns the default shortcut key suitable for DatePicker Toolbar
   */
  if (value instanceof Array) {
    return [{
      label: 'today',
      value: [startOfDay(today), endOfDay(today)]
    }, {
      label: 'yesterday',
      value: [startOfDay(subDays(today, 1)), endOfDay(subDays(today, 1))]
    }, {
      label: 'last7Days',
      value: [startOfDay(subDays(today, 6)), endOfDay(today)]
    }];
  }
  return [{
    label: 'today',
    value: today
  }, {
    label: 'yesterday',
    value: subDays(today, 1)
  }];
}
var generateRangesIterator = function generateRangesIterator(_ref) {
  var calendarDate = _ref.calendarDate;
  return function (_ref2) {
    var value = _ref2.value,
      rest = _objectWithoutPropertiesLoose(_ref2, _excluded);
    return _extends({
      value: typeof value === 'function' ? value(calendarDate) : value
    }, rest);
  };
};

/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param calendarDate
 */
export var getRanges = function getRanges(_ref3) {
  var ranges = _ref3.ranges,
    calendarDate = _ref3.calendarDate;
  return typeof ranges === 'undefined' ? getDefaultRanges(calendarDate) : ranges.map(generateRangesIterator({
    calendarDate: calendarDate
  }));
};
export function splitRanges(ranges) {
  // The shortcut option on the left side of the calendar panel
  var sideRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
    return (range === null || range === void 0 ? void 0 : range.placement) === 'left';
  })) || [];

  // The shortcut option on the bottom of the calendar panel
  var bottomRanges = (ranges === null || ranges === void 0 ? void 0 : ranges.filter(function (range) {
    return (range === null || range === void 0 ? void 0 : range.placement) === 'bottom' || (range === null || range === void 0 ? void 0 : range.placement) === undefined;
  })) || [];
  return {
    sideRanges: sideRanges,
    bottomRanges: bottomRanges
  };
}
export var deprecatedPropTypes = {
  disabledDate: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableDate" property instead.'),
  disabledHours: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableHour" property instead.'),
  disabledMinutes: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableMinute" property instead.'),
  disabledSeconds: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableSecond" property instead.')
};
export var getRestProps = function getRestProps(props, omitProps) {
  if (omitProps === void 0) {
    omitProps = [];
  }
  return omit(props, [].concat(omitTriggerPropKeys, calendarOnlyProps, omitProps));
};