import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import deprecatePropType from '../utils/deprecatePropType';
import MenuItem from '../Menu/MenuItem';
import isNil from 'lodash/isNil';
import { createChainedFunction, mergeRefs, shallowEqual, useClassNames } from '../utils';
import { NavbarContext } from '../Navbar/Navbar';
import SidenavDropdownItem from '../Sidenav/SidenavDropdownItem';
import DisclosureContext, { DisclosureActionTypes } from '../Disclosure/DisclosureContext';
import NavContext from './NavContext';
import useInternalId from '../utils/useInternalId';
import DropdownContext from '../Dropdown/DropdownContext';
import { DropdownActionType } from '../Dropdown/DropdownState';
import { useRenderDropdownItem } from '../Dropdown/useRenderDropdownItem';

export interface NavDropdownItemProps<T = any>
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
 * The <Dropdown.Item> API
 * When used inside <Sidenav>, renders a <TreeviewItem>
 * Otherwise renders a <MenuItem>
 */
const NavDropdownItem: RsRefForwardingComponent<'li', NavDropdownItemProps> = React.forwardRef(
  (props: NavDropdownItemProps, ref: React.Ref<any>) => {
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

    const internalId = useInternalId('DropdownItem');

    const nav = useContext(NavContext);

    if (!nav.withinNav) {
      throw new Error('<Nav.Dropdown.Item> should be used within a <Nav> component.');
    }

    const dropdown = useContext(DropdownContext);
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const handleSelectItem = useCallback(
      (event: React.SyntheticEvent) => {
        onSelect?.(eventKey, event);
        dropdown?.onSelect?.(eventKey, event);
      },
      [onSelect, eventKey, dropdown]
    );

    const sidenav = useContext(SidenavContext);
    const navbar = useContext(NavbarContext);
    const disclosure = useContext(DisclosureContext);

    const [, dispatchDisclosure] = disclosure ?? [];

    const handleClickNavbarDropdownItem = useCallback(
      (event: React.SyntheticEvent) => {
        dispatchDisclosure?.({ type: DisclosureActionTypes.Hide, cascade: true });
        handleSelectItem?.(event);
      },
      [dispatchDisclosure, handleSelectItem]
    );

    const selected =
      activeProp ||
      (!isNil(eventKey) &&
        (shallowEqual(dropdown?.activeKey, eventKey) || shallowEqual(nav?.activeKey, eventKey)));

    const dispatch = dropdown?.dispatch;

    useEffect(() => {
      if (dispatch) {
        dispatch({
          type: DropdownActionType.RegisterItem,
          payload: {
            id: internalId,
            props: {
              selected
            }
          }
        });

        return () => {
          dispatch({
            type: DropdownActionType.UnregisterItem,
            payload: {
              id: internalId
            }
          });
        };
      }
    }, [internalId, selected, dispatch]);

    const renderDropdownItem = useRenderDropdownItem(Component);

    if (sidenav?.expanded) {
      return <SidenavDropdownItem ref={ref} {...props} />;
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

    if (navbar) {
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
            {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
            {children}
          </>
        )
      });
    }

    return (
      <MenuItem selected={selected} disabled={disabled} onActivate={handleSelectItem}>
        {({ selected, active, ...menuitem }, menuitemRef) => {
          const classes = merge(
            className,
            withClassPrefix({
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
                {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                {children}
              </>
            )
          });
        }}
      </MenuItem>
    );
  }
);

NavDropdownItem.displayName = 'Nav.Dropdown.Item';
NavDropdownItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  open: deprecatePropType(PropTypes.bool),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: deprecatePropType(PropTypes.bool),
  submenu: PropTypes.element,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number
};

export default NavDropdownItem;
