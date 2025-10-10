'use client';
import React from 'react';
export var MenuActionTypes = /*#__PURE__*/function (MenuActionTypes) {
  MenuActionTypes[MenuActionTypes["RegisterItem"] = 0] = "RegisterItem";
  MenuActionTypes[MenuActionTypes["UnregisterItem"] = 1] = "UnregisterItem";
  MenuActionTypes[MenuActionTypes["OpenMenu"] = 2] = "OpenMenu";
  MenuActionTypes[MenuActionTypes["CloseMenu"] = 3] = "CloseMenu";
  MenuActionTypes[MenuActionTypes["MoveFocus"] = 4] = "MoveFocus";
  return MenuActionTypes;
}({});
export var MoveFocusTo = /*#__PURE__*/function (MoveFocusTo) {
  MoveFocusTo[MoveFocusTo["Next"] = 0] = "Next";
  MoveFocusTo[MoveFocusTo["Prev"] = 1] = "Prev";
  MoveFocusTo[MoveFocusTo["Last"] = 2] = "Last";
  MoveFocusTo[MoveFocusTo["First"] = 3] = "First";
  MoveFocusTo[MoveFocusTo["Specific"] = 4] = "Specific";
  MoveFocusTo[MoveFocusTo["None"] = 5] = "None";
  return MoveFocusTo;
}({});
// Defaults to null for checking whether a Menu is inside another menu
var MenuContext = /*#__PURE__*/React.createContext(null);
MenuContext.displayName = 'MenuContext';
export default MenuContext;