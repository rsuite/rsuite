import React from 'react';
import type { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../internals/types';
import type { ValueType } from '../Radio';
export interface RadioContextProps {
    inline?: boolean;
    name?: string;
    value?: ValueType | null;
    controlled?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    plaintext?: boolean;
    onChange?: (value: ValueType | undefined, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface RadioGroupProps<T = ValueType> extends WithAsProps, FormControlBaseProps<T> {
    /** A radio group can have different appearances */
    appearance?: 'default' | 'picker';
    /** Name to use for form */
    name?: string;
    /** Inline layout */
    inline?: boolean;
    /** Primary content */
    children?: React.ReactNode;
}
export declare const RadioContext: React.Context<RadioContextProps | undefined>;
/**
 * The `RadioGroup` component is used to group a collection of `Radio` components.
 * @see https://rsuitejs.com/components/radio/#radio-group
 */
declare const RadioGroup: RsRefForwardingComponent<'div', RadioGroupProps>;
export default RadioGroup;
