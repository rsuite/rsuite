'use client';
import { useState } from 'react';
var defaultSelectedState = {
  selectedPattern: 'y',
  selectionStart: 0,
  selectionEnd: 0
};
export function useSelectedState() {
  var _useState = useState(defaultSelectedState),
    selectedState = _useState[0],
    setSelectedState = _useState[1];
  return {
    selectedState: selectedState,
    setSelectedState: setSelectedState
  };
}
export default useSelectedState;