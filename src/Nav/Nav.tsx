import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';
import { useClassNames, useEnsuredRef, useControlled } from '@/internals/hooks';
import { NavbarContext } from '../Navbar/Navbar';
import { SidenavContext } from '../Sidenav/Sidenav';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import NavContext, { NavContextProps } from './NavContext';
import Menubar from '@/internals/Menu/Menubar';
import { oneOf } from '@/internals/propTypes';
import { deprecateComponent } from '@/internals/utils';
import NavDropdown from './NavDropdown';
import NavMenu from './NavMenu';
import NavDropdownItem from './NavDropdownItem';
import NavDropdownMenu from './NavDropdownMenu';
import AdaptiveNavItem from './AdaptiveNavItem';

export interface NavProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
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
    defaultActiveKey,
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

  const { activeKey: activeKeyFromSidenav, onSelect: onSelectFromSidenav } = sidenav || {};

  const [activeKey, setActiveKey] = useControlled(
    activeKeyProp ?? activeKeyFromSidenav,
    defaultActiveKey
  );
  const contextValue = useMemo<NavContextProps>(
    () => ({
      activeKey,
      onSelect: (eventKey: string | number | undefined, event: React.SyntheticEvent) => {
        setActiveKey(eventKey);
        onSelectProp?.(eventKey, event);
        onSelectFromSidenav?.(eventKey, event);
      }
    }),
    [activeKey, onSelectFromSidenav, onSelectProp, setActiveKey]
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
Nav.Item = AdaptiveNavItem;
Nav.Menu = NavMenu;

Nav.displayName = 'Nav';
Nav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  appearance: oneOf(['default', 'subtle', 'tabs', 'pills']),
  // Reverse Direction of tabs/subtle
  reversed: PropTypes.bool,
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};

export default Nav;
