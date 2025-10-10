'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _hooks = require("../../internals/hooks");
function useMonthView(props) {
  var onToggleMonthDropdown = props.onToggleMonthDropdown;
  var _useState = (0, _react.useState)(false),
    monthView = _useState[0],
    setMonthView = _useState[1];

  /**
   * The callback triggered after the month selection box is opened or closed.
   */
  var toggleMonthView = (0, _hooks.useEventCallback)(function (show) {
    onToggleMonthDropdown === null || onToggleMonthDropdown === void 0 || onToggleMonthDropdown(show);
    setMonthView(show);
  });
  return {
    monthView: monthView,
    setMonthView: setMonthView,
    toggleMonthView: toggleMonthView
  };
}
var _default = exports.default = useMonthView;