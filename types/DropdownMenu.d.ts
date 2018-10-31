import * as React from 'react';

import { IconProps } from './Icon';
import { StandardProps } from './index';

export interface DropdownMenuProps extends StandardProps {
  /** Primary content */
  children?: React.ReactNode;

  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;
}

declare const DropdownMenu: React.ComponentType<DropdownMenuProps>;

export default DropdownMenu;
