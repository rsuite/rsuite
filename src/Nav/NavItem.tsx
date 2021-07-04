import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { appendTooltip, shallowEqual, useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import TreeviewRootItem from '../Sidenav/TreeviewRootItem';
import NavContext from './NavContext';
import { NavbarContext } from '../Navbar/Navbar';
import MenubarItem from '../Navbar/MenubarItem';

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
  as: SafeAnchor
};

/**
 * The <Nav.Item> API
 */
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

    const navbar = useContext(NavbarContext);
    const sidenav = useContext(SidenavContext);

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active, disabled }));

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          onSelect?.(eventKey, event);
          onClick?.(event);
        }
      },
      [disabled, onSelect, eventKey, onClick]
    );

    // If <Nav.Item> is inside <Navbar>, render a <Menubar.Item>
    if (navbar) {
      const { icon, children, eventKey, onSelect, ...extraAttributes } = omit(props, [
        'active',
        'divider',
        'panel'
      ]);
      return (
        <MenubarItem
          ref={ref}
          selected={active}
          data-event-key={eventKey}
          onActivate={e => onSelect?.(eventKey, e)}
          {...extraAttributes}
        >
          {icon}
          {children}
        </MenubarItem>
      );
    }

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
        ref={ref}
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
NavItem.displayName = 'Nav.Item';
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
