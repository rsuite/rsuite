import React, { Dispatch } from 'react';
export type MenuContextProps = [MenuState, Dispatch<MenuAction>];
export interface MenuState {
    role: 'menu' | 'menubar';
    open: boolean;
    items: Array<{
        element: HTMLLIElement;
        props?: {
            disabled?: boolean;
        };
    }>;
    activeItemIndex: number | null;
}
export declare enum MenuActionTypes {
    RegisterItem = 0,
    UnregisterItem = 1,
    OpenMenu = 2,
    CloseMenu = 3,
    MoveFocus = 4
}
export declare enum MoveFocusTo {
    Next = 0,
    Prev = 1,
    Last = 2,
    First = 3,
    Specific = 4,
    None = 5
}
export type MenuAction = {
    type: MenuActionTypes.RegisterItem;
    element: HTMLLIElement;
    props?: {
        disabled: boolean;
    };
} | {
    type: MenuActionTypes.UnregisterItem;
    id: string;
} | {
    type: MenuActionTypes.OpenMenu;
} | {
    type: MenuActionTypes.CloseMenu;
} | {
    type: MenuActionTypes.MoveFocus;
    to: Exclude<MoveFocusTo, MoveFocusTo.Specific>;
} | {
    type: MenuActionTypes.MoveFocus;
    to: MoveFocusTo.Specific;
    id: string;
};
declare const MenuContext: React.Context<MenuContextProps | null>;
export default MenuContext;
