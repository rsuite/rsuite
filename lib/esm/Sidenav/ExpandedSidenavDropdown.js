'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "title", "children", "className", "menuStyle", "disabled", "renderTitle", "renderToggle", "classPrefix", "placement", "toggleClassName", "icon", "eventKey", "toggleAs", "noCaret", "style", "onOpen", "onClose", "open", "onToggle"];
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import omit from 'lodash/omit';
import { PLACEMENT_8 } from "../internals/constants/index.js";
import { useClassNames, useInternalId } from "../internals/hooks/index.js";
import { placementPolyfill, mergeRefs } from "../internals/utils/index.js";
import { SidenavContext } from "./Sidenav.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import SidenavDropdownCollapse from "./SidenavDropdownCollapse.js";
import Disclosure from "../internals/Disclosure/Disclosure.js";
import SidenavDropdownToggle from "./SidenavDropdownToggle.js";
import { NavMenuContext } from "../Nav/NavMenu.js";
import NavContext from "../Nav/NavContext.js";
var ExpandedSidenavDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var sidenav = useContext(SidenavContext);
  var nav = useContext(NavContext);
  var navMenu = useContext(NavMenuContext);
  if (!sidenav || !nav || !navMenu) {
    throw new Error('<SidenavDropdown> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    children = props.children,
    className = props.className,
    menuStyle = props.menuStyle,
    disabled = props.disabled,
    renderTitle = props.renderTitle,
    renderToggle = props.renderToggle,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown' : _props$classPrefix,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    toggleClassName = props.toggleClassName,
    icon = props.icon,
    eventKey = props.eventKey,
    toggleAs = props.toggleAs,
    noCaret = props.noCaret,
    style = props.style,
    onOpen = props.onOpen,
    onClose = props.onClose,
    openProp = props.open,
    onToggle = props.onToggle,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var internalId = useInternalId('SidenavDropdown');
  var uniqueKey = eventKey !== null && eventKey !== void 0 ? eventKey : internalId;
  var _sidenav$openKeys = sidenav.openKeys,
    openKeys = _sidenav$openKeys === void 0 ? [] : _sidenav$openKeys,
    onOpenChange = sidenav.onOpenChange;
  var items = navMenu[0].items;
  var hasSelectedItems =
  // has items that is active indicated by <Nav activeKey>
  nav.activeKey && items.some(function (item) {
    return item.eventKey === nav.activeKey;
  }) ||
  // has items that is active indicated by <Nav.Item active>
  items.some(function (item) {
    return item.active;
  });
  var handleToggleDisclosure = useCallback(function (open, event) {
    if (open) {
      onClose === null || onClose === void 0 || onClose();
    } else {
      onOpen === null || onOpen === void 0 || onOpen();
    }
    onToggle === null || onToggle === void 0 || onToggle(open);
    onOpenChange === null || onOpenChange === void 0 || onOpenChange(uniqueKey, event);
  }, [onClose, onOpen, onToggle, uniqueKey, onOpenChange]);
  var open = openProp !== null && openProp !== void 0 ? openProp : openKeys.includes(uniqueKey);
  return /*#__PURE__*/React.createElement(Disclosure, {
    open: open,
    onToggle: handleToggleDisclosure
  }, function (_ref, containerRef) {
    var _withClassPrefix;
    var open = _ref.open;
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + kebabCase(placementPolyfill(placement))] = placement, _withClassPrefix[open ? 'expand' : 'collapse'] = true, _withClassPrefix.disabled = disabled, _withClassPrefix['selected-within'] = hasSelectedItems, _withClassPrefix['no-caret'] = noCaret, _withClassPrefix)));
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: mergeRefs(ref, containerRef),
      style: style,
      className: classes
    }, rest, {
      "data-event-key": eventKey
    }), /*#__PURE__*/React.createElement(Disclosure.Button, null, function (buttonProps, buttonRef) {
      return /*#__PURE__*/React.createElement(SidenavDropdownToggle, _extends({
        ref: buttonRef,
        as: toggleAs,
        noCaret: noCaret,
        className: toggleClassName,
        renderToggle: renderToggle,
        icon: icon,
        placement: placement
      }, omit(buttonProps, ['open'])), title);
    }), /*#__PURE__*/React.createElement(Disclosure.Content, null, function (_ref2) {
      var open = _ref2.open;
      return /*#__PURE__*/React.createElement(SidenavDropdownCollapse, {
        open: open,
        style: menuStyle
      }, children);
    }));
  });
});
ExpandedSidenavDropdown.displayName = 'Sidenav.Dropdown';
ExpandedSidenavDropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  placement: oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  open: deprecatePropType(PropTypes.bool),
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  toggleAs: PropTypes.elementType,
  noCaret: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: deprecatePropType(PropTypes.func),
  renderToggle: PropTypes.func
};
export default ExpandedSidenavDropdown;