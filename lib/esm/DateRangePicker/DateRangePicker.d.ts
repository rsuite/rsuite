import React from 'react';
import { PickerComponent } from '../internals/Picker';
import type { DisabledDateFunction, RangeType, DateRange } from './types';
import type { FormControlBaseProps, PickerBaseProps } from '../internals/types';
import type { DateRangePickerLocale } from '../locales';
import type { MonthDropdownProps } from '../Calendar/types';
export interface DateRangePickerProps extends PickerBaseProps<DateRangePickerLocale>, FormControlBaseProps<DateRange | null> {
    /**
     * Custom caret component
     */
    caretAs?: React.ElementType | null;
    /**
     * Predefined date ranges
     */
    ranges?: RangeType[];
    /**
     * Format of the date displayed in the input box
     */
    format?: string;
    /**
     * Rendered as an input, the date can be entered via the keyboard.
     * @default true
     */
    editable?: boolean;
    /**
     * The date range that will be selected when you click on the date
     */
    hoverRange?: 'week' | 'month' | ((date: Date) => DateRange);
    /**
     * Whether to click once on selected date range，Can be used with hoverRange
     */
    oneTap?: boolean;
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     */
    isoWeek?: boolean;
    /**
     * The index of the first day of the week (0 - Sunday)
     * If `isoWeek` is `true`, the value of `weekStart` is ignored.
     *
     * @default 0
     */
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * A label displayed at the beginning of toggle button
     */
    label?: React.ReactNode;
    /**
     * Set the upper limit of the available year relative to the current selection date.
     *
     * @default 1000
     */
    limitEndYear?: number;
    /**
     * Set the lower limit of the available year relative to the current selection date
     */
    limitStartYear?: number;
    /**
     * Whether to display a loading state indicator
     */
    loading?: boolean;
    /**
     *  to show week numbers
     */
    showWeekNumbers?: boolean;
    /**
     * Show only one calendar select
     */
    showOneCalendar?: boolean;
    /**
     * @deprecated Use `showMeridiem` instead
     */
    showMeridian?: boolean;
    /**
     * Meridiem format for 12-hour time
     */
    showMeridiem?: boolean;
    /**
     * Whether to display the formatted date range at the header of the calendar
     * @default true
     * @version 5.52.0
     */
    showHeader?: boolean;
    /**
     * Set default date for calendar
     */
    defaultCalendarValue?: DateRange;
    /**
     * The character that separates two dates
     * @default ' ~ '
     */
    character?: string;
    /**
     * The props for the Month Dropdown component.
     */
    monthDropdownProps?: MonthDropdownProps;
    /**
     * If the user selects a date on the right calendar first, it will automatically switch to the left calendar.
     * Always keep the date on the left calendar as the start date.
     * @default false
     * @version 5.69.0
     */
    calendarSnapping?: boolean;
    /**
     * Hide specific hour options
     */
    hideHours?: (hour: number, date: Date) => boolean;
    /**
     * Hide specific minute options
     */
    hideMinutes?: (minute: number, date: Date) => boolean;
    /**
     * Hide specific second options
     */
    hideSeconds?: (second: number, date: Date) => boolean;
    /**
     * Disabled date
     * @deprecated Use {@link shouldDisableDate} instead
     */
    disabledDate?: DisabledDateFunction;
    /**
     * Whether a date cell is disabled
     */
    shouldDisableDate?: DisabledDateFunction;
    /**
     * Disabled hours on the time view
     */
    shouldDisableHour?: (hour: number, date: Date) => boolean;
    /**
     * Disabled minutes on the time view
     */
    shouldDisableMinute?: (minute: number, date: Date) => boolean;
    /**
     * Disabled seconds on the time view
     */
    shouldDisableSecond?: (second: number, date: Date) => boolean;
    /**
     * Called when the option is selected
     */
    onSelect?: (date: Date, event?: React.SyntheticEvent) => void;
    /**
     * Called after clicking the OK button
     */
    onOk?: (date: DateRange, event: React.SyntheticEvent) => void;
    /**
     * Called after clicking the shortcut button
     */
    onShortcutClick?: (range: RangeType, event: React.MouseEvent) => void;
    /**
     * Called when the value is cleared
     */
    onClean?: (event: React.MouseEvent) => void;
    /**
     * Custom rendering of the selected date range.
     */
    renderValue?: (value: DateRange, format: string) => string;
    /**
     * Custom render for calendar title
     *
     * - calendarKey is added in v5.83.0
     */
    renderTitle?: (date: Date, calendarKey: 'start' | 'end') => React.ReactNode;
    /**
     * Custom rendering calendar cell content.
     *
     * @version 5.77.0
     */
    renderCell?: (date: Date) => React.ReactNode;
}
export interface DateRangePickerComponent extends PickerComponent<DateRangePickerProps> {
    /** Allow the maximum number of days specified, other dates are disabled */
    allowedMaxDays: (days: number) => DisabledDateFunction;
    /** Only allowed days are specified, other dates are disabled */
    allowedDays: (days: number) => DisabledDateFunction;
    /** Allow specified date range, other dates are disabled */
    allowedRange: (startDate: string | Date, endDate: string | Date) => DisabledDateFunction;
    /** Disable dates after the specified date */
    before: (beforeDate: string | Date) => DisabledDateFunction;
    /** Disable dates before the specified date */
    after: (afterDate: string | Date) => DisabledDateFunction;
    /** Disable dates after today. */
    beforeToday: () => DisabledDateFunction;
    /** Disable dates before today */
    afterToday: () => DisabledDateFunction;
    /** Used to combine multiple conditions */
    combine: (...args: any) => DisabledDateFunction;
}
/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
declare const DateRangePicker: DateRangePickerComponent;
export default DateRangePicker;
