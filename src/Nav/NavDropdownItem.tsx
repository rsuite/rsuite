import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import MenuItem from '@/internals/Menu/MenuItem';
import NavContext from './NavContext';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeRefs, shallowEqual } from '@/internals/utils';
import { useRenderMenuItem } from '@/internals/Menu/useRenderMenuItem';
import type { IconProps } from '@rsuite/icons/Icon';
import type { WithAsProps, HTMLPropsWithoutSelect } from '@/internals/types';
import type { DeprecatedDropdownItemProps } from '../Dropdown/types';

export interface NavDropdownItemProps<T = any>
  extends WithAsProps,
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

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

/**
 * @private
 */
const NavDropdownItem = forwardRef<'li', NavDropdownItemProps>((props, ref) => {
  const nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Dropdown.Item> should be used within a <Nav> component.');
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

  const { activeKey, onSelect: onSelectFromNav } = nav;

  const { merge, withPrefix, prefix } = useStyles(classPrefix);

  const selected = activeProp || (!isNil(eventKey) && shallowEqual(activeKey, eventKey));

  const handleSelectItem = useCallback(
    (event: React.SyntheticEvent) => {
      onSelect?.(eventKey, event);
      onSelectFromNav?.(eventKey, event);
    },
    [onSelect, eventKey, onSelectFromNav]
  );

  const renderDropdownItem = useRenderMenuItem(Component);

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
  return (
    <MenuItem selected={selected} disabled={disabled} onActivate={handleSelectItem}>
      {({ selected, active, ...menuitem }, menuitemRef) => {
        const classes = merge(
          className,
          withPrefix({
            'with-icon': icon,
            active: selected,
            disabled,
            focus: active,
            divider,
            panel
          })
        );

        const dataAttributes: { [key: string]: any } = {
          'data-event-key': eventKey
        };

        if (!isNil(eventKey) && typeof eventKey !== 'string') {
          dataAttributes['data-event-key-type'] = typeof eventKey;
        }

        return renderDropdownItem({
          ref: mergeRefs(ref, menuitemRef),
          className: classes,
          ...menuitem,
          ...dataAttributes,
          ...restProps,
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
      }}
    </MenuItem>
  );
});

NavDropdownItem.displayName = 'Nav.Dropdown.Item';

export default NavDropdownItem;
