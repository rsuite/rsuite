'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.FormattedDate = FormattedDate;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("./");
function FormattedDate(_ref) {
  var date = _ref.date,
    formatStr = _ref.formatStr;
  var _useCustom = (0, _.useCustom)('Calendar'),
    formatDate = _useCustom.formatDate;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, formatDate(date, formatStr));
}
var _default = exports.default = FormattedDate;