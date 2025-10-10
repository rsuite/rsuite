'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _ScrollView = _interopRequireDefault(require("../../internals/ScrollView"));
var _excluded = ["prefix", "title", "children"];
var TimeColumn = function TimeColumn(props) {
  var prefix = props.prefix,
    title = props.title,
    children = props.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('column')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('column-title')
  }, title), /*#__PURE__*/_react.default.createElement(_ScrollView.default, (0, _extends2.default)({
    customScrollbar: true,
    as: "ul",
    role: "listbox"
  }, rest), children));
};
var _default = exports.default = TimeColumn;