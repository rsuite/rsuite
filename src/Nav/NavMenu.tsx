import React, { Dispatch, useContext, useReducer } from 'react';
import NavDropdown, { NavDropdownProps } from './NavDropdown';
import NavDropdownMenu, { NavDropdownMenuProps } from './NavDropdownMenu';
import NavbarDropdown from '../Navbar/NavbarDropdown';
import NavbarDropdownMenu from '../Navbar/NavbarDropdownMenu';
import SidenavDropdown from '../Sidenav/SidenavDropdown';
import SidenavDropdownMenu from '../Sidenav/SidenavDropdownMenu';
import { NavbarContext } from '../Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';

export interface NavMenuProps extends NavDropdownProps, Omit<NavDropdownMenuProps, 'onToggle'> {}

export type NavMenuState = {
  items: {
    _id: any;
    eventKey?: any;
    active: boolean;
  }[];
};

export type NavMenuContextProps = [NavMenuState, Dispatch<NavMenuAction>];

export const NavMenuContext = React.createContext<NavMenuContextProps | null>(null);
NavMenuContext.displayName = 'NavMenu.Context';

export enum NavMenuActionType {
  RegisterItem,
  UnregisterItem
}

export type NavMenuAction =
  | {
      type: NavMenuActionType.RegisterItem;
      payload: { _id: any; eventKey?: any; active: boolean };
    }
  | { type: NavMenuActionType.UnregisterItem; payload: { _id: any } };

const initilNavMenuState: NavMenuState = {
  items: []
};

const reducer = (state: NavMenuState, action: NavMenuAction): NavMenuState => {
  switch (action.type) {
    case NavMenuActionType.RegisterItem:
      return {
        ...state,
        items: [...state.items.filter(item => item._id !== action.payload._id), action.payload]
      };
    case NavMenuActionType.UnregisterItem:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload._id)
      };
    default:
      throw new Error('Unrecognizable action type: ' + (action as any).type);
  }
};

/**
 * The `Nav.Menu` component is used to create navigation menus.
 *
 * - When used as direct child of `<Nav>`, render the NavDropdown
 * - When used within another `<Nav.Menu>`, render the NavDropdownMenu
 *
 * @see https://rsuitejs.com/components/nav
 */
const NavMenu = React.forwardRef((props: NavMenuProps, ref: React.Ref<any>) => {
  const parentNavMenu = useContext(NavMenuContext);

  const navMenuContext = useReducer(reducer, initilNavMenuState);

  const navbar = useContext(NavbarContext);
  const sidenav = useContext(SidenavContext);

  if (!parentNavMenu) {
    if (navbar) {
      return (
        <NavMenuContext.Provider value={navMenuContext}>
          <NavbarDropdown ref={ref} {...props} />
        </NavMenuContext.Provider>
      );
    }
    if (sidenav) {
      return (
        <NavMenuContext.Provider value={navMenuContext}>
          <SidenavDropdown ref={ref} {...props} />
        </NavMenuContext.Provider>
      );
    }
    return (
      <NavMenuContext.Provider value={navMenuContext}>
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
