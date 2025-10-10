import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
export interface SidenavDropdownItemProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /** Active the current option */
    active?: boolean;
    /** Primary content */
    children?: React.ReactNode;
    /** You can use a custom element for this component */
    as?: React.ElementType;
    /** Whether to display the divider */
    divider?: boolean;
    /** Disable the current option */
    disabled?: boolean;
    /** The value of the current option */
    eventKey?: T;
    /** Displays a custom panel */
    panel?: boolean;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    /** Whether the submenu is expanded, used in Sidenav. */
    expanded?: boolean;
    /** Select the callback function for the current option  */
    onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}
/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
declare const ExpandedSidenavDropdownItem: RsRefForwardingComponent<'li', SidenavDropdownItemProps>;
export default ExpandedSidenavDropdownItem;
