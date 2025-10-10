'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _NavItem = _interopRequireDefault(require("./NavItem"));
var _hooks = require("../internals/hooks");
var _Navbar = require("../Navbar/Navbar");
var _Sidenav = require("../Sidenav/Sidenav");
var _NavContext = _interopRequireDefault(require("./NavContext"));
var _NavMenu = require("./NavMenu");
var _NavDropdownItem = _interopRequireDefault(require("./NavDropdownItem"));
var _NavbarDropdownItem = _interopRequireDefault(require("../Navbar/NavbarDropdownItem"));
var _SidenavDropdownItem = _interopRequireDefault(require("../Sidenav/SidenavDropdownItem"));
var _NavbarItem = _interopRequireDefault(require("../Navbar/NavbarItem"));
var _SidenavItem = _interopRequireDefault(require("../Sidenav/SidenavItem"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
var AdaptiveNavItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var nav = (0, _react.useContext)(_NavContext.default);
  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }
  var parentNavMenu = (0, _react.useContext)(_NavMenu.NavMenuContext);
  var navbar = (0, _react.useContext)(_Navbar.NavbarContext);
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  var _ref = parentNavMenu !== null && parentNavMenu !== void 0 ? parentNavMenu : [],
    dispatch = _ref[1];
  var _id = (0, _hooks.useInternalId)('Nav.Item');
  (0, _react.useEffect)(function () {
    if (dispatch) {
      var _props$active;
      dispatch({
        type: _NavMenu.NavMenuActionType.RegisterItem,
        payload: {
          _id: _id,
          eventKey: props.eventKey,
          active: (_props$active = props.active) !== null && _props$active !== void 0 ? _props$active : false
        }
      });
      return function () {
        dispatch({
          type: _NavMenu.NavMenuActionType.UnregisterItem,
          payload: {
            _id: _id
          }
        });
      };
    }
  }, [dispatch, _id, props.eventKey, props.active]);
  if (parentNavMenu) {
    if (navbar) {
      return /*#__PURE__*/_react.default.createElement(_NavbarDropdownItem.default, (0, _extends2.default)({
        ref: ref
      }, props));
    }
    if (sidenav) {
      return /*#__PURE__*/_react.default.createElement(_SidenavDropdownItem.default, (0, _extends2.default)({
        ref: ref
      }, props));
    }
    return /*#__PURE__*/_react.default.createElement(_NavDropdownItem.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  if (navbar) {
    return /*#__PURE__*/_react.default.createElement(_NavbarItem.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  if (sidenav) {
    return /*#__PURE__*/_react.default.createElement(_SidenavItem.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  return /*#__PURE__*/_react.default.createElement(_NavItem.default, (0, _extends2.default)({
    ref: ref
  }, props));
});
AdaptiveNavItem.displayName = 'Nav.Item';
var _default = exports.default = AdaptiveNavItem;