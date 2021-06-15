import React from 'react';
import { DropdownMenuItemProps } from './MenuItem';

export interface ItemRegistryEntry {
  element: HTMLLIElement;
  props?: Partial<DropdownMenuItemProps>;
}

/**
 * - 1: move focus to next item
 * - -1: move focus to previous item
 */
export type MoveItemFocusDelta = 1 | -1;

/**
 * - 0: focus first item
 * - -1: focus last item
 */
export type FocusItemAtIndex = 0 | -1;

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
  items: ItemRegistryEntry[];
  /**
   * Index of current active item
   */
  activeItemIndex: number | null;
  /**
   * Feeds the menuitem DOM info back into menu
   */
  registerItem: (element: HTMLElement, props?: Partial<DropdownMenuItemProps>) => void;
  /**
   * Remove menuitem registry by element id (used when menuitem unmounts)
   * When dom unmounts, it's likely the ref is already cleared,
   * so use id as argument instead of the element itself
   */
  unregisterItem: (id: string) => void;
  /**
   * Request moving focus onto item at given index
   * If index is `null`, remove focus from current active item
   */
  focusItemAt: (index: FocusItemAtIndex | null) => void;
  /**
   * Move focus up/down between items
   */
  moveItemFocus: (delta: MoveItemFocusDelta) => void;
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
