'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "className", "active", "eventKey", "onSelect", "icon", "as", "divider", "panel", "children", "disabled"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import isNil from 'lodash/isNil';
import { createChainedFunction, shallowEqual } from "../internals/utils/index.js";
import { NavbarContext } from "./Navbar.js";
import DisclosureContext, { DisclosureActionTypes } from "../internals/Disclosure/DisclosureContext.js";
import { useRenderDropdownItem } from "../Dropdown/useRenderDropdownItem.js";
import NavContext from "../Nav/NavContext.js";
import classNames from 'classnames';
/**
 * @private
 */
var NavbarDropdownItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var navbar = useContext(NavbarContext);
  var nav = useContext(NavContext);
  if (!navbar || !nav) {
    throw new Error('<Navbar.Dropdown.Item> must be rendered within a <Nav> component within a <Navbar> component.');
  }
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item' : _props$classPrefix,
    className = props.className,
    activeProp = props.active,
    eventKey = props.eventKey,
    onSelect = props.onSelect,
    icon = props.icon,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    divider = props.divider,
    panel = props.panel,
    children = props.children,
    disabled = props.disabled,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleSelectItem = useCallback(function (event) {
    var _nav$onSelect;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    (_nav$onSelect = nav.onSelect) === null || _nav$onSelect === void 0 || _nav$onSelect.call(nav, eventKey, event);
  }, [onSelect, eventKey, nav]);
  var disclosure = useContext(DisclosureContext);
  var _ref = disclosure !== null && disclosure !== void 0 ? disclosure : [],
    dispatchDisclosure = _ref[1];
  var handleClickNavbarDropdownItem = useCallback(function (event) {
    dispatchDisclosure === null || dispatchDisclosure === void 0 || dispatchDisclosure({
      type: DisclosureActionTypes.Hide,
      cascade: true
    });
    handleSelectItem === null || handleSelectItem === void 0 || handleSelectItem(event);
  }, [dispatchDisclosure, handleSelectItem]);
  var selected = activeProp || !isNil(eventKey) && shallowEqual(nav.activeKey, eventKey);
  var renderDropdownItem = useRenderDropdownItem(Component);
  if (divider) {
    return renderDropdownItem(_extends({
      ref: ref,
      role: 'separator',
      className: merge(prefix('divider'), className)
    }, restProps));
  }
  if (panel) {
    return renderDropdownItem(_extends({
      ref: ref,
      className: merge(prefix('panel'), className),
      children: children
    }, restProps));
  }
  var classes = merge(className, withClassPrefix({
    'with-icon': icon,
    disabled: disabled,
    divider: divider,
    panel: panel,
    active: selected
  }));
  var dataAttributes = {
    'data-event-key': eventKey
  };
  if (!isNil(eventKey) && typeof eventKey !== 'string') {
    dataAttributes['data-event-key-type'] = typeof eventKey;
  }
  return renderDropdownItem(_extends({
    ref: ref,
    className: classes,
    'aria-current': selected || undefined
  }, dataAttributes, restProps, {
    onClick: createChainedFunction(handleClickNavbarDropdownItem, restProps.onClick),
    children: /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.cloneElement(icon, {
      className: classNames(prefix('menu-icon'), icon.props.className)
    }), children)
  }));
});
NavbarDropdownItem.displayName = 'Navbar.Dropdown.Item';
NavbarDropdownItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, oneOf(['click', 'hover'])]),
  open: deprecatePropType(PropTypes.bool),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: deprecatePropType(PropTypes.bool),
  submenu: PropTypes.element,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number
};
export default NavbarDropdownItem;