import * as React from 'react';

import { TypeAttributes, StandardProps } from '../@types/common';
import { IconProps } from '../Icon/Icon.d';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

export interface DropdownProps<T = any> extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

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

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T, event: React.MouseEvent<HTMLElement>) => void;

  /** The style of the menu */
  menuStyle?: object;

  /** A css class to apply to the Toggle DOM node */
  toggleClassName?: string;

  /** Custom title */
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;

  /** The value of the current option */
  eventKey?: T;

  /** You can use a custom element type for this component */
  componentClass?: React.ElementType;

  /** You can use a custom element type for this toggle component */
  toggleComponentClass?: React.ElementType;

  /** No caret variation */
  noCaret?: boolean;

  /** Open the menu and control it */
  open?: boolean;

  /** Whether Dropdown menu shows header  */
  showHeader?: boolean;
}

interface DropdownComponent extends React.ComponentClass<DropdownProps> {
  Menu: typeof DropdownMenu;
  Item: typeof DropdownMenuItem;
}

declare const Dropdown: DropdownComponent;

export default Dropdown;
