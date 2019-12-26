"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ProgressCircle = _interopRequireDefault(require("./ProgressCircle"));

var _ProgressLine = _interopRequireDefault(require("./ProgressLine"));

var _default = {
  Line: _ProgressLine.default,
  Circle: _ProgressCircle.default
};
exports.default = _default;
module.exports = exports.default;