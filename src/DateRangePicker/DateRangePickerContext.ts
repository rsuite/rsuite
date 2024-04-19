import React, { useContext } from 'react';

interface DateRangePickerContextValue {
  /**
   * Whether to complete the selection.
   */
  isSelectedIdle?: boolean;
}

const DateRangePickerContext = React.createContext<DateRangePickerContextValue>({} as any);

export const useDateRangePickerContext = (): DateRangePickerContextValue => {
  return useContext(DateRangePickerContext) || {};
};

export default DateRangePickerContext;
