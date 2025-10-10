import React from 'react';
import { RangeType } from '../DatePicker';
import type { FormControlBaseProps, PickerBaseProps } from '../internals/types';
import type { PickerComponent } from '../internals/Picker/types';
import type { DatePickerLocale } from '../locales';
export interface TimePickerProps extends PickerBaseProps<DatePickerLocale>, FormControlBaseProps<Date | null> {
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
     * A label displayed at the beginning of toggle button
     */
    label?: React.ReactNode;
    /**
     * Whether to display a loading state indicator
     */
    loading?: boolean;
    /**
     * Whether plaintext the component
     */
    plaintext?: boolean;
    /**
     * Whether read only the component
     */
    readOnly?: boolean;
    /**
     * Meridiem format for 12-hour time
     */
    showMeridiem?: boolean;
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
     * Called when the option is selected
     */
    onSelect?: (date: Date, event?: React.SyntheticEvent) => void;
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
}
declare const TimePicker: PickerComponent<TimePickerProps>;
export default TimePicker;
