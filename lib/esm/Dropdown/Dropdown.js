'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "activeKey", "title", "trigger", "placement", "toggleAs", "toggleClassName", "open", "defaultOpen", "classPrefix", "className", "disabled", "children", "menuStyle", "style", "onClose", "onOpen", "onToggle", "onSelect"],
  _excluded2 = ["open"],
  _excluded3 = ["open"];
import React, { useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import DropdownMenu from "./DropdownMenu.js";
import { PLACEMENT_8 } from "../internals/constants/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { mergeRefs, placementPolyfill, warnOnce } from "../internals/utils/index.js";
import { deprecatePropType, oneOf } from "../internals/propTypes/index.js";
import { initialState, reducer } from "./DropdownState.js";
import { useCustom } from "../CustomProvider/index.js";
import DropdownItem from "./DropdownItem.js";
import DropdownContext from "./DropdownContext.js";
import Menu from "../internals/Menu/Menu.js";
import DropdownToggle from "./DropdownToggle.js";
import kebabCase from 'lodash/kebabCase';
import NavContext from "../Nav/NavContext.js";
import Nav from "../Nav/index.js";
import DropdownSeparator from "./DropdownSeparator.js";
/**
 * The `Dropdown` component is used to select an option from a set of options.
 * @see https://rsuitejs.com/components/dropdown
 *
 * The `<Dropdown>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewRootItem>`;
 * - Otherwise renders a `<MenuRoot>`
 */
var Dropdown = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Dropdown', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    activeKey = propsWithDefaults.activeKey,
    title = propsWithDefaults.title,
    _propsWithDefaults$tr = propsWithDefaults.trigger,
    trigger = _propsWithDefaults$tr === void 0 ? 'click' : _propsWithDefaults$tr,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    toggleAs = propsWithDefaults.toggleAs,
    toggleClassName = propsWithDefaults.toggleClassName,
    open = propsWithDefaults.open,
    defaultOpen = propsWithDefaults.defaultOpen,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'dropdown' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    disabled = propsWithDefaults.disabled,
    children = propsWithDefaults.children,
    menuStyle = propsWithDefaults.menuStyle,
    style = propsWithDefaults.style,
    onClose = propsWithDefaults.onClose,
    onOpen = propsWithDefaults.onOpen,
    onToggle = propsWithDefaults.onToggle,
    onSelect = propsWithDefaults.onSelect,
    toggleProps = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var nav = useContext(NavContext);
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
    items = _useReducer[0].items,
    dispatch = _useReducer[1];
  var hasSelectedItem = useMemo(function () {
    return items.some(function (item) {
      return item.props.selected;
    });
  }, [items]);
  var dropdownContextValue = useMemo(function () {
    return {
      activeKey: activeKey,
      onSelect: onSelect,
      hasSelectedItem: hasSelectedItem,
      dispatch: dispatch
    };
  }, [activeKey, onSelect, hasSelectedItem, dispatch]);

  // Deprecate <Dropdown> within <Nav> usage
  // in favor of <Nav.Menu> API
  if (nav) {
    warnOnce('Usage of <Dropdown> within <Nav> is deprecated. Replace with <Nav.Menu>');
    return /*#__PURE__*/React.createElement(Nav.Menu, _extends({
      ref: ref
    }, props));
  }
  var renderMenuButton = function renderMenuButton(menuButtonProps, menuButtonRef) {
    return /*#__PURE__*/React.createElement(DropdownToggle, _extends({
      ref: menuButtonRef,
      as: toggleAs,
      className: toggleClassName,
      placement: placement,
      disabled: disabled
    }, omit(menuButtonProps, ['open']), omit(toggleProps, ['data-testid'])), title);
  };
  return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
    value: dropdownContextValue
  }, /*#__PURE__*/React.createElement(Menu, {
    open: open,
    defaultOpen: defaultOpen,
    menuButtonText: title,
    renderMenuButton: renderMenuButton,
    disabled: disabled,
    openMenuOn: menuButtonTriggers,
    renderMenuPopup: function renderMenuPopup(_ref, popupRef) {
      var open = _ref.open,
        popupProps = _objectWithoutPropertiesLoose(_ref, _excluded2);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: popupRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, popupProps), children);
    },
    onToggleMenu: function onToggleMenu(open) {
      onToggle === null || onToggle === void 0 || onToggle(open);
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
  }));
});
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
Dropdown.Separator = DropdownSeparator;
Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
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
export default Dropdown;