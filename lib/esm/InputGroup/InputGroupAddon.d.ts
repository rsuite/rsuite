import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface InputGroupAddonProps extends WithAsProps, React.HTMLAttributes<HTMLSpanElement> {
    /** An Input group addon can show that it is disabled */
    disabled?: boolean;
}
/**
 * The `InputGroup.Addon` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
declare const InputGroupAddon: RsRefForwardingComponent<'span', InputGroupAddonProps>;
export default InputGroupAddon;
