import React from 'react';
import { RangeType, DateRange } from '../DateRangePicker';
import type { FormControlBaseProps, PickerBaseProps } from '../internals/types';
import type { PickerComponent } from '../internals/Picker/types';
import type { DatePickerLocale } from '../locales';
export interface TimeRangePickerProps extends PickerBaseProps<DatePickerLocale>, FormControlBaseProps<DateRange | null> {
    /**
     * Custom caret component
     */
    caretAs?: React.ElementType | null;
    /** Predefined date ranges */
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
     * A label displayed at the beginning of toggle button
     */
    label?: React.ReactNode;
    /**
     * Whether to display a loading state indicator
     */
    loading?: boolean;
    /**
     * Meridiem format for 12-hour time
     */
    showMeridiem?: boolean;
    /**
     * Whether to display the formatted date range at the header of the calendar
     */
    showHeader?: boolean;
    /**
     * The character that separates two dates
     * @default ' ~ '
     */
    character?: string;
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
     */
    renderTitle?: (date: Date) => React.ReactNode;
}
declare const TimeRangePicker: PickerComponent<TimeRangePickerProps>;
export default TimeRangePicker;
