'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["onToggle", "eventKey", "title", "classPrefix", "children", "openDirection", "noCaret"],
  _excluded2 = ["icon", "className", "disabled"],
  _excluded3 = ["open"],
  _excluded4 = ["selected", "active"],
  _excluded5 = ["open"],
  _excluded6 = ["open"];
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Menu from "../internals/Menu/Menu.js";
import MenuItem from "../internals/Menu/MenuItem.js";
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import NavContext from "./NavContext.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs } from "../internals/utils/index.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * @private
 */
var NavDropdownMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var nav = useContext(NavContext);
  if (!nav) {
    throw new Error('<Nav.Dropdown.Menu> should be used within a <Nav> component.');
  }
  var onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    children = props.children,
    _props$openDirection = props.openDirection,
    openDirection = _props$openDirection === void 0 ? 'end' : _props$openDirection,
    noCaret = props.noCaret,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var handleToggleSubmenu = useCallback(function (open, event) {
    onToggle === null || onToggle === void 0 || onToggle(open, eventKey, event);
  }, [eventKey, onToggle]);
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
  return /*#__PURE__*/React.createElement(Menu, {
    openMenuOn: ['mouseover', 'click'],
    renderMenuButton: function renderMenuButton(_ref, buttonRef) {
      var open = _ref.open,
        menuButtonProps = _objectWithoutPropertiesLoose(_ref, _excluded3);
      return /*#__PURE__*/React.createElement(MenuItem, {
        disabled: disabled
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
          active = _ref2.active,
          menuitem = _objectWithoutPropertiesLoose(_ref2, _excluded4);
        var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["toggle"]))), withItemClassPrefix({
          'with-icon': icon,
          open: open,
          active: selected,
          disabled: disabled,
          focus: active
        }));
        return /*#__PURE__*/React.createElement("div", _extends({
          ref: mergeRefs(buttonRef, menuitemRef),
          className: classes,
          "data-event-key": eventKey,
          "data-event-key-type": typeof eventKey
        }, menuitem, omit(menuButtonProps, ['role'])), icon && /*#__PURE__*/React.cloneElement(icon, {
          className: prefix('menu-icon')
        }), title, !noCaret && /*#__PURE__*/React.createElement(Icon, {
          className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["toggle-icon"])))
        }));
      });
    },
    renderMenuPopup: function renderMenuPopup(_ref3, popupRef) {
      var open = _ref3.open,
        popupProps = _objectWithoutPropertiesLoose(_ref3, _excluded5);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: popupRef,
        className: menuClassName,
        hidden: !open,
        "data-direction": openDirection
      }, popupProps, menuProps), children);
    },
    onToggleMenu: handleToggleSubmenu
  }, function (_ref4, menuContainerRef) {
    var open = _ref4.open,
      menuContainer = _objectWithoutPropertiesLoose(_ref4, _excluded6);
    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/React.createElement("li", _extends({
      ref: mergeRefs(ref, menuContainerRef),
      className: classes
    }, menuContainer));
  });
});
NavDropdownMenu.displayName = 'Nav.Dropdown.Menu';
NavDropdownMenu.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: deprecatePropType(PropTypes.bool, 'Use openDirection="start" instead.'),
  openDirection: oneOf(['start', 'end']),
  noCaret: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onToggle: PropTypes.func
};
export default NavDropdownMenu;