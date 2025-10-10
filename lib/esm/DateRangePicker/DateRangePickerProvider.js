'use client';
import React, { useContext } from 'react';
export var DateRangePickerContext = /*#__PURE__*/React.createContext({});
export var useDateRangePickerContext = function useDateRangePickerContext() {
  return useContext(DateRangePickerContext) || {};
};
export var DateRangePickerProvider = DateRangePickerContext.Provider;