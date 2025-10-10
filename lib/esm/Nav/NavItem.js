'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "active", "disabled", "eventKey", "className", "classPrefix", "style", "children", "icon", "divider", "panel", "onClick", "onSelect"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Ripple from "../internals/Ripple/index.js";
import SafeAnchor from "../SafeAnchor/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { shallowEqual } from "../internals/utils/index.js";
import NavContext from "./NavContext.js";
import classNames from 'classnames';
/**
 * The `Nav.Item` component is used to create navigation links.
 *
 * - When used as direct child of `<Nav>`, render the NavItem
 * - When used within a `<Nav.Menu>`, render the NavDropdownItem
 * @see https://rsuitejs.com/components/nav
 *
 */
var NavItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var nav = useContext(NavContext);
  if (!nav) {
    throw new Error('<Nav.Item> must be rendered within a <Nav> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? SafeAnchor : _props$as,
    activeProp = props.active,
    disabled = props.disabled,
    eventKey = props.eventKey,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'nav-item' : _props$classPrefix,
    style = props.style,
    children = props.children,
    icon = props.icon,
    divider = props.divider,
    panel = props.panel,
    onClick = props.onClick,
    onSelectProp = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var activeKey = nav.activeKey,
    onSelectFromNav = nav.onSelect;
  var active = activeProp !== null && activeProp !== void 0 ? activeProp : !isNil(eventKey) && shallowEqual(eventKey, activeKey);
  var emitSelect = useCallback(function (event) {
    onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
  }, [eventKey, onSelectProp, onSelectFromNav]);
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    active: active,
    disabled: disabled
  }));
  var handleClick = useCallback(function (event) {
    if (!disabled) {
      emitSelect(event);
      onClick === null || onClick === void 0 || onClick(event);
    }
  }, [disabled, emitSelect, onClick]);
  if (divider) {
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: ref,
      role: "separator",
      style: style,
      className: merge(className, prefix('divider'))
    }, rest));
  }
  if (panel) {
    return /*#__PURE__*/React.createElement("div", _extends({
      ref: ref,
      style: style,
      className: merge(className, prefix('panel'))
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    tabIndex: disabled ? -1 : undefined
  }, rest, {
    className: classes,
    onClick: handleClick,
    style: style,
    "aria-selected": active || undefined
  }), icon && /*#__PURE__*/React.cloneElement(icon, {
    className: classNames(prefix('icon'), icon.props.className)
  }), children, /*#__PURE__*/React.createElement(Ripple, null));
});
NavItem.displayName = 'Nav.Item';
NavItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any
};
export default NavItem;