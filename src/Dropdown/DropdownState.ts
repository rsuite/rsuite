interface DropdownItemState {
  /**
   * Internal ID
   */
  id: string;
  /**
   *
   */
  props: {
    selected: boolean;
  };
}

interface DropdownState {
  items: DropdownItemState[];
}

export const initialState: DropdownState = {
  items: []
};

export enum DropdownActionType {
  RegisterItem,
  UnregisterItem,
  UpdateItem
}

export type DropdownAction =
  | {
      type: DropdownActionType.RegisterItem;
      payload: {
        id: string;
        props: { selected: boolean };
      };
    }
  | { type: DropdownActionType.UnregisterItem; payload: { id: string } };

export function reducer(
  state: DropdownState = initialState,
  action: DropdownAction
): DropdownState {
  switch (action.type) {
    case DropdownActionType.RegisterItem:
      if (state.items.find(item => item.id === action.payload.id)) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload.id) {
              return {
                ...item,
                props: {
                  ...item.props,
                  selected: action.payload.props.selected
                }
              };
            }
            return item;
          })
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: action.payload.id,
            props: action.payload.props
          }
        ]
      };
    case DropdownActionType.UnregisterItem:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}
