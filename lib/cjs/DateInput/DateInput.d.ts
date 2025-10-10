import React from 'react';
import { InputProps } from '../Input';
import { FormControlBaseProps } from '../internals/types';
export interface DateInputProps extends Omit<InputProps, 'value' | 'onChange' | 'defaultValue'>, FormControlBaseProps<Date | null> {
    /**
     * Format of the date when rendered in the input. Format of the string is based on Unicode Technical Standard.
     *
     * @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     * @default 'yyyy-MM-dd'
     **/
    format?: string;
    /**
     * The `placeholder` prop defines the text displayed in a form control when the control has no value.
     */
    placeholder?: string;
}
/**
 * The DateInput component lets users select a date with the keyboard.
 * @version 5.58.0
 * @see https://rsuitejs.com/components/date-input/
 */
declare const DateInput: React.ForwardRefExoticComponent<DateInputProps & React.RefAttributes<unknown>>;
export default DateInput;
