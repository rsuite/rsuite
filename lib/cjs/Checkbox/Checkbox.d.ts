import React from 'react';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes } from '../internals/types';
export type ValueType = string | number;
export interface CheckboxProps<V = ValueType> extends WithAsProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * The color of the checkbox when checked or indeterminate
     *
     * @version 5.56.0
     */
    color?: TypeAttributes.Color;
    /**
     * Whether to show checkbox
     *
     * @private Used in MultiCascader
     */
    checkable?: boolean;
    /**
     * A checkbox can appear disabled and be unable to change states
     */
    disabled?: boolean;
    /**
     * Make the control readonly
     */
    readOnly?: boolean;
    /**
     * Render the control as plain text
     */
    plaintext?: boolean;
    /**
     * Whether or not checkbox is checked.
     */
    checked?: boolean;
    /**
     * The initial value of checked.
     */
    defaultChecked?: boolean;
    /**
     * Whether or not checkbox is indeterminate.
     */
    indeterminate?: boolean;
    /**
     * Attributes applied to the input element.
     */
    inputProps?: React.HTMLAttributes<HTMLInputElement>;
    /**
     * Pass a ref to the input element.
     */
    inputRef?: React.Ref<any>;
    /**
     * Inline layout
     *
     * @private Used in CheckboxGroup
     */
    inline?: boolean;
    /**
     * The HTML input value.
     */
    value?: V;
    /**
     * Used for the name of the form
     */
    name?: string;
    /**
     * Whether the label is clickable
     *
     * @private Used in MultiCascader
     */
    labelClickable?: boolean;
    /**
     * Called when the user attempts to change the checked state.
     */
    onChange?: (value: V | undefined, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Called when the checkbox or label is clicked.
     */
    onClick?: (event: React.SyntheticEvent) => void;
    /**
     * Called when the checkbox is clicked.
     *
     * @private Used in MultiCascader
     */
    onCheckboxClick?: (event: React.SyntheticEvent) => void;
}
/**
 * The Checkbox component is used for selecting multiple options from a set.
 * @see https://rsuitejs.com/components/checkbox
 */
declare const Checkbox: RsRefForwardingComponent<'div', CheckboxProps>;
export default Checkbox;
