import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface SidebarProps extends StandardProps {
  /** Width */
  width?: number | string;

  /** Sidebar can be collapsed */
  collapsible?: boolean;
}

declare const Sidebar: React.ComponentType<SidebarProps>;

export default Sidebar;
