'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.initialState = exports.DropdownActionType = void 0;
exports.reducer = reducer;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var initialState = exports.initialState = {
  items: []
};
var DropdownActionType = exports.DropdownActionType = /*#__PURE__*/function (DropdownActionType) {
  DropdownActionType[DropdownActionType["RegisterItem"] = 0] = "RegisterItem";
  DropdownActionType[DropdownActionType["UnregisterItem"] = 1] = "UnregisterItem";
  DropdownActionType[DropdownActionType["UpdateItem"] = 2] = "UpdateItem";
  return DropdownActionType;
}({});
function reducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }
  switch (action.type) {
    case DropdownActionType.RegisterItem:
      if (state.items.find(function (item) {
        return item.id === action.payload.id;
      })) {
        return (0, _extends2.default)({}, state, {
          items: state.items.map(function (item) {
            if (item.id === action.payload.id) {
              return (0, _extends2.default)({}, item, {
                props: (0, _extends2.default)({}, item.props, {
                  selected: action.payload.props.selected
                })
              });
            }
            return item;
          })
        });
      }
      return (0, _extends2.default)({}, state, {
        items: [].concat(state.items, [{
          id: action.payload.id,
          props: action.payload.props
        }])
      });
    case DropdownActionType.UnregisterItem:
      return (0, _extends2.default)({}, state, {
        items: state.items.filter(function (item) {
          return item.id !== action.payload.id;
        })
      });
    default:
      return state;
  }
}