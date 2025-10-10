import React from 'react';
import { WithAsProps, TypeAttributes, FormControlBaseProps } from '../internals/types';
export interface InputNumberProps<T = number | string | null> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'size' | 'prefix'>, WithAsProps, FormControlBaseProps<T> {
    /**
     * Button can have different appearances
     */
    buttonAppearance?: TypeAttributes.Appearance;
    /**
     * An input can show that it is disabled
     */
    disabled?: boolean;
    /**
     *
     * Decimal separator
     * https://en.wikipedia.org/wiki/Decimal_separator
     *
     * @default '.'
     * @version 5.69.0
     */
    decimalSeparator?: string;
    /**
     * Format the value of the input
     */
    formatter?: (value: number | string) => string;
    /**
     * Minimum value
     */
    min?: number;
    /**
     * Maximum value
     */
    max?: number;
    /**
     * The value of each step. can be decimal
     */
    step?: number;
    /**
     * Sets the element displayed to the left of the component
     */
    prefix?: React.ReactNode;
    /**
     * Sets the element displayed on the right side of the component
     */
    postfix?: React.ReactNode;
    /**
     * An Input can have different sizes
     */
    size?: TypeAttributes.Size;
    /**
     * Whether the value can be changed through the wheel event
     */
    scrollable?: boolean;
    /**
     * Callback function when wheel event is triggered
     */
    onWheel?: (event: React.WheelEvent) => void;
}
/**
 * The `InputNumber` component is used to enter a numerical value.
 * @see https://rsuitejs.com/components/input-number
 */
declare const InputNumber: React.ForwardRefExoticComponent<InputNumberProps<string | number | null> & React.RefAttributes<unknown>>;
export default InputNumber;
