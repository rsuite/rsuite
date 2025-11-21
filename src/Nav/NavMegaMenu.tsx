import React, { useContext } from 'react';
import NavbarMegaMenu, { NavbarMegaMenuProps } from '../Navbar/NavbarMegaMenu';
import { NavbarContext } from '../Navbar';

export type NavMegaMenuProps = NavbarMegaMenuProps;

/**
 * The `Nav.MegaMenu` component is used to create a mega menu.
 * @see https://rsuitejs.com/components/navbar/#mega-menu
 * @version 6.0.0
 */
const NavMegaMenu = React.forwardRef((props: NavMegaMenuProps, ref: React.Ref<any>) => {
  const navbar = useContext(NavbarContext);

  if (!navbar) {
    console.error(
      '<Nav.MegaMenu> should be used within a <Navbar> component. Use https://rsuitejs.com/components/navbar/#mega-menu for more information.'
    );

    return null;
  }

  return <NavbarMegaMenu ref={ref} {...props} />;
});

NavMegaMenu.displayName = 'NavMegaMenu';

export default NavMegaMenu;
