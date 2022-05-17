import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from './Sidenav';
import deprecatePropType from '../utils/deprecatePropType';
import MenuItem from '../Menu/MenuItem';
import isNil from 'lodash/isNil';
import { mergeRefs, shallowEqual, useClassNames } from '../utils';
import NavContext from '../Nav/NavContext';
import { useRenderDropdownItem } from '../Dropdown/useRenderDropdownItem';
import ExpandedSidenavDropdownItem from './ExpandedSidenavDropdownItem';

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
const SidenavDropdownItem: RsRefForwardingComponent<'li', SidenavDropdownItemProps> =
  React.forwardRef((props: SidenavDropdownItemProps, ref: React.Ref<any>) => {
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

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const handleSelectItem = useCallback(
      (event: React.SyntheticEvent) => {
        onSelect?.(eventKey, event);
        nav.onSelect?.(eventKey, event);
      },
      [onSelect, eventKey, nav]
    );

    const selected = activeProp || (!isNil(eventKey) && shallowEqual(nav?.activeKey, eventKey));

    const renderDropdownItem = useRenderDropdownItem(Component);

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
  });

SidenavDropdownItem.displayName = 'Sidenav.Dropdown.Item';
SidenavDropdownItem.propTypes = {
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

export default SidenavDropdownItem;
