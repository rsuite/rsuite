'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "title", "onClose", "onOpen", "onToggle", "trigger", "placement", "toggleAs", "toggleClassName", "classPrefix", "className", "disabled", "children", "menuStyle", "style"],
  _excluded2 = ["open"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import castArray from 'lodash/castArray';
import omit from 'lodash/omit';
import { useClassNames } from "../internals/hooks/index.js";
import { PLACEMENT_8 } from "../internals/constants/index.js";
import { mergeRefs, placementPolyfill } from "../internals/utils/index.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import kebabCase from 'lodash/kebabCase';
import { NavbarContext } from '.';
import Disclosure from "../internals/Disclosure/Disclosure.js";
import NavDropdownItem from "../Nav/NavDropdownItem.js";
import NavDropdownMenu from "../Nav/NavDropdownMenu.js";
import NavbarDropdownToggle from "./NavbarDropdownToggle.js";
/**
 * @private
 */
var NavbarDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var navbar = useContext(NavbarContext);
  if (!navbar) {
    throw new Error('<Navbar.Dropdown> should be used within a <Navbar> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    onClose = props.onClose,
    onOpen = props.onOpen,
    _onToggle = props.onToggle,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    toggleAs = props.toggleAs,
    toggleClassName = props.toggleClassName,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown' : _props$classPrefix,
    className = props.className,
    disabled = props.disabled,
    children = props.children,
    menuStyle = props.menuStyle,
    style = props.style,
    toggleProps = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = useClassNames('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  return /*#__PURE__*/React.createElement(Disclosure, {
    trigger: castArray(trigger),
    hideOnClickOutside: true,
    onToggle: function onToggle(open) {
      _onToggle === null || _onToggle === void 0 || _onToggle(open);
      if (open) {
        onOpen === null || onOpen === void 0 || onOpen();
      } else {
        onClose === null || onClose === void 0 || onClose();
      }
    }
  }, function (_ref, containerRef) {
    var _withClassPrefix;
    var open = _ref.open,
      props = _objectWithoutPropertiesLoose(_ref, _excluded2);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + kebabCase(placementPolyfill(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix)));
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: mergeRefs(ref, containerRef),
      className: classes,
      style: style
    }, props), /*#__PURE__*/React.createElement(Disclosure.Button, null, function (buttonProps, buttonRef) {
      return /*#__PURE__*/React.createElement(NavbarDropdownToggle, _extends({
        ref: buttonRef,
        as: toggleAs,
        className: toggleClassName,
        placement: placement,
        disabled: disabled
      }, omit(buttonProps, ['open']), toggleProps), title);
    }), /*#__PURE__*/React.createElement(Disclosure.Content, null, function (_ref2, elementRef) {
      var open = _ref2.open;
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/React.createElement("ul", {
        ref: elementRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, children);
    }));
  });
});
NavbarDropdown.Item = NavDropdownItem;
NavbarDropdown.Menu = NavDropdownMenu;
NavbarDropdown.displayName = 'Navbar.Dropdown';
NavbarDropdown.propTypes = {
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.array, oneOf(['click', 'hover', 'contextMenu'])]),
  placement: oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
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
  renderToggle: PropTypes.func
};
export default NavbarDropdown;