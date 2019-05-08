import * as React from 'react';

import { StandardProps } from './index';
import { IconProps } from './Icon';

export interface DropdownMenuItemProps extends StandardProps {
  /** Active the current option */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  componentClass?: React.ElementType;

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
