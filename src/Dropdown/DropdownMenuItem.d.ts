import * as React from 'react';

import { StandardProps } from '../@types/common';
import { IconProps } from '../Icon/Icon.d';

export interface DropdownMenuItemProps<T = any> extends StandardProps {
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
  eventKey?: T;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Custom rendering item */
  renderItem?: (item: React.ReactNode) => React.ReactNode;
}

declare const DropdownMenuItem: React.ComponentType<DropdownMenuItemProps>;

export default DropdownMenuItem;
