import { MenuAction, MenuContextProps, MenuState } from './MenuContext';
export declare const initialMenuState: MenuState;
export declare function menuReducer(state: MenuState, action: MenuAction): MenuState;
export default function useMenu(initialState?: Partial<MenuState>): MenuContextProps;
