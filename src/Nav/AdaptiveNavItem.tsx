import React, { useContext, useEffect } from 'react';
import NavItem, { NavItemProps } from './NavItem';
import { useInternalId } from '@/internals/hooks';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';
import NavContext from './NavContext';
import { NavMenuActionType, NavMenuContext } from './NavMenu';
import NavDropdownItem from './NavDropdownItem';
import NavbarDropdownItem from '../Navbar/NavbarDropdownItem';
import SidenavDropdownItem from '../Sidenav/SidenavDropdownItem';
import NavbarItem from '../Navbar/NavbarItem';
import SidenavItem from '../Sidenav/SidenavItem';

/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
const AdaptiveNavItem = React.forwardRef((props: NavItemProps, ref: React.Ref<any>) => {
  const nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }

  const parentNavMenu = useContext(NavMenuContext);
  const navbar = useContext(NavbarContext);
  const sidenav = useContext(SidenavContext);

  const [, dispatch] = parentNavMenu ?? [];
  const _id = useInternalId('Nav.Item');

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: NavMenuActionType.RegisterItem,
        payload: {
          _id,
          eventKey: props.eventKey,
          active: props.active ?? false
        }
      });

      return () => {
        dispatch({
          type: NavMenuActionType.UnregisterItem,
          payload: {
            _id
          }
        });
      };
    }
  }, [dispatch, _id, props.eventKey, props.active]);

  if (parentNavMenu) {
    if (navbar) {
      return <NavbarDropdownItem ref={ref} {...props} />;
    }

    if (sidenav) {
      return <SidenavDropdownItem ref={ref} {...props} />;
    }

    return <NavDropdownItem ref={ref} {...props} />;
  }

  if (navbar) {
    return <NavbarItem ref={ref} {...props} />;
  }

  if (sidenav) {
    return <SidenavItem ref={ref} {...props} />;
  }

  return <NavItem ref={ref} {...props} />;
});

AdaptiveNavItem.displayName = 'Nav.Item';

export default AdaptiveNavItem;
