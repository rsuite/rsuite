import React, { useContext } from 'react';

export interface DateRangePickerContextValue {
  /**
   * Whether to complete the selection.
   */
  isSelectedIdle?: boolean;
}

export const DateRangePickerContext = React.createContext<DateRangePickerContextValue>({} as any);

export const useDateRangePickerContext = (): DateRangePickerContextValue => {
  return useContext(DateRangePickerContext) || {};
};

export const DateRangePickerProvider = DateRangePickerContext.Provider;
