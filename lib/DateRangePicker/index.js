"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DateRangePicker = _interopRequireDefault(require("./DateRangePicker"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var utils = _interopRequireWildcard(require("./disabledDateUtils"));

var EnhancedDateRangePicker = (0, _withLocale.default)(['DateRangePicker'])(_DateRangePicker.default);
Object.keys(utils).forEach(function (key) {
  if (key !== '__esModule') {
    EnhancedDateRangePicker[key] = utils[key];
  }
});
var _default = EnhancedDateRangePicker;
exports.default = _default;
module.exports = exports.default;