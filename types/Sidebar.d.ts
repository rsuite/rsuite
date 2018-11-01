import * as React from 'react';

export interface SidebarProps {
  /** Width */
  width: number | string;

  collapsible?: boolean;
}

declare const Sidebar: React.ComponentType<SidebarProps>;

export default Sidebar;
