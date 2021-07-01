import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { appendTooltip, shallowEqual, useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import TreeviewRootItem from '../Sidenav/TreeviewRootItem';
import NavContext from './NavContext';
import { NavbarContext } from '../Navbar/Navbar';
import MenubarContext, { MenubarActionTypes } from './MenubarContext';
import useEnsuredRef from '../utils/useEnsuredRef';
import useUniqueId from '../utils/useUniqueId';

export interface NavItemProps<T = string>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Activation status */
  active?: boolean;

  /** Disabled status */
  disabled?: boolean;

  /** divier for nav item */
  divider?: boolean;

  /** display panel */
  panel?: boolean;

  /** Sets the icon for the component */
  icon?: React.ReactElement<IconProps>;

  /** The value of the current option */
  eventKey?: T;

  /** Providing a `href` will render an `<a>` element */
  href?: string;

  /** Select the callback function that the event triggers. */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<NavItemProps> = {
  classPrefix: 'nav-item',
  as: SafeAnchor,
  tabIndex: 0
};

const NavItem: RsRefForwardingComponent<'a', NavItemProps> = React.forwardRef(
  (props: NavItemProps, ref: React.Ref<any>) => {
    const {
      as: Component,
      active: activeProp,
      disabled,
      eventKey,
      className,
      classPrefix,
      style,
      children,
      icon,
      tabIndex,
      divider,
      panel,
      onClick,
      onSelect,
      ...rest
    } = props;

    const { activeKey } = useContext(NavContext);

    const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

    const sidenav = useContext(SidenavContext);
    const navbar = useContext(NavbarContext);

    const menubar = useContext(MenubarContext);
    const [menubarState, dispatch] = menubar ?? [];
    const menuitemRef = useEnsuredRef<HTMLLIElement>(ref);
    const menuitemId = useUniqueId('menuitem-');

    const hasFocus = !menubarState
      ? false
      : !isNil(menubarState.activeItemIndex) &&
        menubarState.items[menubarState.activeItemIndex].element === menuitemRef.current;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ focus: hasFocus, active, disabled }));

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          onSelect?.(eventKey, event);
          onClick?.(event);
        }
      },
      [disabled, onSelect, eventKey, onClick]
    );

    useEffect(() => {
      if (navbar && !divider && !panel) {
        const menuitem = menuitemRef.current;
        dispatch({ type: MenubarActionTypes.RegisterItem, element: menuitem, props: { disabled } });

        return () => {
          dispatch({ type: MenubarActionTypes.UnregisterItem, id: menuitem.id });
        };
      }
    }, [navbar, menuitemRef, dispatch, disabled, divider, panel]);

    if (sidenav?.expanded) {
      const { children, ...restProps } = props;
      return <TreeviewRootItem title={children} {...restProps} />;
    }

    if (divider) {
      return (
        <div
          ref={ref}
          role="separator"
          style={style}
          className={merge(className, prefix('divider'))}
        />
      );
    }

    if (panel) {
      return (
        <div ref={ref} style={style} className={merge(className, prefix('panel'))}>
          {children}
        </div>
      );
    }

    const ariaAttributes: React.HTMLAttributes<HTMLElement> = {};

    if (navbar) {
      ariaAttributes.role = 'menuitem';
    }

    const item = (
      <Component
        ref={menuitemRef}
        id={menuitemId}
        aria-selected={active}
        {...rest}
        tabIndex={navbar ? -1 : tabIndex}
        disabled={Component === SafeAnchor ? disabled : null}
        className={classes}
        onClick={handleClick}
        style={style}
        {...ariaAttributes}
      >
        {icon}
        {children}
        <Ripple />
      </Component>
    );

    // Show tooltip when inside a collapse <Sidenav>
    const tooltip = sidenav && !sidenav.expanded;

    return tooltip
      ? appendTooltip({
          children: item,
          message: children,
          placement: 'right'
        })
      : item;
  }
);

NavItem.defaultProps = defaultProps;
NavItem.displayName = 'NavItem';
NavItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any,
  tabIndex: PropTypes.number
};

export default NavItem;
