import React from 'react';
import { IconProps } from '@rsuite/icons/Icon';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface NavbarItemProps<T = string | number> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /** Activation status */
    active?: boolean;
    /** Disabled status */
    disabled?: boolean;
    /** Sets the icon for the component */
    icon?: React.ReactElement<IconProps>;
    /** The value of the current option */
    eventKey?: T;
    /** Providing a `href` will render an `<a>` element */
    href?: string;
    /** Select the callback function that the event triggers. */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
/**
 * @private
 */
declare const NavbarItem: RsRefForwardingComponent<'a', NavbarItemProps>;
export default NavbarItem;
