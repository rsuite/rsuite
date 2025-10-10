'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "title", "onClose", "onOpen", "onToggle", "eventKey", "trigger", "placement", "toggleAs", "toggleClassName", "classPrefix", "className", "disabled", "children", "menuStyle", "style"],
  _excluded2 = ["open"],
  _excluded3 = ["open"];
import React, { useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { PLACEMENT_8 } from "../internals/constants/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs, placementPolyfill } from "../internals/utils/index.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { initialState, reducer } from "../Dropdown/DropdownState.js";
import Menu from "../internals/Menu/Menu.js";
import kebabCase from 'lodash/kebabCase';
import NavContext from "./NavContext.js";
import NavDropdownItem from "./NavDropdownItem.js";
import NavDropdownMenu from "./NavDropdownMenu.js";
import NavDropdownToggle from "./NavDropdownToggle.js";
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a `<Nav.Menu>` call
 *
 * @example
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component
 *   </Nav.Menu>
 * </Nav>
 */
var NavDropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var nav = useContext(NavContext);
  if (!nav) {
    throw new Error('<Nav.Dropdown> must be rendered within a <Nav> component.');
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
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = useClassNames('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
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
  var _useReducer = useReducer(reducer, initialState),
    items = _useReducer[0].items;
  var hasSelectedItem = useMemo(function () {
    return items.some(function (item) {
      return item.props.selected;
    });
  }, [items]);
  var renderMenuButton = function renderMenuButton(menuButtonProps, menuButtonRef) {
    return /*#__PURE__*/React.createElement(NavDropdownToggle, _extends({
      ref: menuButtonRef,
      as: toggleAs,
      className: toggleClassName,
      placement: placement,
      disabled: disabled
    }, omit(menuButtonProps, ['open']), omit(toggleProps, ['data-testid'])), title);
  };
  return /*#__PURE__*/React.createElement(Menu, {
    renderMenuButton: renderMenuButton,
    openMenuOn: menuButtonTriggers,
    renderMenuPopup: function renderMenuPopup(_ref, popupRef) {
      var open = _ref.open,
        popupProps = _objectWithoutPropertiesLoose(_ref, _excluded2);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: popupRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, popupProps), children);
    },
    onToggleMenu: function onToggleMenu(open, event) {
      onToggle === null || onToggle === void 0 || onToggle(open, eventKey, event);
      if (open) {
        onOpen === null || onOpen === void 0 || onOpen();
      } else {
        onClose === null || onClose === void 0 || onClose();
      }
    }
  }, function (_ref2, menuContainerRef) {
    var _withClassPrefix;
    var open = _ref2.open,
      menuContainer = _objectWithoutPropertiesLoose(_ref2, _excluded3);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + kebabCase(placementPolyfill(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix['selected-within'] = hasSelectedItem, _withClassPrefix)));
    return /*#__PURE__*/React.createElement(Component, _extends({
      ref: mergeRefs(ref, menuContainerRef),
      className: classes
    }, menuContainer, pick(toggleProps, ['data-testid']), {
      style: style
    }));
  });
});
NavDropdown.Item = NavDropdownItem;
NavDropdown.Menu = NavDropdownMenu;
NavDropdown.displayName = 'Nav.Dropdown';
NavDropdown.propTypes = {
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
export default NavDropdown;