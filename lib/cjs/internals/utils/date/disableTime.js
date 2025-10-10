'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.disableTime = disableTime;
var _pick = _interopRequireDefault(require("lodash/pick"));
var _getHours = _interopRequireDefault(require("date-fns/getHours"));
var _getMinutes = _interopRequireDefault(require("date-fns/getMinutes"));
var _getSeconds = _interopRequireDefault(require("date-fns/getSeconds"));
var _types = require("./types");
var HOURS_PATTERN = /(Hours?)/;
var MINUTES_PATTERN = /(Minutes?)/;
var SECONDS_PATTERN = /(Seconds?)/;

/**
 * Verify that the time is valid.
 *
 * @param props - The calendar props.
 * @param date - The date to check.
 * @returns Whether the time is disabled.
 */
function disableTime(props, date) {
  if (!date) {
    return false;
  }
  var disabledTimeProps = [_types.TimeProp.DisabledHours, _types.TimeProp.DisabledMinutes, _types.TimeProp.DisabledSeconds, _types.TimeProp.ShouldDisableHour, _types.TimeProp.ShouldDisableMinute, _types.TimeProp.ShouldDisableSecond];
  var calendarProps = (0, _pick.default)(props, disabledTimeProps);
  var mapProps = new Map(Object.entries(calendarProps));
  return Array.from(mapProps.keys()).some(function (key) {
    if (HOURS_PATTERN.test(key)) {
      var _mapProps$get;
      return (_mapProps$get = mapProps.get(key)) === null || _mapProps$get === void 0 ? void 0 : _mapProps$get((0, _getHours.default)(date), date);
    }
    if (MINUTES_PATTERN.test(key)) {
      var _mapProps$get2;
      return (_mapProps$get2 = mapProps.get(key)) === null || _mapProps$get2 === void 0 ? void 0 : _mapProps$get2((0, _getMinutes.default)(date), date);
    }
    if (SECONDS_PATTERN.test(key)) {
      var _mapProps$get3;
      return (_mapProps$get3 = mapProps.get(key)) === null || _mapProps$get3 === void 0 ? void 0 : _mapProps$get3((0, _getSeconds.default)(date), date);
    }
    return false;
  });
}
var _default = exports.default = disableTime;