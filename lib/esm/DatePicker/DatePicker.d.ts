import React from 'react';
import { RangeType } from './Toolbar';
import type { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../internals/types';
import type { DatePickerLocale } from '../locales';
import type { DeprecatedProps } from './types';
import type { MonthDropdownProps } from '../Calendar/types';
export interface DatePickerProps extends PickerBaseProps<DatePickerLocale>, FormControlBaseProps<Date | null>, DeprecatedProps {
    /**
     * Custom caret component
     */
    caretAs?: React.ElementType | null;
    /**
     * Calendar panel default presentation date and time
     */
    calendarDefaultDate?: Date;
    /**
     * Whether disabled the component
     */
    disabled?: boolean;
    /**
     * Rendered as an input, the date can be entered via the keyboard
     */
    editable?: boolean;
    /**
     * Format date string
     */
    format?: string;
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     *
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
     * Set the upper limit of the available year relative to the current selection date
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
     * One-click selection date
     */
    oneTap?: boolean;
    /**
     * Whether plaintext the component
     */
    plaintext?: boolean;
    /**
     * Whether read only the component
     */
    readOnly?: boolean;
    /**
     * Predefined date Ranges
     */
    ranges?: RangeType<Date>[];
    /**
     * Whether to show week numbers
     */
    showWeekNumbers?: boolean;
    /**
     * @deprecated Use `showMeridiem` instead
     */
    showMeridian?: boolean;
    /**
     * Meridiem format for 12-hour time
     */
    showMeridiem?: boolean;
    /**
     * The props for the Month Dropdown component.
     */
    monthDropdownProps?: MonthDropdownProps;
    /**
     * Whether a date on the calendar view should be disabled
     *
     * @returns date should be disabled (not selectable)
     */
    shouldDisableDate?: (date: Date) => boolean;
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
     * Called when the calendar panel date changes
     */
    onChangeCalendarDate?: (date: Date, event?: React.SyntheticEvent) => void;
    /**
     * Called when opening the month view
     */
    onToggleMonthDropdown?: (toggle: boolean) => void;
    /**
     * Called when opening the time view
     */
    onToggleTimeDropdown?: (toggle: boolean) => void;
    /**
     * Called when the option is selected
     */
    onSelect?: (date: Date, event?: React.SyntheticEvent) => void;
    /** Called after the prev month */
    onPrevMonth?: (date: Date) => void;
    /**
     * Called after the next month
     */
    onNextMonth?: (date: Date) => void;
    /**
     * Called after clicking the OK button
     */
    onOk?: (date: Date, event: React.SyntheticEvent) => void;
    /**
     * Called after clicking the shortcut button
     */
    onShortcutClick?: (range: RangeType<Date>, event: React.MouseEvent) => void;
    /**
     * Called when clean
     */
    onClean?: (event: React.MouseEvent) => void;
    /**
     * Custom rendering of the selected date.
     */
    renderValue?: (value: Date, format: string) => string;
    /**
     * Custom rendering calendar cell content.
     *
     * @version 5.54.0
     */
    renderCell?: (date: Date) => React.ReactNode;
}
/**
 * A date picker allows users to select a date from a calendar.
 *
 * @see https://rsuitejs.com/components/date-picker
 */
declare const DatePicker: RsRefForwardingComponent<'div', DatePickerProps>;
export default DatePicker;
