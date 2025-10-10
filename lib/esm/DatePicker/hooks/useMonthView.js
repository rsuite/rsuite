'use client';
import { useState } from 'react';
import { useEventCallback } from "../../internals/hooks/index.js";
function useMonthView(props) {
  var onToggleMonthDropdown = props.onToggleMonthDropdown;
  var _useState = useState(false),
    monthView = _useState[0],
    setMonthView = _useState[1];

  /**
   * The callback triggered after the month selection box is opened or closed.
   */
  var toggleMonthView = useEventCallback(function (show) {
    onToggleMonthDropdown === null || onToggleMonthDropdown === void 0 || onToggleMonthDropdown(show);
    setMonthView(show);
  });
  return {
    monthView: monthView,
    setMonthView: setMonthView,
    toggleMonthView: toggleMonthView
  };
}
export default useMonthView;