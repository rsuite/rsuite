import React from 'react';
import type { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../internals/types';
import type { ToggleLocale } from '../locales';
export interface ToggleProps extends WithAsProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    /**
     * The color of the toggle.
     */
    color?: TypeAttributes.Color;
    /**
     * Whether to disabled toggle
     */
    disabled?: boolean;
    /**
     * Render the control as plain text
     */
    plaintext?: boolean;
    /**
     * Make the control readonly
     */
    readOnly?: boolean;
    /**
     * Whether the checked state is being updated
     */
    loading?: boolean;
    /**
     * Whether the toggle is checked （Controlled)
     */
    checked?: boolean;
    /**
     * Whether the toggle is checked (Uncontrolled)
     */
    defaultChecked?: boolean;
    /**
     * Checked display content
     */
    checkedChildren?: React.ReactNode;
    /**
     * Unchecked display content
     */
    unCheckedChildren?: React.ReactNode;
    /**
     * The size of the toggle
     */
    size?: Omit<TypeAttributes.Size, 'xs'>;
    /**
     * Custom locale
     */
    locale?: ToggleLocale;
    /**
     * Called when the state of the toggle changes
     */
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}
/**
 * The `Toggle` component is used to activate or deactivate an element.
 *
 * @see https://rsuitejs.com/components/toggle
 */
declare const Toggle: RsRefForwardingComponent<'label', ToggleProps>;
export default Toggle;
