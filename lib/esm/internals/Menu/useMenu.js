'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
// Inspired by tailwindlabs/headlessui
import { useReducer } from 'react';
import { MenuActionTypes, MoveFocusTo } from "./MenuContext.js";
export var initialMenuState = {
  role: 'menu',
  open: false,
  items: [],
  activeItemIndex: null
};
export function menuReducer(state, action) {
  var items = state.items,
    activeItemIndex = state.activeItemIndex;
  switch (action.type) {
    case MenuActionTypes.RegisterItem:
      return _extends({}, state, {
        items: [].concat(items, [{
          element: action.element,
          props: action.props
        }])
      });
    case MenuActionTypes.UnregisterItem:
      return _extends({}, state, {
        items: items.filter(function (item) {
          return item.element.id !== action.id;
        })
      });
    case MenuActionTypes.OpenMenu:
      return _extends({}, state, {
        open: true
      });
    case MenuActionTypes.CloseMenu:
      return _extends({}, state, {
        open: false
      });
    case MenuActionTypes.MoveFocus:
      var nextActiveItemIndex = activeItemIndex;
      switch (action.to) {
        case MoveFocusTo.Next:
          for (var i = activeItemIndex === null ? 0 : activeItemIndex + 1; i < items.length; i++) {
            var _items$i$props;
            if (!((_items$i$props = items[i].props) !== null && _items$i$props !== void 0 && _items$i$props.disabled)) {
              nextActiveItemIndex = i;
              break;
            }
          }
          break;
        case MoveFocusTo.Prev:
          for (var _i = activeItemIndex === null ? items.length - 1 : activeItemIndex - 1; _i >= 0; _i--) {
            var _items$_i$props;
            if (!((_items$_i$props = items[_i].props) !== null && _items$_i$props !== void 0 && _items$_i$props.disabled)) {
              nextActiveItemIndex = _i;
              break;
            }
          }
          break;
        case MoveFocusTo.First:
          for (var _i2 = 0; _i2 < items.length; _i2++) {
            var _items$_i2$props;
            if (!((_items$_i2$props = items[_i2].props) !== null && _items$_i2$props !== void 0 && _items$_i2$props.disabled)) {
              nextActiveItemIndex = _i2;
              break;
            }
          }
          break;
        case MoveFocusTo.Last:
          for (var _i3 = items.length - 1; _i3 >= 0; _i3--) {
            var _items$_i3$props;
            if (!((_items$_i3$props = items[_i3].props) !== null && _items$_i3$props !== void 0 && _items$_i3$props.disabled)) {
              nextActiveItemIndex = _i3;
              break;
            }
          }
          break;
        case MoveFocusTo.Specific:
          for (var _i4 = 0; _i4 < items.length; _i4++) {
            var _items$_i4$props;
            if (items[_i4].element.id === action.id && !((_items$_i4$props = items[_i4].props) !== null && _items$_i4$props !== void 0 && _items$_i4$props.disabled)) {
              nextActiveItemIndex = _i4;
              break;
            }
          }
          break;
        case MoveFocusTo.None:
          nextActiveItemIndex = null;
          break;
      }
      return _extends({}, state, {
        activeItemIndex: nextActiveItemIndex
      });
    default:
      return state;
  }
}
export default function useMenu(initialState) {
  // `menuitem`s
  var _useReducer = useReducer(menuReducer, _extends({}, initialMenuState, initialState)),
    state = _useReducer[0],
    dispatch = _useReducer[1];
  return [state, dispatch];
}