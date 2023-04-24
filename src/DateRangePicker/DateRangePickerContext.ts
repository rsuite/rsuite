import React, { useContext } from 'react';

interface DateRangePickerContextValue {
  isSelectedIdle?: boolean;
}

const DateRangePickerContext = React.createContext<DateRangePickerContextValue>({} as any);

export default DateRangePickerContext;

export const useDateRangePickerContext = (): DateRangePickerContextValue =>
  useContext(DateRangePickerContext) || {};
