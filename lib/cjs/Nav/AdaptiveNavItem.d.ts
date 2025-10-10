import React from 'react';
import { NavItemProps } from './NavItem';
/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
declare const AdaptiveNavItem: React.ForwardRefExoticComponent<NavItemProps<string | number> & React.RefAttributes<any>>;
export default AdaptiveNavItem;
