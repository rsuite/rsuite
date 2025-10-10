'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
export var initialState = {
  items: []
};
export var DropdownActionType = /*#__PURE__*/function (DropdownActionType) {
  DropdownActionType[DropdownActionType["RegisterItem"] = 0] = "RegisterItem";
  DropdownActionType[DropdownActionType["UnregisterItem"] = 1] = "UnregisterItem";
  DropdownActionType[DropdownActionType["UpdateItem"] = 2] = "UpdateItem";
  return DropdownActionType;
}({});
export function reducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case DropdownActionType.RegisterItem:
      if (state.items.find(function (item) {
        return item.id === action.payload.id;
      })) {
        return _extends({}, state, {
          items: state.items.map(function (item) {
            if (item.id === action.payload.id) {
              return _extends({}, item, {
                props: _extends({}, item.props, {
                  selected: action.payload.props.selected
                })
              });
            }
            return item;
          })
        });
      }
      return _extends({}, state, {
        items: [].concat(state.items, [{
          id: action.payload.id,
          props: action.payload.props
        }])
      });
    case DropdownActionType.UnregisterItem:
      return _extends({}, state, {
        items: state.items.filter(function (item) {
          return item.id !== action.payload.id;
        })
      });
    default:
      return state;
  }
}