import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import DisclosureContext, { DisclosureActionTypes } from '@/internals/Disclosure/DisclosureContext';
import NavContext from '../Nav/NavContext';
import { useStyles } from '@/internals/hooks';
import { forwardRef, createChainedFunction, shallowEqual } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';
import { useRenderMenuItem } from '@/internals/Menu/useRenderMenuItem';
import type { BoxProps } from '@/internals/Box';
import type { IconProps } from '@rsuite/icons/Icon';
import type { HTMLPropsWithoutSelect } from '@/internals/types';
import type { DeprecatedDropdownItemProps } from '../Dropdown/types';

export interface NavbarDropdownItemProps<T = any>
  extends BoxProps,
    DeprecatedDropdownItemProps,
    HTMLPropsWithoutSelect {
  /** Active the current option */
  active?: boolean;

  /** Whether to display the divider */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The submenu that this menuitem controls (if exists) */
  submenu?: React.ReactElement;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

/**
 * @private
 */
const NavbarDropdownItem = forwardRef<'li', NavbarDropdownItemProps>((props, ref) => {
  const navbar = useContext(NavbarContext);
  const nav = useContext(NavContext);

  if (!navbar || !nav) {
    throw new Error(
      '<Navbar.Dropdown.Item> must be rendered within a <Nav> component within a <Navbar> component.'
    );
  }

  const {
    as = 'li',
    active: activeProp,
    classPrefix = 'dropdown-item',
    className,
    children,
    disabled,
    divider,
    eventKey,
    icon,
    panel,
    onSelect,
    ...restProps
  } = props;

  const { merge, withPrefix, prefix } = useStyles(classPrefix);

  const handleSelectItem = useCallback(
    (event: React.SyntheticEvent) => {
      onSelect?.(eventKey, event);
      nav.onSelect?.(eventKey, event);
    },
    [onSelect, eventKey, nav]
  );
  const disclosure = useContext(DisclosureContext);

  const [, dispatchDisclosure] = disclosure ?? [];

  const handleClickNavbarDropdownItem = useCallback(
    (event: React.SyntheticEvent) => {
      dispatchDisclosure?.({ type: DisclosureActionTypes.Hide, cascade: true });
      handleSelectItem?.(event);
    },
    [dispatchDisclosure, handleSelectItem]
  );

  const selected = activeProp || (!isNil(eventKey) && shallowEqual(nav.activeKey, eventKey));

  const renderDropdownItem = useRenderMenuItem(as);

  if (divider) {
    return renderDropdownItem({
      ref,
      role: 'separator',
      className: merge(prefix('divider'), className),
      ...restProps
    });
  }

  if (panel) {
    return renderDropdownItem({
      ref,
      className: merge(prefix('panel'), className),
      children,
      ...restProps
    });
  }

  const classes = merge(
    className,
    withPrefix({
      'with-icon': icon,
      disabled,
      divider,
      panel,
      active: selected
    })
  );

  const dataAttributes: { [key: string]: any } = {
    'data-event-key': eventKey
  };

  if (!isNil(eventKey) && typeof eventKey !== 'string') {
    dataAttributes['data-event-key-type'] = typeof eventKey;
  }
  return renderDropdownItem({
    ref,
    className: classes,
    'aria-current': selected || undefined,
    ...dataAttributes,
    ...restProps,
    onClick: createChainedFunction(handleClickNavbarDropdownItem, restProps.onClick),
    children: (
      <>
        {icon &&
          React.cloneElement(icon, {
            className: classNames(prefix('menu-icon'), icon.props.className)
          })}
        {children}
      </>
    )
  });
});

NavbarDropdownItem.displayName = 'Navbar.Dropdown.Item';

export default NavbarDropdownItem;
