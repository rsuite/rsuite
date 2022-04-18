import React, { useContext } from 'react';
import DropdownContext from '../Dropdown/DropdownContext';
import NavDropdown, { NavDropdownProps } from './NavDropdown';
import NavDropdownMenu, { NavDropdownMenuProps } from './NavDropdownMenu';

export interface NavMenuProps extends NavDropdownProps, Omit<NavDropdownMenuProps, 'onToggle'> {}

/**
 * The <Nav.Menu> API
 * When used as direct child of <Nav>, render the NavDropdown
 * When used within another <Nav.Menu>, render the NavDropdownMenu
 */
const NavMenu = React.forwardRef((props: NavMenuProps, ref: React.Ref<any>) => {
  const dropdown = useContext(DropdownContext);

  if (!dropdown) {
    return <NavDropdown ref={ref} {...props} />;
  }

  return <NavDropdownMenu ref={ref} {...props} />;
});

export default NavMenu;
