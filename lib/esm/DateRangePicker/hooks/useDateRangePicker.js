'use client';
import { useContext } from 'react';
import { DateRangePickerContext } from "../DateRangePickerProvider.js";
export var useDateRangePicker = function useDateRangePicker() {
  return useContext(DateRangePickerContext) || {};
};