'use client';
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _templateObject, _templateObject2;
var _excluded = ["onToggle", "eventKey", "title", "activeKey", "onSelect", "classPrefix", "className", "children"],
  _excluded2 = ["icon", "disabled"],
  _excluded3 = ["open"],
  _excluded4 = ["selected", "active"],
  _excluded5 = ["open"],
  _excluded6 = ["open"];
import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import Menu from "../internals/Menu/Menu.js";
import MenuItem from "../internals/Menu/MenuItem.js";
import Menubar from "../internals/Menu/Menubar.js";
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import DropdownContext from "./DropdownContext.js";
import Nav from "../Nav/index.js";
import NavContext from "../Nav/NavContext.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { mergeRefs, warnOnce } from "../internals/utils/index.js";
/**
 * The `<Dropdown.Menu>` API
 *
 * @description
 * Note the difference between this component and `<Menu>` component:
 * `<Menu>` is used for ARIA menu control logic and is used internally only.
 * This component is only used for supporting submenu syntax and is
 * assigned to Dropdown.Menu
 *
 * @example
 *
 * <Dropdown>
 *   <Dropdown.Item>Item 1</Dropdown.Item>
 *   <Dropdown.Menu title="Submenu">
 *     <Dropdown.Item>Sub item</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 */
var DropdownMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    activeKey = props.activeKey,
    onSelect = props.onSelect,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    className = props.className,
    children = props.children,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var nav = useContext(NavContext);
  var dropdown = useContext(DropdownContext);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var handleToggleSubmenu = useCallback(function (_, event) {
    onToggle === null || onToggle === void 0 || onToggle(eventKey, event);
  }, [eventKey, onToggle]);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = useClassNames('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = useClassNames('dropdown-item'),
    mergeItemClassNames = _useClassNames3.merge,
    withItemClassPrefix = _useClassNames3.withClassPrefix,
    prefixItemClassName = _useClassNames3.prefix;
  var contextValue = useMemo(function () {
    return {
      activeKey: activeKey,
      onSelect: onSelect
    };
  }, [activeKey, onSelect]);

  // If rendered within a <Nav>
  // Suggest <Nav.Menu>
  if (nav) {
    warnOnce('Usage of <Dropdown.Menu> within <Nav> is deprecated. Replace with <Nav.Menu>');
    return /*#__PURE__*/React.createElement(Nav.Menu, _extends({
      ref: ref
    }, props));
  }

  // <Dropdown.Menu> is used outside of <Dropdown>
  // renders a vertical `menubar`
  if (!dropdown) {
    var classes = merge(className, withClassPrefix());
    return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement(Menubar, {
      vertical: true
    }, function (menubar, menubarRef) {
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: mergeRefs(menubarRef, ref),
        className: classes
      }, menubar, rest), children);
    }));
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  var _omit = omit(rest, ['trigger']),
    icon = _omit.icon,
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
        }), title, /*#__PURE__*/React.createElement(Icon, {
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
        hidden: !open
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
DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  trigger: oneOf(['click', 'hover']),
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};
export default DropdownMenu;