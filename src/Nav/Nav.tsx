import React, { useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import NavItem, { NavItemProps } from './NavItem';
import { useClassNames } from '../utils';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import NavContext, { NavContextProps } from './NavContext';
import useEnsuredRef from '../utils/useEnsuredRef';
import Menubar from '../Menu/Menubar';
import NavDropdown from './NavDropdown';
import NavMenu, { NavMenuActionType, NavMenuContext } from './NavMenu';
import deprecateComponent from '../utils/deprecateComponent';
import NavDropdownItem from './NavDropdownItem';
import NavDropdownMenu from './NavDropdownMenu';
import NavbarDropdownItem from '../Navbar/NavbarDropdownItem';
import SidenavDropdownItem from '../Sidenav/SidenavDropdownItem';
import NavbarItem from '../Navbar/NavbarItem';
import SidenavItem from '../Sidenav/SidenavItem';
import useInternalId from '../utils/useInternalId';

export interface NavProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** sets appearance */
  appearance?: 'default' | 'subtle' | 'tabs';

  /** Reverse Direction of tabs/subtle */
  reversed?: boolean;

  /** Justified navigation */
  justified?: boolean;

  /** Vertical navigation */
  vertical?: boolean;

  /** appears on the right. */
  pullRight?: boolean;

  /** Active key, corresponding to eventkey in <Nav.item>. */
  activeKey?: T;

  /** Callback function triggered after selection */
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

const Nav: NavComponent = React.forwardRef((props: NavProps, ref: React.Ref<HTMLElement>) => {
  const {
    as: Component = 'div',
    classPrefix = 'nav',
    appearance = 'default',
    vertical,
    justified,
    reversed,
    pullRight,
    className,
    children,
    activeKey: activeKeyProp,
    onSelect: onSelectProp,
    ...rest
  } = props;

  const sidenav = useContext(SidenavContext);

  // Whether inside a <Navbar>
  const navbar = useContext(NavbarContext);

  const menubarRef = useEnsuredRef(ref);

  const { withClassPrefix, merge, rootPrefix, prefix } = useClassNames(classPrefix);

  const classes = merge(
    className,
    rootPrefix({
      'navbar-nav': navbar,
      'navbar-right': pullRight,
      'sidenav-nav': sidenav
    }),
    withClassPrefix(appearance, {
      horizontal: navbar || (!vertical && !sidenav),
      vertical: vertical || sidenav,
      justified,
      reversed
    })
  );

  const { activeKey: activeKeyFromSidenav, onSelect: onSelectFromSidenav = onSelectProp } =
    sidenav || {};

  const activeKey = activeKeyProp ?? activeKeyFromSidenav;
  const contextValue = useMemo<NavContextProps>(
    () => ({
      activeKey,
      onSelect: onSelectProp ?? onSelectFromSidenav
    }),
    [activeKey, onSelectFromSidenav, onSelectProp]
  );

  if (sidenav?.expanded) {
    return (
      <NavContext.Provider value={contextValue}>
        <ul ref={ref as any} className={classes} {...rest}>
          {children}
        </ul>
      </NavContext.Provider>
    );
  }

  const hasWaterline = appearance !== 'default';

  // If inside a collapsed <Sidenav>, render an ARIA `menubar` (vertical)
  if (sidenav) {
    return (
      <NavContext.Provider value={contextValue}>
        <Menubar vertical={!!sidenav}>
          {(menubar, ref) => (
            <Component ref={ref} {...rest} className={classes} {...menubar}>
              {children}
            </Component>
          )}
        </Menubar>
      </NavContext.Provider>
    );
  }
  return (
    <NavContext.Provider value={contextValue}>
      <Component {...rest} ref={menubarRef} className={classes}>
        {children}
        {hasWaterline && <div className={prefix('bar')} />}
      </Component>
    </NavContext.Provider>
  );
}) as unknown as NavComponent;

const DeprecatedNavDropdown = deprecateComponent(
  NavDropdown,
  '<Nav.Dropdown> is deprecated, use <Nav.Menu> instead.'
);
DeprecatedNavDropdown.Menu = deprecateComponent(
  NavDropdownMenu,
  '<Nav.Dropdown.Menu> is deprecated, use <Nav.Menu> instead'
);
DeprecatedNavDropdown.Item = deprecateComponent(
  NavDropdownItem,
  '<Nav.Dropdown.Item> is deprecated, use <Nav.Item> instead'
);

Nav.Dropdown = DeprecatedNavDropdown;
/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
Nav.Item = React.forwardRef((props: NavItemProps, ref: React.Ref<any>) => {
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
Nav.Item.displayName = 'Nav.Item';

Nav.Menu = NavMenu;

Nav.displayName = 'Nav';
Nav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  appearance: PropTypes.oneOf(['default', 'subtle', 'tabs']),
  // Reverse Direction of tabs/subtle
  reversed: PropTypes.bool,
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};

export default Nav;
