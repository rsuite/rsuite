import React from 'react';

/**
 * The context used in the element that controls a menu, e.g. menu button
 */
export interface MenuControlContextProps {
  /**
   * Whether menu is open/visible
   */
  open: boolean;
  /**
   * Items' DOM elements
   */
  items: HTMLLIElement[];
  /**
   * Index of current active item
   */
  activeItemIndex: number | null;
  /**
   * Feeds the menuitem DOM info back into menu
   */
  registerItem: (item: HTMLElement) => void;
  /**
   * Remove menuitem registry by element id (used when menuitem unmounts)
   * When dom unmounts, it's likely the ref is already cleared,
   * so use id as argument instead of the element itself
   */
  unregisterItem: (id: string) => void;
  /**
   * Request moving focus onto given item element
   */
  focusItem: (item: HTMLLIElement | null) => void;
  /**
   * Request moving focus onto item at given index
   * If index is `null`, remove focus from current active item
   */
  focusItemAt: (index: number | null) => void;
  /**
   * Move focus up/down between items
   */
  moveItemFocus: (delta: number) => void;
  /**
   * Open the menu
   */
  openMenu: () => void;
  /**
   * Close menu and return focus to its context (if exists)
   */
  closeMenu: () => void;
}

const MenuControlContext = React.createContext<MenuControlContextProps | null>(null);
MenuControlContext.displayName = 'MenuControlContext';

export default MenuControlContext;
