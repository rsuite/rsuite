// Inspired by tailwindlabs/headlessui
import { useReducer } from 'react';
import {
  MenubarAction,
  MenubarActionTypes,
  MenubarContextProps,
  MenubarState,
  MoveFocusTo
} from './MenubarContext';

export const initialMenubarState: MenubarState = {
  items: [],
  activeItemIndex: null
};

export function menubarReducer(state: MenubarState, action: MenubarAction): MenubarState {
  switch (action.type) {
    case MenubarActionTypes.RegisterItem:
      return {
        ...state,
        items: [...state.items, { element: action.element, props: action.props }]
      };
    case MenubarActionTypes.UnregisterItem:
      return {
        ...state,
        items: state.items.filter(item => item.element.id !== action.id)
      };
    case MenubarActionTypes.MoveFocus:
      let nextActiveItemIndex = state.activeItemIndex;

      switch (action.to) {
        case MoveFocusTo.Next:
          nextActiveItemIndex =
            nextActiveItemIndex !== null
              ? Math.min(nextActiveItemIndex + 1, state.items.length - 1)
              : 0;
          break;
        case MoveFocusTo.Prev:
          nextActiveItemIndex =
            nextActiveItemIndex !== null
              ? Math.max(nextActiveItemIndex - 1, 0)
              : state.items.length - 1;
          break;
        case MoveFocusTo.First:
          nextActiveItemIndex = 0;
          break;
        case MoveFocusTo.Last:
          nextActiveItemIndex = state.items.length - 1;
          break;
        case MoveFocusTo.None:
          nextActiveItemIndex = null;
          break;
      }

      return {
        ...state,
        activeItemIndex: nextActiveItemIndex
      };
    default:
      return state;
  }
}

export default function useMenubar(): MenubarContextProps {
  // `menuitem`s
  const [state, dispatch] = useReducer(menubarReducer, initialMenubarState);

  return [state, dispatch];
}
