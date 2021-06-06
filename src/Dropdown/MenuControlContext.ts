import React from 'react';

/**
 * The context used in the element that controls a menu, e.g. menu button
 */
export interface MenuControlContextProps {
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
}

const MenuControlContext = React.createContext<MenuControlContextProps | null>(null);
MenuControlContext.displayName = 'MenuControlContext';

export default MenuControlContext;
