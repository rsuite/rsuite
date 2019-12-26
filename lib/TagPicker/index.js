"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defaultProps = _interopRequireDefault(require("recompose/defaultProps"));

var _compose = _interopRequireDefault(require("recompose/compose"));

var _InputPicker = _interopRequireDefault(require("../InputPicker/InputPicker"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var enhance = (0, _compose.default)((0, _withLocale.default)(['Picker', 'InputPicker']), (0, _defaultProps.default)({
  multi: true
}));

var _default = enhance(_InputPicker.default);

exports.default = _default;
module.exports = exports.default;