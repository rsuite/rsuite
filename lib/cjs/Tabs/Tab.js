'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var Tab = function Tab() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
};
Tab.displayName = 'Tab';
Tab.propTypes = {
  disabled: _propTypes.default.bool,
  eventKey: _propTypes.default.string,
  title: _propTypes.default.node,
  children: _propTypes.default.node,
  icon: _propTypes.default.node
};
var _default = exports.default = Tab;