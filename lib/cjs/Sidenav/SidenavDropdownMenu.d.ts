import React from 'react';
import type { IconProps } from '@rsuite/icons/Icon';
import type { StandardProps } from '../internals/types';
export interface SidenavDropdownMenuProps<T = any> extends StandardProps {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** The submenu expands from the left and defaults to the right */
    pullLeft?: boolean;
    /**
     *  Only used for setting the default expand state when it's a submenu.
     */
    eventKey?: T;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    open?: boolean;
    collapsible?: boolean;
    expanded?: boolean;
    active?: boolean;
    disabled?: boolean;
    activeKey?: T;
    onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu></Nav.Menu> -> This submenu will render <SidenavDropdownMenu> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
declare const SidenavDropdownMenu: React.ForwardRefExoticComponent<SidenavDropdownMenuProps<any> & Omit<React.HTMLAttributes<HTMLUListElement>, "title" | "onSelect"> & React.RefAttributes<HTMLElement>>;
export default SidenavDropdownMenu;
