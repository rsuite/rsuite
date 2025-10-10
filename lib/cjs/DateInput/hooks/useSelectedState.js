'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useSelectedState = useSelectedState;
var _react = require("react");
var defaultSelectedState = {
  selectedPattern: 'y',
  selectionStart: 0,
  selectionEnd: 0
};
function useSelectedState() {
  var _useState = (0, _react.useState)(defaultSelectedState),
    selectedState = _useState[0],
    setSelectedState = _useState[1];
  return {
    selectedState: selectedState,
    setSelectedState: setSelectedState
  };
}
var _default = exports.default = useSelectedState;