import * as React from 'react';
import { StandardProps } from '.';

export interface SidebarProps extends StandardProps {
  /** Width */
  width?: number | string;

  collapsible?: boolean;
}

declare const Sidebar: React.ComponentType<SidebarProps>;

export default Sidebar;
