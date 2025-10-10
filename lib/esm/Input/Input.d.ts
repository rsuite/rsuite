import React from 'react';
import { WithAsProps, RsRefForwardingComponent, TypeAttributes, FormControlBaseProps } from '../internals/types';
import { PrependParameters } from '../internals/types/utils';
export interface LocaleType {
    unfilled: string;
}
export interface InputProps extends WithAsProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>, Omit<FormControlBaseProps, 'onChange'> {
    /** The HTML input type */
    type?: string;
    /** The HTML input id */
    id?: string;
    /** A component can have different sizes */
    size?: TypeAttributes.Size;
    /** Ref of input element */
    inputRef?: React.Ref<any>;
    /**
     * The htmlSize attribute defines the width of the <input> element.
     *
     * @see MDN https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size
     * @version 5.49.0
     */
    htmlSize?: number;
    /**
     * The callback function in which value is changed.
     */
    onChange?: PrependParameters<React.ChangeEventHandler<HTMLInputElement>, [value: string]>;
    /** Called on press enter */
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}
/**
 * The `<Input>` component is used to get user input in a text field.
 *
 * @see https://rsuitejs.com/components/input
 */
declare const Input: RsRefForwardingComponent<'input', InputProps>;
export default Input;
