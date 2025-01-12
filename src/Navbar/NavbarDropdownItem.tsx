import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import DisclosureContext, { DisclosureActionTypes } from '@/internals/Disclosure/DisclosureContext';
import NavContext from '../Nav/NavContext';
import { IconProps } from '@rsuite/icons/Icon';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, createChainedFunction, shallowEqual } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';
import { useRenderDropdownItem } from '../Dropdown/useRenderDropdownItem';
import type { WithAsProps } from '@/internals/types';

export interface NavbarDropdownItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Active the current option */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  as?: React.ElementType;

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

  /**
   * The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left.
   * @deprecated Submenus are now pointing the same direction.
   */
  pullLeft?: boolean;

  /**
   * Whether the submenu is opened.
   * @deprecated
   * @internal
   */
  open?: boolean;

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
    classPrefix = 'dropdown-item',
    className,
    active: activeProp,
    eventKey,
    onSelect,
    icon,
    as: Component = 'li',
    divider,
    panel,
    children,
    disabled,
    ...restProps
  } = props;

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

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

  const renderDropdownItem = useRenderDropdownItem(Component);

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
    withClassPrefix({
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
