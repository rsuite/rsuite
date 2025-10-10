'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.MoveFocusTo = exports.MenuActionTypes = void 0;
var _react = _interopRequireDefault(require("react"));
var MenuActionTypes = exports.MenuActionTypes = /*#__PURE__*/function (MenuActionTypes) {
  MenuActionTypes[MenuActionTypes["RegisterItem"] = 0] = "RegisterItem";
  MenuActionTypes[MenuActionTypes["UnregisterItem"] = 1] = "UnregisterItem";
  MenuActionTypes[MenuActionTypes["OpenMenu"] = 2] = "OpenMenu";
  MenuActionTypes[MenuActionTypes["CloseMenu"] = 3] = "CloseMenu";
  MenuActionTypes[MenuActionTypes["MoveFocus"] = 4] = "MoveFocus";
  return MenuActionTypes;
}({});
var MoveFocusTo = exports.MoveFocusTo = /*#__PURE__*/function (MoveFocusTo) {
  MoveFocusTo[MoveFocusTo["Next"] = 0] = "Next";
  MoveFocusTo[MoveFocusTo["Prev"] = 1] = "Prev";
  MoveFocusTo[MoveFocusTo["Last"] = 2] = "Last";
  MoveFocusTo[MoveFocusTo["First"] = 3] = "First";
  MoveFocusTo[MoveFocusTo["Specific"] = 4] = "Specific";
  MoveFocusTo[MoveFocusTo["None"] = 5] = "None";
  return MoveFocusTo;
}({});
// Defaults to null for checking whether a Menu is inside another menu
var MenuContext = /*#__PURE__*/_react.default.createContext(null);
MenuContext.displayName = 'MenuContext';
var _default = exports.default = MenuContext;