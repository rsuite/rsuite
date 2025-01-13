import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import Ripple from '@/internals/Ripple';
import SafeAnchor from '../SafeAnchor';
import NavContext from './NavContext';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, shallowEqual } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

export interface NavItemProps<T = string | number>
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
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

/**
 * The `Nav.Item` component is used to create navigation links.
 *
 * - When used as direct child of `<Nav>`, render the NavItem
 * - When used within a `<Nav.Menu>`, render the NavDropdownItem
 * @see https://rsuitejs.com/components/nav
 *
 */
const NavItem = forwardRef<'a', NavItemProps>((props, ref) => {
  const nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }

  const {
    as: Component = SafeAnchor,
    active: activeProp,
    disabled,
    eventKey,
    className,
    classPrefix = 'nav-item',
    style,
    children,
    icon,
    divider,
    panel,
    onClick,
    onSelect: onSelectProp,
    ...rest
  } = props;

  const { activeKey, onSelect: onSelectFromNav } = nav;

  const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

  const emitSelect = useCallback(
    (event: React.SyntheticEvent) => {
      onSelectProp?.(eventKey, event);
      onSelectFromNav?.(eventKey, event);
    },
    [eventKey, onSelectProp, onSelectFromNav]
  );

  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix({ active, disabled }));

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        emitSelect(event);
        onClick?.(event);
      }
    },
    [disabled, emitSelect, onClick]
  );

  if (divider) {
    return (
      <div
        ref={ref}
        role="separator"
        style={style}
        className={merge(className, prefix('divider'))}
        {...rest}
      />
    );
  }

  if (panel) {
    return (
      <div ref={ref} style={style} className={merge(className, prefix('panel'))} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      tabIndex={disabled ? -1 : undefined}
      {...rest}
      className={classes}
      onClick={handleClick}
      style={style}
      aria-selected={active || undefined}
    >
      {icon &&
        React.cloneElement(icon, {
          className: classNames(prefix('icon'), icon.props.className)
        })}
      {children}
      <Ripple />
    </Component>
  );
});

NavItem.displayName = 'Nav.Item';

export default NavItem;
