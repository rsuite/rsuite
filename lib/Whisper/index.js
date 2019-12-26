"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Whisper = _interopRequireDefault(require("./Whisper"));

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _default = (0, _withLocale.default)([])(_Whisper.default);

exports.default = _default;
module.exports = exports.default;