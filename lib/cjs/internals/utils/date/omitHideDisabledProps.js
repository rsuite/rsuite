'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.omitHideDisabledProps = exports.default = void 0;
var _omitBy = _interopRequireDefault(require("lodash/omitBy"));
/**
 * Omit the calendar-only props from an object.
 *
 * @param props - The object to omit props from.
 * @returns The object with calendar-only props omitted.
 */
var omitHideDisabledProps = exports.omitHideDisabledProps = function omitHideDisabledProps(props) {
  return (0, _omitBy.default)(props, function (_val, key) {
    return key.startsWith('disabled') || key.startsWith('hide') || key.startsWith('shouldDisable');
  });
};
var _default = exports.default = omitHideDisabledProps;