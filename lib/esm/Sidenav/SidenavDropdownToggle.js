'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "className", "classPrefix", "renderToggle", "children", "noCaret"];
import React from 'react';
import PropTypes from 'prop-types';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import { useClassNames } from "../internals/hooks/index.js";
import SidenavItem from "./SidenavItem.js";
import { oneOf } from "../internals/propTypes/index.js";
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> call
 *
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component that renders a <NavDropdownToggle>
 *   </Nav.Menu>
 * </Nav>
 */
var SidenavDropdownToggle = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? SidenavItem : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-toggle' : _props$classPrefix,
    renderToggle = props.renderToggle,
    children = props.children,
    noCaret = props.noCaret,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    'no-caret': noCaret
  }));
  var toggle = /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: ref,
    className: classes,
    tooltip: children
  }), children, !noCaret && /*#__PURE__*/React.createElement(ArrowDownLineIcon, {
    className: prefix('caret')
  }));
  return renderToggle ? renderToggle(rest, ref) : toggle;
});
SidenavDropdownToggle.displayName = 'Sidenav.Dropdown.Toggle';
SidenavDropdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  noCaret: PropTypes.bool,
  as: PropTypes.elementType,
  renderToggle: PropTypes.func,
  placement: oneOf(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd'])
};
export default SidenavDropdownToggle;