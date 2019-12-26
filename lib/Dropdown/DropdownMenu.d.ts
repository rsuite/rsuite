import * as React from 'react';

import { StandardProps } from '../@types/common';
import { IconProps } from '../Icon/Icon.d';

export interface DropdownMenuProps<T = any> extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;
}

declare const DropdownMenu: React.ComponentType<DropdownMenuProps>;

export default DropdownMenu;
