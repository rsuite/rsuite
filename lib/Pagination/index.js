"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _withLocale = _interopRequireDefault(require("../IntlProvider/withLocale"));

var _Pagination = _interopRequireDefault(require("./Pagination"));

var _default = (0, _withLocale.default)(['Pagination'])(_Pagination.default);

exports.default = _default;
module.exports = exports.default;