'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "title", "onClose", "onOpen", "onToggle", "eventKey", "trigger", "placement", "toggleAs", "toggleClassName", "classPrefix", "className", "disabled", "children", "menuStyle", "style"],
  _excluded2 = ["active"],
  _excluded3 = ["open"],
  _excluded4 = ["open"];
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { PLACEMENT_8 } from "../internals/constants/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs, placementPolyfill } from "../internals/utils/index.js";
import { SidenavContext } from "./Sidenav.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import Menu from "../internals/Menu/Menu.js";
import MenuItem from "../internals/Menu/MenuItem.js";
import kebabCase from 'lodash/kebabCase';
import ExpandedSidenavDropdown from "./ExpandedSidenavDropdown.js";
import NavContext from "../Nav/NavContext.js";
import NavDropdownItem from "../Nav/NavDropdownItem.js";
import NavDropdownMenu from "../Nav/NavDropdownMenu.js";
import SidenavDropdownToggle from "./SidenavDropdownToggle.js";
import { NavMenuContext } from "../Nav/NavMenu.js";
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu> -> This submenu will render <SidenavDropdown> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
var SidenavDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var sidenav = useContext(SidenavContext);
  var nav = useContext(NavContext);
  var navMenu = useContext(NavMenuContext);
  if (!sidenav || !nav || !navMenu) {
    throw new Error('<Sidenav.Dropdown> must be rendered within a <Nav> component within a <Sidenav> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    onClose = props.onClose,
    onOpen = props.onOpen,
    onToggle = props.onToggle,
    eventKey = props.eventKey,
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
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var _useClassNames2 = useClassNames('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = useClassNames('nav-item'),
    withNavItemClassPrefix = _useClassNames3.withClassPrefix,
    mergeNavItemClassNames = _useClassNames3.merge;
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
  var menuButtonTriggers = useMemo(function () {
    if (!trigger) {
      return undefined;
    }
    var triggerMap = {
      hover: 'mouseover',
      click: 'click',
      contextMenu: 'contextmenu'
    };
    if (!Array.isArray(trigger)) {
      return [triggerMap[trigger]];
    }
    return trigger.map(function (t) {
      return triggerMap[t];
    });
  }, [trigger]);

  // Render a disclosure when inside expanded <Sidenav>
  if (sidenav.expanded) {
    return /*#__PURE__*/React.createElement(ExpandedSidenavDropdown, _extends({
      ref: ref
    }, props));
  }
  var renderMenuButton = function renderMenuButton(menuButtonProps, buttonRef) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      disabled: disabled
    }, function (_ref, menuitemRef) {
      var active = _ref.active,
        menuitemProps = _objectWithoutPropertiesLoose(_ref, _excluded2);
      return /*#__PURE__*/React.createElement(SidenavDropdownToggle, _extends({
        ref: mergeRefs(buttonRef, menuitemRef),
        as: toggleAs,
        className: mergeNavItemClassNames(toggleClassName, withNavItemClassPrefix({
          focus: active
        }))
      }, menuButtonProps, omit(menuitemProps, ['onClick']), omit(toggleProps, 'data-testid')), title);
    });
  };
  return /*#__PURE__*/React.createElement(Menu, {
    menuButtonText: title,
    renderMenuButton: renderMenuButton,
    openMenuOn: menuButtonTriggers,
    renderMenuPopup: function renderMenuPopup(_ref2, popupRef) {
      var open = _ref2.open,
        popupProps = _objectWithoutPropertiesLoose(_ref2, _excluded3);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
      // When inside a collapsed <Sidenav>, render a header in menu
      var showHeader = !!sidenav;
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: popupRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, popupProps), showHeader && /*#__PURE__*/React.createElement("div", {
        className: prefix('header')
      }, title), children);
    },
    onToggleMenu: function onToggleMenu(open, event) {
      onToggle === null || onToggle === void 0 || onToggle(open, eventKey, event);
      sidenav === null || sidenav === void 0 || sidenav.onOpenChange(eventKey, event);
      if (open) {
        onOpen === null || onOpen === void 0 || onOpen();
      } else {
        onClose === null || onClose === void 0 || onClose();
      }
    }
  }, function (_ref3, menuContainerRef) {
    var _withClassPrefix;
    var open = _ref3.open,
      menuContainer = _objectWithoutPropertiesLoose(_ref3, _excluded4);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + kebabCase(placementPolyfill(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix.submenu = true, _withClassPrefix['selected-within'] = hasSelectedItems, _withClassPrefix)));
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: mergeRefs(ref, menuContainerRef),
      className: classes
    }, menuContainer, pick(toggleProps, ['data-testid']), {
      style: style
    }));
  });
});
SidenavDropdown.Item = NavDropdownItem;
SidenavDropdown.Menu = NavDropdownMenu;
SidenavDropdown.displayName = 'Sidenav.Dropdown';
SidenavDropdown.propTypes = {
  activeKey: PropTypes.any,
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
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderToggle: PropTypes.func
};
export default SidenavDropdown;