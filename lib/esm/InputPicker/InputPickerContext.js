'use client';
import React from 'react';
var InputPickerContext = /*#__PURE__*/React.createContext({
  tagProps: {},
  trigger: 'Enter'
});
export function useTagContext() {
  return React.useContext(InputPickerContext);
}
export var TagProvider = InputPickerContext.Provider;
export default InputPickerContext;