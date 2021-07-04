import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import TreeviewItem from '../Sidenav/TreeviewItem';
import deprecatePropType from '../utils/deprecatePropType';
import MenuItem from './MenuItem';
import DropdownContext from './DropdownContext';
import isNil from 'lodash/isNil';
import { shallowEqual } from '../utils';

export interface DropdownMenuItemProps<T = any>
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

  /** Triggering event for submenu expansion. */
  trigger?: 'hover' | 'click';

  /**
   * Whether the submenu is opened.
   * @deprecated
   * @internal
   */
  open?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;
}

const defaultProps: Partial<DropdownMenuItemProps> = {
  as: 'li',
  classPrefix: 'dropdown-item',
  trigger: 'hover'
};

/**
 * The <Dropdown.Item> API
 * When used inside <Sidenav>, renders a <TreeviewItem>
 * Otherwise renders a <MenuItem>
 */
const DropdownItem: RsRefForwardingComponent<'li', DropdownMenuItemProps> = React.forwardRef(
  (props: DropdownMenuItemProps, ref: React.Ref<any>) => {
    const { active: activeProp, eventKey, onSelect, ...menuitemProps } = props;

    const dropdown = useContext(DropdownContext);

    const handleSelectItem = useCallback(
      (event: React.SyntheticEvent<HTMLElement>) => {
        onSelect?.(eventKey, event);
        dropdown?.onSelect?.(eventKey, event);
      },
      [onSelect, eventKey, dropdown]
    );

    const sidenav = useContext(SidenavContext);

    if (sidenav?.expanded) {
      const { children, ...restProps } = props;
      return <TreeviewItem ref={ref} title={children} {...restProps} />;
    }

    const menuitemSelected =
      activeProp || (!isNil(eventKey) && shallowEqual(dropdown?.activeKey, eventKey));

    return (
      <MenuItem
        ref={ref}
        selected={menuitemSelected}
        onActivate={handleSelectItem}
        data-event-key={eventKey}
        {...menuitemProps}
      />
    );
  }
);

DropdownItem.displayName = 'Dropdown.Item';
DropdownItem.defaultProps = defaultProps;
DropdownItem.propTypes = {
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

export default DropdownItem;
