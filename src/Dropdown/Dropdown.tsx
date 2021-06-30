import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from './DropdownMenu';
import { PLACEMENT_8 } from '../utils';
import { SidenavContext, SidenavContextType } from '../Sidenav/Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownItem from './DropdownItem';
import TreeviewRootItem from '../Sidenav/TreeviewRootItem';
import MenuRoot from './MenuRoot';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface DropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** Triggering events */
  trigger?: DropdownTrigger | DropdownTrigger[];

  /** The placement of Menu */
  placement?: TypeAttributes.Placement8;

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** The style of the menu */
  menuStyle?: React.CSSProperties;

  /** A css class to apply to the Toggle DOM node */
  toggleClassName?: string;

  /** The value of the current option */
  eventKey?: T;

  /** You can use a custom element type for this toggle component */
  toggleAs?: React.ElementType;

  /** No caret variation */
  noCaret?: boolean;

  /**
   * Open the menu and control it
   * @deprecated
   */
  open?: boolean;

  /** Whether Dropdown menu shows header  */
  showHeader?: boolean;

  /** Custom title */
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T, event: React.MouseEvent<HTMLElement>) => void;
}

export interface DropdownComponent extends RsRefForwardingComponent<'div', DropdownProps> {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

const defaultProps: Partial<DropdownProps> = {
  as: 'div',
  classPrefix: 'dropdown',
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};

/**
 * The <Dropdown> API
 * When used inside <Sidenav>, renders a <TreeviewRootItem>;
 * Otherwise renders a <MenuRoot>
 */
const Dropdown: DropdownComponent = (React.forwardRef((props: DropdownProps, ref) => {
  const sidenav = useContext<SidenavContextType>(SidenavContext);

  if (sidenav?.expanded) {
    return <TreeviewRootItem ref={ref} {...props} />;
  }

  return <MenuRoot ref={ref} {...props} />;
}) as unknown) as DropdownComponent;

Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;

Dropdown.displayName = 'Dropdown';
Dropdown.defaultProps = defaultProps;
Dropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf(['click', 'hover', 'contextMenu'])
  ]),
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  open: deprecatePropType(PropTypes.bool),
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  toggleAs: PropTypes.elementType,
  noCaret: PropTypes.bool,
  showHeader: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func
};

export default Dropdown;
