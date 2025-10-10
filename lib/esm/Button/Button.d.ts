import React from 'react';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface ButtonProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
    /** A button can have different appearances. */
    appearance?: TypeAttributes.Appearance;
    /** A button can show it is currently the active user selection */
    active?: boolean;
    /** A button can have different sizes */
    size?: TypeAttributes.Size;
    /** A button can have different colors */
    color?: TypeAttributes.Color;
    /** Format button to appear inside a content block */
    block?: boolean;
    /** Providing a `href` will render an `<a>` element, _styled_ as a button */
    href?: string;
    /** Where to display the linked URL */
    target?: string;
    /** A button can show a loading indicator */
    loading?: boolean;
    /** A button can show it is currently unable to be interacted with */
    disabled?: boolean;
    /** Ripple after button click */
    ripple?: boolean;
    /** The icon element placed _before_ the button text */
    startIcon?: React.ReactNode;
    /** The icon element placed _after_ the button text */
    endIcon?: React.ReactNode;
    /** Defines HTML button type attribute */
    type?: 'button' | 'reset' | 'submit';
}
/**
 * The Button component is used to trigger a custom action.
 * @see https://rsuitejs.com/components/button
 */
declare const Button: RsRefForwardingComponent<'button', ButtonProps>;
export default Button;
