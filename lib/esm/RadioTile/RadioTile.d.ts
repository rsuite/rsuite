import React from 'react';
import type { WithAsProps } from '../internals/types';
export type ValueType = string | number;
export interface RadioTileProps<T = ValueType> extends WithAsProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Additional description, if needed*/
    children?: React.ReactNode;
    /** Specifies whether the radio is selected */
    checked?: boolean;
    /** Specifies the initial state: whether or not the radio is selected */
    defaultChecked?: boolean;
    /** Whether the Radio is disabled */
    disabled?: boolean;
    /** Label of the Radio tile */
    label?: React.ReactNode;
    /** Icon to be used */
    icon?: React.ReactNode;
    /** Name to use for form */
    name?: string;
    /** Value, corresponding to the value of the RadioTileGroup, to determine whether the */
    value?: T;
    /** Callback function with value changed */
    onChange?: (value?: T, event?: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
declare const RadioTile: React.ForwardRefExoticComponent<RadioTileProps<ValueType> & React.RefAttributes<unknown>>;
export default RadioTile;
