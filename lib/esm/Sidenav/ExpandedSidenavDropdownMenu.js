'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject;
var _excluded = ["as", "children", "disabled", "className", "style", "classPrefix", "tabIndex", "icon", "title", "eventKey", "onClick", "onSelect"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import SidenavDropdownCollapse from "./SidenavDropdownCollapse.js";
import Ripple from "../internals/Ripple/index.js";
import Disclosure from "../internals/Disclosure/Disclosure.js";
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLine from '@rsuite/icons/ArrowRightLine';
import { useClassNames } from "../internals/hooks/index.js";
import { createChainedFunction } from "../internals/utils/index.js";
import { SidenavContext } from "./Sidenav.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
var ExpandedSidenavDropdownMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var sidenavContext = useContext(SidenavContext);
  if (!sidenavContext) {
    throw new Error('<SidenavDropdownMenu> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    children = props.children,
    disabled = props.disabled,
    className = props.className,
    style = props.style,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item' : _props$classPrefix,
    tabIndex = props.tabIndex,
    icon = props.icon,
    title = props.title,
    eventKey = props.eventKey,
    onClick = props.onClick,
    onSelect = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _sidenavContext$openK = sidenavContext.openKeys,
    openKeys = _sidenavContext$openK === void 0 ? [] : _sidenavContext$openK,
    onOpenChange = sidenavContext.onOpenChange,
    onSidenavSelect = sidenavContext.onSelect;
  var handleClick = useCallback(function (event) {
    if (disabled) return;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    onSidenavSelect === null || onSidenavSelect === void 0 || onSidenavSelect(eventKey, event);
  }, [disabled, onSelect, onSidenavSelect, eventKey]);
  var menuitemEventHandlers = {
    onClick: createChainedFunction(handleClick, onClick)
  };
  var Icon = rtl ? ArrowLeftLine : ArrowRightLine;
  return /*#__PURE__*/React.createElement(Disclosure, {
    open: !isNil(eventKey) && openKeys.includes(eventKey),
    onToggle: function onToggle(_, event) {
      return onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(eventKey, event);
    }
  }, function (_ref) {
    var open = _ref.open;
    var classes = merge(className, prefix('submenu'), prefix("pull-" + (rtl ? 'left' : 'right')), prefix(open ? 'expand' : 'collapse'), withClassPrefix({
      'with-icon': icon,
      // open,
      disabled: disabled
    }));
    var iconClasses = merge(className, prefix('toggle-icon'), prefix((open ? 'expand' : 'collapse') + "-icon"));
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: ref
    }, rest, {
      tabIndex: disabled ? -1 : tabIndex,
      style: style,
      className: classes
    }, menuitemEventHandlers), /*#__PURE__*/React.createElement(Disclosure.Button, null, function (buttonProps) {
      return /*#__PURE__*/React.createElement("button", _extends({
        className: prefix(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["toggle"]))),
        onClick: handleClick
      }, omit(buttonProps, ['open'])), icon && /*#__PURE__*/React.cloneElement(icon, {
        className: prefix('menu-icon')
      }), title, /*#__PURE__*/React.createElement(Icon, {
        className: iconClasses
      }), /*#__PURE__*/React.createElement(Ripple, null));
    }), /*#__PURE__*/React.createElement(Disclosure.Content, null, function (_ref2) {
      var open = _ref2.open;
      return /*#__PURE__*/React.createElement(SidenavDropdownCollapse, {
        open: open
      }, children);
    }));
  });
});
ExpandedSidenavDropdownMenu.displayName = 'Sidenav.Dropdown.Menu';
ExpandedSidenavDropdownMenu.propTypes = {
  as: PropTypes.elementType,
  expanded: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.node,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};
export default ExpandedSidenavDropdownMenu;