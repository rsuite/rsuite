import React from 'react';
import { CalendarProps as CalendarContainerProps } from '../Calendar/CalendarContainer';
import { DATERANGE_DISABLED_TARGET } from '../internals/constants';
import { DateRange } from './types';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import { DateRangePickerLocale } from '../locales';
type OmitCalendarCoreTypes = 'disabledDate' | 'onSelect' | 'onMouseMove' | 'calendarDate' | 'format' | 'locale' | 'renderTitle';
export interface CalendarProps extends WithAsProps, Omit<CalendarContainerProps, OmitCalendarCoreTypes> {
    calendarDateRange?: DateRange;
    disabledDate?: (date: Date, selectValue: [] | [Date] | [Date, Date], type: DATERANGE_DISABLED_TARGET) => boolean;
    format?: string;
    hoverRangeValue?: DateRange;
    index: number;
    isoWeek?: boolean;
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    limitEndYear?: number;
    limitStartYear?: number;
    locale?: Partial<DateRangePickerLocale>;
    showWeekNumbers?: boolean;
    value?: [] | [Date] | [Date, Date];
    renderTitle?: (date: Date, calendarKey: 'start' | 'end') => React.ReactNode;
    onChangeCalendarMonth?: (index: number, date: Date) => void;
    onChangeCalendarTime?: (index: number, date: Date) => void;
    onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
    onMouseMove?: (date: Date) => void;
}
declare const Calendar: RsRefForwardingComponent<'div', CalendarProps>;
export default Calendar;
