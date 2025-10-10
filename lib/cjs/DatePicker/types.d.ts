import { ReactNode } from 'react';
export type ToolbarValue = Date | [Date?, Date?];
export interface RangeType<T> {
    label: ReactNode;
    closeOverlay?: boolean;
    value: T | ((value: T) => T) | null;
    placement?: 'bottom' | 'left';
}
export interface InnerRange<T> extends Omit<RangeType<T>, 'value'> {
    value: T | null;
}
export interface DeprecatedProps {
    /**
     * Display date panel when component initial
     *
     * @deprecated use <Calendar> instead
     **/
    inline?: boolean;
    /**
     * Whether to disable a date on the calendar view
     *
     * @returns date should be disabled (not selectable)
     * @deprecated Use {@link shouldDisableDate} instead
     */
    disabledDate?: (date?: Date) => boolean;
    /**
     * Disabled hours
     *
     * @deprecated Use {@link shouldDisableHour} instead
     */
    disabledHours?: (hour: number, date: Date) => boolean;
    /**
     * Disabled minutes
     *
     * @deprecated Use {@link shouldDisableMinute} instead
     */
    disabledMinutes?: (minute: number, date: Date) => boolean;
    /**
     * Disabled seconds
     *
     * @deprecated Use {@link shouldDisableSecond} instead
     */
    disabledSeconds?: (second: number, date: Date) => boolean;
}
