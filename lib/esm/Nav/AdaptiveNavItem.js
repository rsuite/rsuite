'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useContext, useEffect } from 'react';
import NavItem from "./NavItem.js";
import { useInternalId } from "../internals/hooks/index.js";
import { NavbarContext } from "../Navbar/Navbar.js";
import { SidenavContext } from "../Sidenav/Sidenav.js";
import NavContext from "./NavContext.js";
import { NavMenuActionType, NavMenuContext } from "./NavMenu.js";
import NavDropdownItem from "./NavDropdownItem.js";
import NavbarDropdownItem from "../Navbar/NavbarDropdownItem.js";
import SidenavDropdownItem from "../Sidenav/SidenavDropdownItem.js";
import NavbarItem from "../Navbar/NavbarItem.js";
import SidenavItem from "../Sidenav/SidenavItem.js";

/**
 * The <Nav.Item> API
 * When used as direct child of <Nav>, render the NavItem
 * When used within a <Nav.Menu>, render the NavDropdownItem
 */
var AdaptiveNavItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var nav = useContext(NavContext);
  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }
  var parentNavMenu = useContext(NavMenuContext);
  var navbar = useContext(NavbarContext);
  var sidenav = useContext(SidenavContext);
  var _ref = parentNavMenu !== null && parentNavMenu !== void 0 ? parentNavMenu : [],
    dispatch = _ref[1];
  var _id = useInternalId('Nav.Item');
  useEffect(function () {
    if (dispatch) {
      var _props$active;
      dispatch({
        type: NavMenuActionType.RegisterItem,
        payload: {
          _id: _id,
          eventKey: props.eventKey,
          active: (_props$active = props.active) !== null && _props$active !== void 0 ? _props$active : false
        }
      });
      return function () {
        dispatch({
          type: NavMenuActionType.UnregisterItem,
          payload: {
            _id: _id
          }
        });
      };
    }
  }, [dispatch, _id, props.eventKey, props.active]);
  if (parentNavMenu) {
    if (navbar) {
      return /*#__PURE__*/React.createElement(NavbarDropdownItem, _extends({
        ref: ref
      }, props));
    }
    if (sidenav) {
      return /*#__PURE__*/React.createElement(SidenavDropdownItem, _extends({
        ref: ref
      }, props));
    }
    return /*#__PURE__*/React.createElement(NavDropdownItem, _extends({
      ref: ref
    }, props));
  }
  if (navbar) {
    return /*#__PURE__*/React.createElement(NavbarItem, _extends({
      ref: ref
    }, props));
  }
  if (sidenav) {
    return /*#__PURE__*/React.createElement(SidenavItem, _extends({
      ref: ref
    }, props));
  }
  return /*#__PURE__*/React.createElement(NavItem, _extends({
    ref: ref
  }, props));
});
AdaptiveNavItem.displayName = 'Nav.Item';
export default AdaptiveNavItem;