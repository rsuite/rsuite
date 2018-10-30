import * as React from 'react';

export interface DropdownMenuProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /** Set the icon */
  icon?: React.ReactNode;
}

declare const DropdownMenu: React.ComponentType<DropdownMenuProps>;

export default DropdownMenu;
