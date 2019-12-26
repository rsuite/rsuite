"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _CheckTreePicker = _interopRequireDefault(require("../CheckTreePicker"));

var CheckTree = React.forwardRef(function (props, ref) {
  return React.createElement(_CheckTreePicker.default, (0, _extends2.default)({
    ref: ref,
    inline: true
  }, props));
});
CheckTree.displayName = 'CheckTree';
var _default = CheckTree;
exports.default = _default;
module.exports = exports.default;