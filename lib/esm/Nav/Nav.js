'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "appearance", "vertical", "justified", "reversed", "pullRight", "className", "children", "activeKey", "defaultActiveKey", "onSelect"];
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import NavContext from "./NavContext.js";
import Menubar from "../internals/Menu/Menubar.js";
import NavDropdown from "./NavDropdown.js";
import NavMenu from "./NavMenu.js";
import NavDropdownItem from "./NavDropdownItem.js";
import NavDropdownMenu from "./NavDropdownMenu.js";
import AdaptiveNavItem from "./AdaptiveNavItem.js";
import { useClassNames, useEnsuredRef, useControlled } from "../internals/hooks/index.js";
import { NavbarContext } from "../Navbar/Navbar.js";
import { SidenavContext } from "../Sidenav/Sidenav.js";
import { oneOf } from "../internals/propTypes/index.js";
import { deprecateComponent } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Nav` component is used to create navigation links.
 * @see https://rsuitejs.com/components/nav
 */
var Nav = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Nav', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'nav' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    vertical = propsWithDefaults.vertical,
    justified = propsWithDefaults.justified,
    reversed = propsWithDefaults.reversed,
    pullRight = propsWithDefaults.pullRight,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    activeKeyProp = propsWithDefaults.activeKey,
    defaultActiveKey = propsWithDefaults.defaultActiveKey,
    onSelectProp = propsWithDefaults.onSelect,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var sidenav = useContext(SidenavContext);

  // Whether inside a <Navbar>
  var navbar = useContext(NavbarContext);
  var menubarRef = useEnsuredRef(ref);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    rootPrefix = _useClassNames.rootPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, rootPrefix({
    'navbar-nav': navbar,
    'navbar-right': pullRight,
    'sidenav-nav': sidenav
  }), withClassPrefix(appearance, {
    horizontal: navbar || !vertical && !sidenav,
    vertical: vertical || sidenav,
    justified: justified,
    reversed: reversed
  }));
  var _ref = sidenav || {},
    activeKeyFromSidenav = _ref.activeKey,
    onSelectFromSidenav = _ref.onSelect;
  var _useControlled = useControlled(activeKeyProp !== null && activeKeyProp !== void 0 ? activeKeyProp : activeKeyFromSidenav, defaultActiveKey),
    activeKey = _useControlled[0],
    setActiveKey = _useControlled[1];
  var contextValue = useMemo(function () {
    return {
      activeKey: activeKey,
      onSelect: function onSelect(eventKey, event) {
        setActiveKey(eventKey);
        onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
        onSelectFromSidenav === null || onSelectFromSidenav === void 0 || onSelectFromSidenav(eventKey, event);
      }
    };
  }, [activeKey, onSelectFromSidenav, onSelectProp, setActiveKey]);
  if (sidenav !== null && sidenav !== void 0 && sidenav.expanded) {
    return /*#__PURE__*/React.createElement(NavContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement("ul", _extends({
      ref: ref,
      className: classes
    }, rest), children));
  }
  var hasWaterline = appearance !== 'default';

  // If inside a collapsed <Sidenav>, render an ARIA `menubar` (vertical)
  if (sidenav) {
    return /*#__PURE__*/React.createElement(NavContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement(Menubar, {
      vertical: !!sidenav
    }, function (menubar, ref) {
      return /*#__PURE__*/React.createElement(Component, _extends({
        ref: ref
      }, rest, {
        className: classes
      }, menubar), children);
    }));
  }
  return /*#__PURE__*/React.createElement(NavContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: menubarRef,
    className: classes
  }), children, hasWaterline && /*#__PURE__*/React.createElement("div", {
    className: prefix('bar')
  })));
});
var DeprecatedNavDropdown = deprecateComponent(NavDropdown, '<Nav.Dropdown> is deprecated, use <Nav.Menu> instead.');
DeprecatedNavDropdown.Menu = deprecateComponent(NavDropdownMenu, '<Nav.Dropdown.Menu> is deprecated, use <Nav.Menu> instead');
DeprecatedNavDropdown.Item = deprecateComponent(NavDropdownItem, '<Nav.Dropdown.Item> is deprecated, use <Nav.Item> instead');
Nav.Dropdown = DeprecatedNavDropdown;
Nav.Item = AdaptiveNavItem;
Nav.Menu = NavMenu;
Nav.displayName = 'Nav';
Nav.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  appearance: oneOf(['default', 'subtle', 'tabs', 'pills']),
  // Reverse Direction of tabs/subtle
  reversed: PropTypes.bool,
  justified: PropTypes.bool,
  vertical: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};
export default Nav;