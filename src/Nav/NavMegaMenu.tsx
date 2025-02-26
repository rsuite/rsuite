import React, { useContext } from 'react';
import NavbarMegaMenu, { NavbarMegaMenuProps } from '../Navbar/NavbarMegaMenu';
import { NavbarContext } from '../Navbar';

export type NavMegaMenuProps = NavbarMegaMenuProps;

const NavMegaMenu = React.forwardRef((props: NavMegaMenuProps, ref: React.Ref<any>) => {
  const navbar = useContext(NavbarContext);

  if (!navbar) {
    throw new Error(
      '<Nav.MegaMenu> should be used within a <Navbar> component. Use https://rsuitejs.com/components/navbar/#mega-menu for more information.'
    );
  }

  return <NavbarMegaMenu ref={ref} {...props} />;
});

NavMegaMenu.displayName = 'NavMegaMenu';

export default NavMegaMenu;
