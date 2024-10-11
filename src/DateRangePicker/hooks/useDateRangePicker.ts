import { useContext } from 'react';
import { DateRangePickerContext, DateRangePickerContextValue } from '../DateRangePickerProvider';

export const useDateRangePicker = (): DateRangePickerContextValue => {
  return useContext(DateRangePickerContext) || {};
};
