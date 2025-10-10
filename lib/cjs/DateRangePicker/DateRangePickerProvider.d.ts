import React from 'react';
export interface DateRangePickerContextValue {
    /**
     * Whether to complete the selection.
     */
    isSelectedIdle?: boolean;
}
export declare const DateRangePickerContext: React.Context<DateRangePickerContextValue>;
export declare const useDateRangePickerContext: () => DateRangePickerContextValue;
export declare const DateRangePickerProvider: React.Provider<DateRangePickerContextValue>;
