import React from 'react';

export interface MenuContextProps {
  /**
   * Reference of active child item
   */
  activeKey?: string;
  /**
   * `aria-activedescendant` passing down
   */
  activeDescendantId: string | null;
  /**
   * Specify which submenus (if exists) are open by default
   */
  openKeys: string[];
  /**
   * Only the outer-most menu would receive this directly as prop  (usually when menus are inside Sidenav)
   * Submenus can only access this prop from context
   */
  collapsible?: boolean;
  /**
   * Callback when menuitem is triggered
   */
  onSelect: (eventKey: string, event: React.SyntheticEvent<HTMLElement>) => void;
  /**
   * Feeds the menuitem DOM info back into menu
   */
  onItemRendered?: (element: HTMLElement) => void;
}

/**
 * Defaults to null for checking whether a Menu is inside another menu
 */
export default React.createContext<MenuContextProps>(null);
