'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.copyTime = copyTime;
exports.default = void 0;
var _getHours = _interopRequireDefault(require("date-fns/getHours"));
var _getMinutes = _interopRequireDefault(require("date-fns/getMinutes"));
var _getSeconds = _interopRequireDefault(require("date-fns/getSeconds"));
var _set = _interopRequireDefault(require("date-fns/set"));
var _isValid = _interopRequireDefault(require("date-fns/isValid"));
/**
 * Copy the time from one date to another.
 *
 * @param from - The source date.
 * @param to - The target date.
 * @returns The target date with the time copied from the source date.
 */
function copyTime(_ref) {
  var from = _ref.from,
    to = _ref.to;
  if (!(0, _isValid.default)(from) || !(0, _isValid.default)(to)) {
    return to;
  }
  return (0, _set.default)(to, {
    hours: (0, _getHours.default)(from),
    minutes: (0, _getMinutes.default)(from),
    seconds: (0, _getSeconds.default)(from)
  });
}
var _default = exports.default = copyTime;