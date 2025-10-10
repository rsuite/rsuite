import React from 'react';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import NavMenu from './NavMenu';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface NavProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    /**
     * The appearance style of the Nav component.
     *
     * @default 'default'
     * @version 'pills' is supported in version 5.68.0
     */
    appearance?: 'default' | 'subtle' | 'tabs' | 'pills';
    /**
     * Whether the Nav component is reversed.
     */
    reversed?: boolean;
    /**
     * Whether the Nav component is justified.
     */
    justified?: boolean;
    /**
     * Whether the Nav component is vertical.
     */
    vertical?: boolean;
    /**
     * Whether the Nav component is pulled to the right.
     */
    pullRight?: boolean;
    /**
     * The active key of the Nav component.
     */
    activeKey?: T;
    /**
     * The default active key of the Nav component.
     */
    defaultActiveKey?: T;
    /**
     * Event handler for selecting a Nav item.
     */
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
interface NavComponent extends RsRefForwardingComponent<'div', NavProps> {
    /**
     * @deprecated Use <Nav.Menu> instead.
     */
    Dropdown: typeof NavDropdown;
    Item: typeof NavItem;
    Menu: typeof NavMenu;
}
/**
 * The `Nav` component is used to create navigation links.
 * @see https://rsuitejs.com/components/nav
 */
declare const Nav: NavComponent;
export default Nav;
