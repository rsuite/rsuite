'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useDisclosureContext;
var _react = require("react");
var _DisclosureContext = _interopRequireDefault(require("./DisclosureContext"));
function useDisclosureContext(component) {
  var context = (0, _react.useContext)(_DisclosureContext.default);
  if (!context) {
    throw new Error("<" + component + "> component must be rendered within a <Disclosure>");
  }
  return context;
}