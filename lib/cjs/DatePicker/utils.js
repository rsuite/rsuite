'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.deprecatedPropTypes = void 0;
exports.getDefaultRanges = getDefaultRanges;
exports.getRestProps = exports.getRanges = void 0;
exports.splitRanges = splitRanges;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _propTypes2 = require("../internals/propTypes");
var _Picker = require("../internals/Picker");
var _date = require("../internals/utils/date");
var _excluded = ["value"];
function getDefaultRanges(value) {
  var today = (0, _date.startOfToday)();

  /**
   * If it is an array type, it returns the default shortcut key suitable for DateRangePicker Toolbar,
   * otherwise it returns the default shortcut key suitable for DatePicker Toolbar
   */
  if (value instanceof Array) {
    return [{
      label: 'today',
      value: [(0, _date.startOfDay)(today), (0, _date.endOfDay)(today)]
    }, {
      label: 'yesterday',
      value: [(0, _date.startOfDay)((0, _date.subDays)(today, 1)), (0, _date.endOfDay)((0, _date.subDays)(today, 1))]
    }, {
      label: 'last7Days',
      value: [(0, _date.startOfDay)((0, _date.subDays)(today, 6)), (0, _date.endOfDay)(today)]
    }];
  }
  return [{
    label: 'today',
    value: today
  }, {
    label: 'yesterday',
    value: (0, _date.subDays)(today, 1)
  }];
}
var generateRangesIterator = function generateRangesIterator(_ref) {
  var calendarDate = _ref.calendarDate;
  return function (_ref2) {
    var value = _ref2.value,
      rest = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded);
    return (0, _extends2.default)({
      value: typeof value === 'function' ? value(calendarDate) : value
    }, rest);
  };
};

/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param calendarDate
 */
var getRanges = exports.getRanges = function getRanges(_ref3) {
  var ranges = _ref3.ranges,
    calendarDate = _ref3.calendarDate;
  return typeof ranges === 'undefined' ? getDefaultRanges(calendarDate) : ranges.map(generateRangesIterator({
    calendarDate: calendarDate
  }));
};
function splitRanges(ranges) {
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
var deprecatedPropTypes = exports.deprecatedPropTypes = {
  disabledDate: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "shouldDisableDate" property instead.'),
  disabledHours: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "shouldDisableHour" property instead.'),
  disabledMinutes: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "shouldDisableMinute" property instead.'),
  disabledSeconds: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.func, 'Use "shouldDisableSecond" property instead.')
};
var getRestProps = exports.getRestProps = function getRestProps(props, omitProps) {
  if (omitProps === void 0) {
    omitProps = [];
  }
  return (0, _omit.default)(props, [].concat(_Picker.omitTriggerPropKeys, _date.calendarOnlyProps, omitProps));
};