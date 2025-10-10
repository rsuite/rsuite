'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "appearance", "expanded", "activeKey", "defaultOpenKeys", "openKeys", "onSelect", "onOpenChange"],
  _excluded2 = ["className"];
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';
import Transition from "../Animation/Transition.js";
import SidenavBody from "./SidenavBody.js";
import SidenavHeader from "./SidenavHeader.js";
import SidenavToggle from "./SidenavToggle.js";
import { useClassNames, useControlled } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { mergeRefs, shallowEqual } from "../internals/utils/index.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
export var SidenavContext = /*#__PURE__*/React.createContext(null);
var emptyArray = [];

/**
 * The `Sidenav` component is an encapsulation of the page sidebar `Nav`.
 * @see https://rsuitejs.com/components/sidenav/
 */
var Sidenav = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Sidenav', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'nav' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'sidenav' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$ex = propsWithDefaults.expanded,
    expanded = _propsWithDefaults$ex === void 0 ? true : _propsWithDefaults$ex,
    activeKey = propsWithDefaults.activeKey,
    _propsWithDefaults$de = propsWithDefaults.defaultOpenKeys,
    defaultOpenKeys = _propsWithDefaults$de === void 0 ? emptyArray : _propsWithDefaults$de,
    openKeysProp = propsWithDefaults.openKeys,
    onSelect = propsWithDefaults.onSelect,
    onOpenChange = propsWithDefaults.onOpenChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useControlled = useControlled(openKeysProp, defaultOpenKeys),
    openKeys = _useControlled[0],
    setOpenKeys = _useControlled[1];
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance));
  var handleOpenChange = useCallback(function (eventKey, event) {
    var find = function find(key) {
      return shallowEqual(key, eventKey);
    };
    var nextOpenKeys = [].concat(openKeys);
    if (nextOpenKeys.some(find)) {
      remove(nextOpenKeys, find);
    } else {
      nextOpenKeys.push(eventKey);
    }
    setOpenKeys(nextOpenKeys);
    onOpenChange === null || onOpenChange === void 0 || onOpenChange(nextOpenKeys, event);
  }, [onOpenChange, openKeys, setOpenKeys]);
  var contextValue = useMemo(function () {
    return {
      expanded: expanded,
      activeKey: activeKey,
      sidenav: true,
      openKeys: openKeys !== null && openKeys !== void 0 ? openKeys : [],
      onOpenChange: handleOpenChange,
      onSelect: onSelect
    };
  }, [activeKey, expanded, handleOpenChange, onSelect, openKeys]);
  return /*#__PURE__*/React.createElement(SidenavContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Transition, {
    in: expanded,
    timeout: 300,
    exitedClassName: prefix('collapse-out'),
    exitingClassName: prefix('collapse-out', 'collapsing'),
    enteredClassName: prefix('collapse-in'),
    enteringClassName: prefix('collapse-in', 'collapsing')
  }, function (transitionProps, transitionRef) {
    var className = transitionProps.className,
      transitionRest = _objectWithoutPropertiesLoose(transitionProps, _excluded2);
    return /*#__PURE__*/React.createElement(Component, _extends({}, rest, transitionRest, {
      ref: mergeRefs(ref, transitionRef),
      className: merge(classes, className)
    }));
  }));
});
Sidenav.Header = SidenavHeader;
Sidenav.Body = SidenavBody;
Sidenav.Toggle = SidenavToggle;
Sidenav.displayName = 'Sidenav';
Sidenav.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  expanded: PropTypes.bool,
  appearance: oneOf(['default', 'inverse', 'subtle']),
  defaultOpenKeys: PropTypes.array,
  openKeys: PropTypes.array,
  onOpenChange: PropTypes.func,
  activeKey: deprecatePropType(PropTypes.any, 'Use `activeKey` on <Nav> component instead'),
  onSelect: deprecatePropType(PropTypes.func, 'Use `onSelect` on <Nav> component instead')
};
export default Sidenav;