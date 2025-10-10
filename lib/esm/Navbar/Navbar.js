'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["className", "as", "classPrefix", "appearance"];
import React from 'react';
import NavbarBody from "./NavbarBody.js";
import NavbarHeader from "./NavbarHeader.js";
import NavbarBrand from "./NavbarBrand.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
export var NavbarContext = /*#__PURE__*/React.createContext(false);
/**
 * The `Navbar` component is used to create a navigation header.
 * @see https://rsuitejs.com/components/navbar
 */
var Navbar = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Navbar', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'nav' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'navbar' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(appearance));
  return /*#__PURE__*/React.createElement(NavbarContext.Provider, {
    value: true
  }, /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes
  })));
});
Navbar.Header = NavbarHeader;
Navbar.Body = NavbarBody;
Navbar.Brand = NavbarBrand;
Navbar.displayName = 'Navbar';
export default Navbar;