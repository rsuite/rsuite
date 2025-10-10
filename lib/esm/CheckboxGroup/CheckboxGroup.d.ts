import React from 'react';
import { WithAsProps, FormControlBaseProps, RsRefForwardingComponent } from '../internals/types';
import type { ValueType } from '../Checkbox';
export interface CheckboxGroupProps<V = ValueType[]> extends WithAsProps, FormControlBaseProps<V> {
    /** Used for the name of the form */
    name?: string;
    /** Primary content */
    children?: React.ReactNode;
    /** Inline layout */
    inline?: boolean;
}
/**
 * The `CheckboxGroup` component is used for selecting multiple options which are unrelated.
 * @see https://rsuitejs.com/components/checkbox/#checkbox-group
 */
declare const CheckboxGroup: RsRefForwardingComponent<'div', CheckboxGroupProps>;
export default CheckboxGroup;
