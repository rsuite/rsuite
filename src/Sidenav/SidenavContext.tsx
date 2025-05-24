import React from 'react';

export interface SidenavContextType<T = string | number> {
  openKeys: T[];
  /**
   * @deprecated Use activeKey from NavContext instead
   */
  activeKey: T | undefined;
  sidenav: boolean;
  expanded: boolean;
  onOpenChange: (eventKey: T, event: React.SyntheticEvent) => void;
  /**
   * @deprecated Use onSelect from NavContext instead
   */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export const SidenavContext = React.createContext<SidenavContextType | null>(null);
