import React, { HTMLAttributes } from 'react';
import { CalendarHeaderProps } from './CalendarHeader';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import { CalendarLocale } from '../locales';
import { CalendarState } from './hooks';
import { MonthDropdownProps } from './types';
export interface CalendarProps extends WithAsProps, Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onChange' | 'onMouseMove'>, CalendarHeaderProps {
    /**
     * The panel render based on date range
     */
    dateRange?: Date[];
    /**
     * The Id of the target element that triggers the opening of the calendar
     */
    targetId?: string;
    /**
     * Date displayed on the current page
     */
    calendarDate: Date;
    /**
     * Whether to show week numbers
     */
    showWeekNumbers?: boolean;
    /**
     * Whether to show meridiem
     */
    showMeridiem?: boolean;
    /**
     * Whether inline mode
     */
    inline?: boolean;
    /**
     * Default state of the calendar, can be `MONTH` or `TIME`
     */
    defaultState?: CalendarState;
    /**
     * Disabled dates on the calendar
     */
    disabledDate?: (date: Date) => boolean;
    /**
     * Disabled hours on time view
     */
    disabledHours?: (hour: number, date: Date) => boolean;
    /**
     * Disabled minutes on time view
     */
    disabledMinutes?: (minute: number, date: Date) => boolean;
    /**
     * Hidden seconds on time view
     */
    disabledSeconds?: (second: number, date: Date) => boolean;
    /**
     * Format of the date
     */
    format: string;
    /**
     * Hidden hours on time view
     */
    hideHours?: (hour: number, date: Date) => boolean;
    /**
     * Hidden minutes on time view
     */
    hideMinutes?: (minute: number, date: Date) => boolean;
    /**
     * Hidden seconds on time view
     */
    hideSeconds?: (second: number, date: Date) => boolean;
    /**
     * The value that mouse hover on in range selection
     */
    hoverRangeValue?: [Date, Date];
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     *
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     */
    isoWeek?: boolean;
    /**
     * The index of the calendar
     */
    index?: number;
    /**
     * the index of the first day of the week (0 - Sunday)
     * If `isoWeek` is `true`, the value of `weekStart` is ignored.
     *
     * @default 0
     */
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Limit showing how many years in the future
     */
    limitEndYear?: number;
    /**
     * Limit showing how many years in the past
     */
    limitStartYear?: number;
    /**
     * Custom locale object
     *
     * @see https://rsuitejs.com/guide/i18n/#calendar
     */
    locale?: CalendarLocale;
    /**
     * The props for the Month Dropdown component.
     */
    monthDropdownProps?: MonthDropdownProps;
    /**
     * Callback after the date has changed
     */
    onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;
    /**
     * Callback after the time has changed
     */
    onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
    /**
     * Callback after mouse enter other date cell
     */
    onMouseMove?: (date: Date) => void;
    /**
     * Switch to the callback triggered after the previous month
     */
    onMoveBackward?: (nextPageDate: Date) => void;
    /**
     * Switch to the callback triggered after the next month
     */
    onMoveForward?: (nextPageDate: Date) => void;
    /**
     * Callback fired before the date selected
     */
    onSelect?: (date: Date, event: React.MouseEvent) => void;
    /**
     * Custom rendering cell
     */
    renderCell?: (date: Date) => React.ReactNode;
    /**
     * Custom rendering cell on the picker
     */
    renderCellOnPicker?: (date: Date) => React.ReactNode;
    /**
     * Custom cell classes base on it's date
     */
    cellClassName?: (date: Date) => string | undefined;
    /**
     * Called when opening the month view
     */
    onToggleMonthDropdown?: (toggle: boolean) => void;
    /**
     * Called when opening the time view
     */
    onToggleTimeDropdown?: (toggle: boolean) => void;
}
declare const CalendarContainer: RsRefForwardingComponent<'div', CalendarProps>;
export default CalendarContainer;
