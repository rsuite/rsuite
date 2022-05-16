import React, { useContext } from 'react';
import DropdownContext from '../Dropdown/DropdownContext';
import NavDropdown, { NavDropdownProps } from './NavDropdown';
import NavDropdownMenu, { NavDropdownMenuProps } from './NavDropdownMenu';
import { SidenavContext } from '../Sidenav/Sidenav';
import SidenavDropdown from '../Sidenav/SidenavDropdown';
import { NavbarContext } from '../Navbar';
import NavbarDropdown from '../Navbar/NavbarDropdown';
import NavbarDropdownMenu from '../Navbar/NavbarDropdownMenu';
import SidenavDropdownMenu from '../Sidenav/SidenavDropdownMenu';

export interface NavMenuProps extends NavDropdownProps, Omit<NavDropdownMenuProps, 'onToggle'> {}

/**
 * The <Nav.Menu> API
 * When used as direct child of <Nav>, render the NavDropdown
 * When used within another <Nav.Menu>, render the NavDropdownMenu
 */
const NavMenu = React.forwardRef((props: NavMenuProps, ref: React.Ref<any>) => {
  const dropdown = useContext(DropdownContext);

  const navbar = useContext(NavbarContext);
  const sidenav = useContext(SidenavContext);

  if (!dropdown) {
    if (navbar) {
      return <NavbarDropdown ref={ref} {...props} />;
    }
    if (sidenav) {
      return <SidenavDropdown ref={ref} {...props} />;
    }
    return <NavDropdown ref={ref} {...props} />;
  }

  if (navbar) {
    return <NavbarDropdownMenu ref={ref} {...props} />;
  }

  if (sidenav) {
    return <SidenavDropdownMenu ref={ref} {...props} />;
  }

  return <NavDropdownMenu ref={ref} {...props} />;
});

NavMenu.displayName = 'Nav.Menu';

export default NavMenu;
