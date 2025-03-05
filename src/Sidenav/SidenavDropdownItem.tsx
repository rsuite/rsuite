import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import MenuItem from '@/internals/Menu/MenuItem';
import isNil from 'lodash/isNil';
import NavContext from '../Nav/NavContext';
import ExpandedSidenavDropdownItem from './ExpandedSidenavDropdownItem';
import { forwardRef, mergeRefs, shallowEqual } from '@/internals/utils';
import { SidenavContext } from './Sidenav';
import { useStyles } from '@/internals/hooks';
import { useRenderMenuItem } from '@/internals/Menu/useRenderMenuItem';
import type { WithAsProps, HTMLPropsWithoutSelect } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';
import type { DeprecatedDropdownItemProps } from '../Dropdown/types';

export interface SidenavDropdownItemProps<T = any>
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

  /** The submenu that this menuitem controls (if exists) */
  submenu?: React.ReactElement;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Item> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Item></Nav.Item> -> This will render <SidenavDropdownItem> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
const SidenavDropdownItem = forwardRef<'li', SidenavDropdownItemProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);
  const nav = useContext(NavContext);

  if (!sidenav || !nav) {
    throw new Error(
      '<Sidenav.Dropdown.Item> must be used within a <Nav> within a <Sidenav> component.'
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

  const { merge, withPrefix, prefix } = useStyles(classPrefix);

  const handleSelectItem = useCallback(
    (event: React.SyntheticEvent) => {
      onSelect?.(eventKey, event);
      nav.onSelect?.(eventKey, event);
    },
    [onSelect, eventKey, nav]
  );

  const selected = activeProp || (!isNil(eventKey) && shallowEqual(nav?.activeKey, eventKey));

  const renderDropdownItem = useRenderMenuItem(Component);

  if (sidenav.expanded) {
    return <ExpandedSidenavDropdownItem ref={ref} {...props} />;
  }

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

SidenavDropdownItem.displayName = 'Sidenav.Dropdown.Item';

export default SidenavDropdownItem;
