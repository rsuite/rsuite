import React, { useCallback, useContext } from 'react';
import isNil from 'lodash/isNil';
import Ripple from '@/internals/Ripple';
import SafeAnchor from '../SafeAnchor';
import NavContext from '../Nav/NavContext';
import { forwardRef, createChainedFunction, shallowEqual } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { SidenavContext } from './Sidenav';
import { useRenderDropdownItem } from '../Dropdown/useRenderDropdownItem';
import type { IconProps } from '@rsuite/icons/Icon';
import type { WithAsProps } from '@/internals/types';

export interface SidenavDropdownItemProps<T = any>
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

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
const ExpandedSidenavDropdownItem = forwardRef<'li', SidenavDropdownItemProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);
  const nav = useContext(NavContext);

  if (!sidenav || !nav) {
    throw new Error(
      '<SidenavDropdownItem> component is not supposed to be used standalone. Use <Nav.Item> within <Sidenav> instead.'
    );
  }
  const {
    as: Component = 'li',
    active: activeProp,
    classPrefix = 'dropdown-item',
    children,
    disabled,
    divider,
    panel,
    className,
    style,
    icon,
    eventKey,
    onClick,
    onSelect,
    ...rest
  } = props;

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  const selected =
    activeProp ??
    (!isNil(eventKey) &&
      (shallowEqual(eventKey, sidenav.activeKey) || shallowEqual(nav.activeKey, eventKey)));

  const classes = merge(
    className,
    withClassPrefix({
      'with-icon': icon,
      active: selected,
      disabled
    })
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (disabled) return;

      onSelect?.(eventKey, event);
      nav.onSelect?.(eventKey, event);
      sidenav.onSelect?.(eventKey, event);
    },
    [disabled, onSelect, sidenav, eventKey, nav]
  );

  const menuitemEventHandlers: React.HTMLAttributes<HTMLElement> = {
    onClick: createChainedFunction(handleClick, onClick)
  };

  const renderDropdownItem = useRenderDropdownItem(Component);

  if (divider) {
    return renderDropdownItem({
      ref,
      role: 'separator',
      style,
      className: merge(prefix('divider'), className),
      ...rest
    });
  }

  if (panel) {
    return renderDropdownItem({
      ref,
      role: 'none presentation',
      style,
      className: merge(prefix('panel'), className),
      ...rest,
      children
    });
  }

  return renderDropdownItem(
    {
      ref,
      ...rest,
      style,
      className: classes,
      'aria-current': selected || undefined,
      ...menuitemEventHandlers,
      children: (
        <>
          {icon &&
            React.cloneElement(icon, {
              className: merge(prefix('menu-icon'), icon.props.className)
            })}
          {children}
          <Ripple />
        </>
      )
    },
    SafeAnchor
  );
});

ExpandedSidenavDropdownItem.displayName = 'Sidenav.Dropdown.Item';

export default ExpandedSidenavDropdownItem;
