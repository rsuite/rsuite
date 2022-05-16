import React, { useContext } from 'react';
import NavDropdown, { NavDropdownProps } from './NavDropdown';
import NavDropdownMenu, { NavDropdownMenuProps } from './NavDropdownMenu';
import { SidenavContext } from '../Sidenav/Sidenav';
import SidenavDropdown from '../Sidenav/SidenavDropdown';
import { NavbarContext } from '../Navbar';
import NavbarDropdown from '../Navbar/NavbarDropdown';
import NavbarDropdownMenu from '../Navbar/NavbarDropdownMenu';
import SidenavDropdownMenu from '../Sidenav/SidenavDropdownMenu';

export interface NavMenuProps extends NavDropdownProps, Omit<NavDropdownMenuProps, 'onToggle'> {}

export const NavMenuContext = React.createContext<true | null>(null);

/**
 * The <Nav.Menu> API
 * When used as direct child of <Nav>, render the NavDropdown
 * When used within another <Nav.Menu>, render the NavDropdownMenu
 */
const NavMenu = React.forwardRef((props: NavMenuProps, ref: React.Ref<any>) => {
  const parentNavMenu = useContext(NavMenuContext);

  const navbar = useContext(NavbarContext);
  const sidenav = useContext(SidenavContext);

  if (!parentNavMenu) {
    if (navbar) {
      return (
        <NavMenuContext.Provider value={true}>
          <NavbarDropdown ref={ref} {...props} />
        </NavMenuContext.Provider>
      );
    }
    if (sidenav) {
      return (
        <NavMenuContext.Provider value={true}>
          <SidenavDropdown ref={ref} {...props} />
        </NavMenuContext.Provider>
      );
    }
    return (
      <NavMenuContext.Provider value={true}>
        <NavDropdown ref={ref} {...props} />
      </NavMenuContext.Provider>
    );
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
