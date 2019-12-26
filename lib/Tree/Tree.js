"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _TreePicker = _interopRequireDefault(require("../TreePicker"));

/* eslint-disable */
var Tree = React.forwardRef(function (props, ref) {
  return React.createElement(_TreePicker.default, (0, _extends2.default)({
    inline: true,
    ref: ref
  }, props));
});
var _default = Tree;
exports.default = _default;
module.exports = exports.default;