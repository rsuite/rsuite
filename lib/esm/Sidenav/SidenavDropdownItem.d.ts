import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import React from 'react';
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
    /** The submenu that this menuitem controls (if exists) */
    submenu?: React.ReactElement;
    /**
     * The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left.
     * @deprecated Submenus are now pointing the same direction.
     */
    pullLeft?: boolean;
    /**
     * Whether the submenu is opened.
     * @deprecated
     * @internal
     */
    open?: boolean;
    /** Select the callback function for the current option  */
    onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Item> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Item></Nav.Item> -> This will render <SidenavDropdownItem> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
declare const SidenavDropdownItem: RsRefForwardingComponent<'li', SidenavDropdownItemProps>;
export default SidenavDropdownItem;
