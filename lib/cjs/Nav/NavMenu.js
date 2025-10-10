'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.NavMenuContext = exports.NavMenuActionType = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _NavDropdown = _interopRequireDefault(require("./NavDropdown"));
var _NavDropdownMenu = _interopRequireDefault(require("./NavDropdownMenu"));
var _Sidenav = require("../Sidenav/Sidenav");
var _SidenavDropdown = _interopRequireDefault(require("../Sidenav/SidenavDropdown"));
var _Navbar = require("../Navbar");
var _NavbarDropdown = _interopRequireDefault(require("../Navbar/NavbarDropdown"));
var _NavbarDropdownMenu = _interopRequireDefault(require("../Navbar/NavbarDropdownMenu"));
var _SidenavDropdownMenu = _interopRequireDefault(require("../Sidenav/SidenavDropdownMenu"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var NavMenuContext = exports.NavMenuContext = /*#__PURE__*/_react.default.createContext(null);
NavMenuContext.displayName = 'NavMenu.Context';
var NavMenuActionType = exports.NavMenuActionType = /*#__PURE__*/function (NavMenuActionType) {
  NavMenuActionType[NavMenuActionType["RegisterItem"] = 0] = "RegisterItem";
  NavMenuActionType[NavMenuActionType["UnregisterItem"] = 1] = "UnregisterItem";
  return NavMenuActionType;
}({});
var initilNavMenuState = {
  items: []
};
var reducer = function reducer(state, action) {
  switch (action.type) {
    case NavMenuActionType.RegisterItem:
      return (0, _extends2.default)({}, state, {
        items: [].concat(state.items.filter(function (item) {
          return item._id !== action.payload._id;
        }), [action.payload])
      });
    case NavMenuActionType.UnregisterItem:
      return (0, _extends2.default)({}, state, {
        items: state.items.filter(function (item) {
          return item._id !== action.payload._id;
        })
      });
    default:
      throw new Error('Unrecognizable action type: ' + action.type);
  }
};

/**
 * The `Nav.Menu` component is used to create navigation menus.
 *
 * - When used as direct child of `<Nav>`, render the NavDropdown
 * - When used within another `<Nav.Menu>`, render the NavDropdownMenu
 *
 * @see https://rsuitejs.com/components/nav
 */
var NavMenu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var parentNavMenu = (0, _react.useContext)(NavMenuContext);
  var navMenuContext = (0, _react.useReducer)(reducer, initilNavMenuState);
  var navbar = (0, _react.useContext)(_Navbar.NavbarContext);
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  if (!parentNavMenu) {
    if (navbar) {
      return /*#__PURE__*/_react.default.createElement(NavMenuContext.Provider, {
        value: navMenuContext
      }, /*#__PURE__*/_react.default.createElement(_NavbarDropdown.default, (0, _extends2.default)({
        ref: ref
      }, props)));
    }
    if (sidenav) {
      return /*#__PURE__*/_react.default.createElement(NavMenuContext.Provider, {
        value: navMenuContext
      }, /*#__PURE__*/_react.default.createElement(_SidenavDropdown.default, (0, _extends2.default)({
        ref: ref
      }, props)));
    }
    return /*#__PURE__*/_react.default.createElement(NavMenuContext.Provider, {
      value: navMenuContext
    }, /*#__PURE__*/_react.default.createElement(_NavDropdown.default, (0, _extends2.default)({
      ref: ref
    }, props)));
  }
  if (navbar) {
    return /*#__PURE__*/_react.default.createElement(_NavbarDropdownMenu.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  if (sidenav) {
    return /*#__PURE__*/_react.default.createElement(_SidenavDropdownMenu.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  return /*#__PURE__*/_react.default.createElement(_NavDropdownMenu.default, (0, _extends2.default)({
    ref: ref
  }, props));
});
NavMenu.displayName = 'Nav.Menu';
var _default = exports.default = NavMenu;