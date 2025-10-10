import React from 'react';
import { StandardProps } from '../internals/types';
import { IconProps } from '@rsuite/icons/Icon';
export interface NavbarDropdownMenuProps<T = any> extends StandardProps {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /**
     * The submenu expands from the left and defaults to the right
     * @deprecated Use openDirection="start" instead.
     */
    pullLeft?: boolean;
    /**
     * Direction that the sub-menu open towards
     * - start: towards the head of the reading direction (right by default, left in RTL)
     * - end: towards the end of the reading direction (left by default, right in RTL)
     *
     * @default 'end'
     */
    openDirection?: 'start' | 'end';
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
 *          Instead it's rendered by a <Nav.Menu> within a <Navbar>
 *
 * <Navbar>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu title="menu"> -> This submenu will render <NavbarDropdownMenu> component
 *       </Nav.Menu>
 *     </Nav.Menu>
 *   </Nav>
 * </Navbar>
 */
declare const NavbarDropdownMenu: React.ForwardRefExoticComponent<NavbarDropdownMenuProps<any> & Omit<React.HTMLAttributes<HTMLUListElement>, "title" | "onSelect"> & React.RefAttributes<HTMLElement>>;
export default NavbarDropdownMenu;
