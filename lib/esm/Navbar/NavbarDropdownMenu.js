'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["onToggle", "eventKey", "title", "classPrefix", "children", "openDirection"],
  _excluded2 = ["icon", "className", "disabled"],
  _excluded3 = ["open"],
  _excluded4 = ["open"];
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import Disclosure from "../internals/Disclosure/index.js";
import NavContext from "../Nav/NavContext.js";
import { mergeRefs } from "../internals/utils/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { NavbarContext } from '.';
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Navbar>
 *
 * <Navbar>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu title="menu"> -> This submenu will render <NavbarDropdownMenu> component
 *       </Nav.Menu>
 *     </Nav.Menu>
 *   </Nav>
 * </Navbar>
 */
var NavbarDropdownMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var navbar = useContext(NavbarContext);
  var nav = useContext(NavContext);
  if (!navbar || !nav) {
    throw new Error('<Navbar.Dropdown.Menu> must be rendered within a <Nav> within a <Navbar> component.');
  }
  var _onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    children = props.children,
    _props$openDirection = props.openDirection,
    openDirection = _props$openDirection === void 0 ? 'end' : _props$openDirection,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix;
  var _useClassNames2 = useClassNames('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = useClassNames('dropdown-item'),
    mergeItemClassNames = _useClassNames3.merge,
    withItemClassPrefix = _useClassNames3.withClassPrefix,
    prefixItemClassName = _useClassNames3.prefix;

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  var _omit = omit(rest, ['trigger']),
    icon = _omit.icon,
    className = _omit.className,
    disabled = _omit.disabled,
    menuProps = _objectWithoutPropertiesLoose(_omit, _excluded2);
  var Icon = rtl ? PagePreviousIcon : PageNextIcon;
  return /*#__PURE__*/React.createElement(Disclosure, {
    hideOnClickOutside: true,
    trigger: ['click', 'hover'],
    onToggle: function onToggle(open, event) {
      return _onToggle === null || _onToggle === void 0 ? void 0 : _onToggle(open, undefined, event);
    }
  }, function (_ref, containerRef) {
    var open = _ref.open,
      props = _objectWithoutPropertiesLoose(_ref, _excluded3);
    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/React.createElement("li", _extends({
      ref: mergeRefs(ref, containerRef),
      className: classes
    }, props), /*#__PURE__*/React.createElement(Disclosure.Button, null, function (_ref2, buttonRef) {
      var open = _ref2.open,
        buttonProps = _objectWithoutPropertiesLoose(_ref2, _excluded4);
      var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["toggle"]))), withItemClassPrefix({
        'with-icon': icon,
        open: open,
        disabled: disabled
      }));
      var dataAttributes = {
        'data-event-key': eventKey
      };
      if (!isNil(eventKey) && typeof eventKey !== 'string') {
        dataAttributes['data-event-key-type'] = typeof eventKey;
      }
      return /*#__PURE__*/React.createElement("div", _extends({
        ref: mergeRefs(buttonRef, buttonRef),
        className: classes
      }, dataAttributes, buttonProps), icon && /*#__PURE__*/React.cloneElement(icon, {
        className: prefix('menu-icon')
      }), title, /*#__PURE__*/React.createElement(Icon, {
        className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["toggle-icon"])))
      }));
    }), /*#__PURE__*/React.createElement(Disclosure.Content, null, function (_ref3, elementRef) {
      var open = _ref3.open;
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: elementRef,
        className: menuClassName,
        hidden: !open,
        "data-direction": openDirection
      }, menuProps), children);
    }));
  });
});
NavbarDropdownMenu.displayName = 'Nav.Dropdown.Menu';
NavbarDropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: deprecatePropType(PropTypes.bool, 'Use openDirection="start" instead.'),
  openDirection: oneOf(['start', 'end']),
  title: PropTypes.node,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onToggle: PropTypes.func
};
export default NavbarDropdownMenu;