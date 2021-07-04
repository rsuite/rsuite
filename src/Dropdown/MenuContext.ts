import React, { Dispatch } from 'react';

export type MenuContextProps = [MenuState, Dispatch<MenuAction>];

export interface MenuState {
  open: boolean;
  items: Array<{
    element: HTMLLIElement;
    props?: {
      disabled?: boolean;
    };
  }>;
  activeItemIndex: number | null;
}

export enum MenuActionTypes {
  RegisterItem,
  UnregisterItem,
  OpenMenu,
  CloseMenu,
  MoveFocus
}

export enum MoveFocusTo {
  Next,
  Prev,
  Last,
  First,
  None
}

export type MenuAction =
  | { type: MenuActionTypes.RegisterItem; element: HTMLLIElement; props?: { disabled: boolean } }
  | { type: MenuActionTypes.UnregisterItem; id: string }
  | { type: MenuActionTypes.OpenMenu }
  | { type: MenuActionTypes.CloseMenu }
  | { type: MenuActionTypes.MoveFocus; to: MoveFocusTo };

// Defaults to null for checking whether a Menu is inside another menu
const MenuContext = React.createContext<MenuContextProps | null>(null);
MenuContext.displayName = 'MenuContext';

export default MenuContext;
