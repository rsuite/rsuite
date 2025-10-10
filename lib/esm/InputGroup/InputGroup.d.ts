import React from 'react';
import InputGroupAddon from './InputGroupAddon';
import InputGroupButton from './InputGroupButton';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../internals/types';
export declare const InputGroupContext: React.Context<{
    onFocus: () => void;
    onBlur: () => void;
} | null>;
export interface InputGroupProps extends WithAsProps {
    /** Sets the composition content internally */
    inside?: boolean;
    /** An Input group can show that it is disabled */
    disabled?: boolean;
    /** Primary content */
    children?: React.ReactNode;
    /** A component can have different sizes */
    size?: TypeAttributes.Size;
}
export interface InputGroupComponent extends RsRefForwardingComponent<'div', InputGroupProps> {
    Addon: typeof InputGroupAddon;
    Button: typeof InputGroupButton;
}
/**
 * The `InputGroup` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
declare const InputGroup: InputGroupComponent;
export default InputGroup;
