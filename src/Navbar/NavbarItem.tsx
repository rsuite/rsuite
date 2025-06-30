import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import NavContext, { NavContextProps } from '../Nav/NavContext';
import SafeAnchor from '@/internals/SafeAnchor';
import Ripple from '@/internals/Ripple';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { forwardRef, shallowEqual } from '@/internals/utils';
import type { IconProps } from '@rsuite/icons/Icon';
import type { HTMLPropsWithoutSelect } from '@/internals/types';

export interface NavbarItemProps<T = string | number> extends BoxProps, HTMLPropsWithoutSelect {
  /** Activation status */
  active?: boolean;

  /** Disabled status */
  disabled?: boolean;

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
 * @private
 */
const NavbarItem = forwardRef<'a', NavbarItemProps>((props, ref) => {
  const {
    as = SafeAnchor,
    active: activeProp,
    disabled,
    eventKey,
    className,
    classPrefix = 'navbar-item',
    style,
    children,
    icon,
    onClick,
    onSelect: onSelectProp,
    ...rest
  } = props;

  const { activeKey, onSelect: onSelectFromNav } = useContext(NavContext) as NavContextProps;

  const active = activeProp ?? (!isNil(eventKey) && shallowEqual(eventKey, activeKey));

  const emitSelect = useCallback(
    (event: React.SyntheticEvent) => {
      onSelectProp?.(eventKey, event);
      onSelectFromNav?.(eventKey, event);
    },
    [eventKey, onSelectProp, onSelectFromNav]
  );

  const { prefix, withPrefix, merge } = useStyles(classPrefix);
  const classes = merge(className, withPrefix({ active, disabled }));

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        emitSelect(event);
        onClick?.(event);
      }
    },
    [disabled, emitSelect, onClick]
  );

  return (
    <Box
      as={as}
      ref={ref}
      aria-selected={active || undefined}
      {...rest}
      className={classes}
      onClick={handleClick}
      style={style}
    >
      {icon &&
        React.cloneElement(icon, {
          className: classNames(prefix('icon'), icon.props.className)
        })}
      {children}
      <Ripple />
    </Box>
  );
});

NavbarItem.displayName = 'Navbar.Item';

export default NavbarItem;
