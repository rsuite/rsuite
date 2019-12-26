"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _default = (0, _withLocale.default)(['DatePicker'])(_DatePicker.default);

exports.default = _default;
module.exports = exports.default;