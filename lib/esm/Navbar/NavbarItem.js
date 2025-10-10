'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "active", "disabled", "eventKey", "className", "classPrefix", "style", "children", "icon", "onClick", "onSelect"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Ripple from "../internals/Ripple/index.js";
import SafeAnchor from "../SafeAnchor/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { shallowEqual } from "../internals/utils/index.js";
import NavContext from "../Nav/NavContext.js";
import classNames from 'classnames';
/**
 * @private
 */
var NavbarItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? SafeAnchor : _props$as,
    activeProp = props.active,
    disabled = props.disabled,
    eventKey = props.eventKey,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'navbar-item' : _props$classPrefix,
    style = props.style,
    children = props.children,
    icon = props.icon,
    onClick = props.onClick,
    onSelectProp = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _ref = useContext(NavContext),
    activeKey = _ref.activeKey,
    onSelectFromNav = _ref.onSelect;
  var active = activeProp !== null && activeProp !== void 0 ? activeProp : !isNil(eventKey) && shallowEqual(eventKey, activeKey);
  var emitSelect = useCallback(function (event) {
    onSelectProp === null || onSelectProp === void 0 || onSelectProp(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
  }, [eventKey, onSelectProp, onSelectFromNav]);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
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
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    "aria-selected": active || undefined
  }, rest, {
    className: classes,
    onClick: handleClick,
    style: style
  }), icon && /*#__PURE__*/React.cloneElement(icon, {
    className: classNames(prefix('icon'), icon.props.className)
  }), children, /*#__PURE__*/React.createElement(Ripple, null));
});
NavbarItem.displayName = 'Navbar.Item';
NavbarItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  icon: PropTypes.node,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  eventKey: PropTypes.any
};
export default NavbarItem;