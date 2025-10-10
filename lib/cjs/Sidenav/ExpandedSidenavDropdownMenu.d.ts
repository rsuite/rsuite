import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
export interface SidenavDropdownMenuProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLLIElement>, 'title' | 'onSelect'> {
    /** Primary content */
    children?: React.ReactNode;
    /** You can use a custom element for this component */
    as?: React.ElementType;
    /** Disable the current option */
    disabled?: boolean;
    /** The value of the current option */
    eventKey?: T;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** Whether the submenu is expanded, used in Sidenav. */
    expanded?: boolean;
    /** Select the callback function for the current option  */
    onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
    title?: React.ReactNode;
}
/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
declare const ExpandedSidenavDropdownMenu: RsRefForwardingComponent<'li', SidenavDropdownMenuProps>;
export default ExpandedSidenavDropdownMenu;
