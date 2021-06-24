import React, { useCallback, useContext } from 'react';
import MenuContext from './MenuContext';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import isNil from 'lodash/isNil';
import { shallowEqual, useClassNames } from '../utils';
import PropTypes from 'prop-types';
import { StandardProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';

export interface DropdownMenuProps<T = string> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /**
   *  Only used for setting the default expand state when it's a submenu.
   *  Used in conjunction with `openKeys` from parents
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  open?: boolean;
  openKeys?: T[];
  collapsible?: boolean;
  expanded?: boolean;
  active?: boolean;
  activeKey?: T;
  trigger?: 'hover' | 'click';
  onSelect?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
  onToggle?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
}

const defaultProps: Partial<MenuProps> = {
  openKeys: [],
  classPrefix: 'dropdown-menu'
};

/**
 * <Dropdown.Menu>
 *
 * @description
 * Note the difference between this component and <Menu> component:
 * <Menu> is used for ARIA menu control logic and is used internally only.
 * This component is only used for supporting submenu syntax and is
 * assigned to Dropdown.Menu
 *
 * @example
 *
 * <Dropdown>
 *   <Dropdown.Item>Item 1</Dropdown.Item>
 *   <Dropdown.Menu title="Submenu">
 *     <Dropdown.Item>Sub item</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 */
const DropdownMenu = React.forwardRef(
  (props: MenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onSelect'>, ref) => {
    const { openKeys, onToggle, eventKey, ...rest } = props;

    const parentMenu = useContext(MenuContext);

    const handleToggleSubmenu = useCallback(
      (_: string, event: React.MouseEvent) => {
        onToggle?.(eventKey, event);
      },
      [eventKey, onToggle]
    );
    const { merge, prefix } = useClassNames(props.classPrefix);

    // Parent menu exists. This is a submenu.
    // Should render a `menuitem` that controls this submenu.
    if (parentMenu) {
      const { icon, open, trigger, eventKey, title, className } = props;
      const expanded = !isNil(eventKey) && openKeys.some(key => shallowEqual(key, eventKey));
      const itemClassName = merge(className, prefix('pull-right'));

      return (
        <MenuItem
          icon={icon}
          trigger={trigger}
          expanded={expanded}
          className={itemClassName}
          submenu={<Menu ref={ref} open={open} onToggle={handleToggleSubmenu} {...rest} />}
          eventKey={eventKey}
        >
          {title}
        </MenuItem>
      );
    }

    return <Menu ref={ref} {...rest} />;
  }
);

DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.defaultProps = defaultProps;
DropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  trigger: PropTypes.oneOf(['click', 'hover']),
  eventKey: PropTypes.any,
  openKeys: PropTypes.array,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};

export default DropdownMenu;
