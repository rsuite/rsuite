import React, { Dispatch } from 'react';

export interface MenubarState {
  items: Array<{
    element: HTMLLIElement;
    props?: {
      disabled?: boolean;
    };
  }>;
  activeItemIndex: number | null;
}

export enum MenubarActionTypes {
  RegisterItem,
  UnregisterItem,
  MoveFocus
}

export enum MoveFocusTo {
  Next,
  Prev,
  Last,
  First,
  None
}

export type MenubarAction =
  | { type: MenubarActionTypes.RegisterItem; element: HTMLLIElement; props?: { disabled: boolean } }
  | { type: MenubarActionTypes.UnregisterItem; id: string }
  | { type: MenubarActionTypes.MoveFocus; to: MoveFocusTo };

export type MenubarContextProps = [MenubarState, Dispatch<MenubarAction>];

const MenubarContext = React.createContext<MenubarContextProps | null>(null);
MenubarContext.displayName = 'MenubarContext';

export default MenubarContext;
