import * as React from 'react';
import { IconProps } from './Icon';

export interface DropdownMenuItemProps {
  /** Active the current option */
  active?: boolean;

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  componentClass: React.ReactType<DropdownMenuItemProps>;

  /** Whether to display the divider */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: any;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: any, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const DropdownMenuItem: React.ComponentType<DropdownMenuItemProps>;

export default DropdownMenuItem;
