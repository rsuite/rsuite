import React from 'react';
import CalendarContainer from './CalendarContainer';
import type { CalendarLocale } from '../locales';
import type { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import type { MonthDropdownProps } from './types';
export interface CalendarProps extends WithAsProps {
    /**
     * Controlled value
     */
    value?: Date;
    /**
     * Default value
     */
    defaultValue?: Date;
    /**
     * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
     *
     * @see https://en.wikipedia.org/wiki/ISO_week_date
     */
    isoWeek?: boolean;
    /**
     * Display a compact calendar
     */
    compact?: boolean;
    /**
     * Show border
     */
    bordered?: boolean;
    /**
     * Custom locale object
     *
     * @see https://rsuitejs.com/guide/i18n/#calendar
     */
    locale?: CalendarLocale;
    /**
     * The index of the first day of the week (0 - Sunday)
     * If `isoWeek` is `true`, the value of `weekStart` is ignored.
     *
     * @default 0
     */
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * The props for the Month Dropdown component.
     */
    monthDropdownProps?: MonthDropdownProps;
    /**
     * Callback fired before the value changed
     */
    onChange?: (date: Date) => void;
    /**
     * Callback fired before the month changed
     * @todo-Doma Change signature to `onMonthChange(year: number, month: number, reason: string)`?
     */
    onMonthChange?: (date: Date) => void;
    /**
     * Callback fired before the date selected
     */
    onSelect?: (date: Date) => void;
    /**
     * Custom render calendar cells
     */
    renderCell?: (date: Date) => React.ReactNode;
    /**
     * Custom cell classes base on it's date
     */
    cellClassName?: (date: Date) => string | undefined;
}
/**
 * The Calendar component is used to select dates.
 * @see https://rsuitejs.com/components/calendar
 */
declare const Calendar: RsRefForwardingComponent<typeof CalendarContainer, CalendarProps>;
export default Calendar;
