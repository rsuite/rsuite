import React from 'react';
import { CalendarLocale } from '../locales';
import { format } from '../internals/utils/date';
import type { MonthDropdownProps } from './types';
/**
 * Represents the inner context value for the Calendar component.
 */
export interface CalendarInnerContextValue {
    /**
     * The current date of the calendar.
     */
    date?: Date;
    /**
     * The date range selected in the calendar.
     */
    dateRange?: Date[];
    /**
     * The format used for displaying dates.
     */
    format?: string;
    /**
     * The hover range value in the calendar.
     */
    hoverRangeValue?: [Date, Date];
    /**
     * Indicates whether the calendar is inline or not.
     */
    inline?: boolean;
    /**
     * Indicates whether the ISO week numbers should be shown in the calendar.
     */
    isoWeek: boolean;
    /**
     * The start day of the week in the calendar.
     * 0 - Sunday, 1 - Monday, 2 - Tuesday, 3 - Wednesday, 4 - Thursday, 5 - Friday, 6 - Saturday
     */
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Indicates whether week numbers should be shown in the calendar.
     */
    showWeekNumbers?: boolean;
    /**
     * The target ID of the calendar.
     */
    targetId?: string;
    /**
     * The props for the Month Dropdown component.
     */
    monthDropdownProps?: MonthDropdownProps;
    /**
     * A function that determines if a date is disabled in the calendar.
     * @param date - The date to check.
     * @param selectRangeValue - The selected date range.
     * @param type - The type of the calendar.
     * @returns True if the date is disabled, false otherwise.
     */
    disabledDate?: (date: Date, selectRangeValue?: Date[], type?: string) => boolean;
    /**
     * A function that determines if a date is in the same month as the current date in the calendar.
     * @param date - The date to check.
     * @returns True if the date is in the same month, false otherwise.
     */
    inSameMonth?: (date: Date) => boolean;
    /**
     * A callback function that is called when the month is changed in the calendar.
     * @param nextPageDate - The next page date.
     * @param event - The mouse event.
     */
    onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;
    /**
     * A callback function that is called when the time is changed in the calendar.
     * @param nextPageTime - The next page time.
     * @param event - The mouse event.
     */
    onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
    /**
     * A callback function that is called when the mouse moves over a date in the calendar.
     * @param date - The date.
     */
    onMouseMove?: (date: Date) => void;
    /**
     * A callback function that is called when a date is selected in the calendar.
     * @param date - The selected date.
     * @param event - The mouse event.
     */
    onSelect?: (date: Date, event: React.MouseEvent) => void;
    /**
     * A function that renders the cell content in the calendar.
     * @param date - The date.
     * @returns The rendered cell content.
     */
    renderCell?: (date: Date) => React.ReactNode;
    /**
     * A function that renders the cell content in the picker.
     * @param date - The date.
     * @returns The rendered cell content.
     */
    renderCellOnPicker?: (date: Date) => React.ReactNode;
    /**
     * A function that returns the class name for a cell in the calendar.
     * @param date - The date.
     * @returns The class name for the cell.
     */
    cellClassName?: (date: Date) => string | undefined;
}
export interface CalendarContextValue extends CalendarInnerContextValue {
    locale?: CalendarLocale;
    formatDate?: typeof format;
}
export declare const CalendarContext: React.Context<CalendarContextValue>;
export declare const CalendarProvider: React.Provider<CalendarContextValue>;
