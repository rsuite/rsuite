'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["classPrefix", "className", "shortcut", "active", "eventKey", "onSelect", "icon", "as", "divider", "panel", "children", "disabled"],
  _excluded2 = ["selected", "active"];
import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { deprecatePropType, deprecatePropTypeNew, oneOf } from "../internals/propTypes/index.js";
import MenuItem from "../internals/Menu/MenuItem.js";
import DropdownContext from "./DropdownContext.js";
import isNil from 'lodash/isNil';
import pick from 'lodash/pick';
import { useClassNames, useInternalId } from "../internals/hooks/index.js";
import { mergeRefs, shallowEqual, warnOnce } from "../internals/utils/index.js";
import NavContext from "../Nav/NavContext.js";
import { DropdownActionType } from "./DropdownState.js";
import { useRenderDropdownItem } from "./useRenderDropdownItem.js";
import Nav from "../Nav/index.js";
import Text from "../Text/index.js";
import DropdownSeparator from "./DropdownSeparator.js";
/**
 * The `<Dropdown.Item>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewItem>`
 * - Otherwise renders a `<MenuItem>`
 */
var DropdownItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item' : _props$classPrefix,
    className = props.className,
    shortcut = props.shortcut,
    activeProp = props.active,
    eventKey = props.eventKey,
    onSelect = props.onSelect,
    icon = props.icon,
    _props$as = props.as,
    Component = _props$as === void 0 ? 'li' : _props$as,
    divider = props.divider,
    panel = props.panel,
    children = props.children,
    disabled = props.disabled,
    restProps = _objectWithoutPropertiesLoose(props, _excluded);
  var internalId = useInternalId('DropdownItem');
  var nav = useContext(NavContext);
  var dropdown = useContext(DropdownContext);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleSelectItem = useCallback(function (event) {
    var _dropdown$onSelect;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    dropdown === null || dropdown === void 0 || (_dropdown$onSelect = dropdown.onSelect) === null || _dropdown$onSelect === void 0 || _dropdown$onSelect.call(dropdown, eventKey, event);
  }, [onSelect, eventKey, dropdown]);
  var selected = activeProp || !isNil(eventKey) && shallowEqual(dropdown === null || dropdown === void 0 ? void 0 : dropdown.activeKey, eventKey);
  var dispatch = dropdown === null || dropdown === void 0 ? void 0 : dropdown.dispatch;
  useEffect(function () {
    if (dispatch) {
      dispatch({
        type: DropdownActionType.RegisterItem,
        payload: {
          id: internalId,
          props: {
            selected: selected
          }
        }
      });
      return function () {
        dispatch({
          type: DropdownActionType.UnregisterItem,
          payload: {
            id: internalId
          }
        });
      };
    }
  }, [internalId, selected, dispatch]);
  var renderDropdownItem = useRenderDropdownItem(Component);

  // If using <Dropdown.Item> within <Nav>
  // Suggest <Nav.Item>
  if (nav) {
    warnOnce('Usage of <Dropdown.Item> within <Nav> is deprecated. Replace with <Nav.Item> within <Nav.Menu>.');
    return /*#__PURE__*/React.createElement(Nav.Item, _extends({
      ref: ref
    }, props));
  }
  if (divider) {
    return /*#__PURE__*/React.createElement(DropdownSeparator, _extends({
      as: "li"
    }, pick(props, ['data-testid'])));
  }
  if (panel) {
    return renderDropdownItem(_extends({
      ref: ref,
      className: merge(prefix('panel'), className),
      children: children
    }, restProps));
  }
  return /*#__PURE__*/React.createElement(MenuItem, {
    selected: selected,
    disabled: disabled,
    onActivate: handleSelectItem
  }, function (_ref, menuitemRef) {
    var selected = _ref.selected,
      active = _ref.active,
      menuitem = _objectWithoutPropertiesLoose(_ref, _excluded2);
    var classes = merge(className, withClassPrefix({
      'with-icon': icon,
      active: selected,
      disabled: disabled,
      focus: active,
      divider: divider,
      panel: panel
    }));
    var dataAttributes = {
      'data-event-key': eventKey
    };
    if (!isNil(eventKey) && typeof eventKey !== 'string') {
      dataAttributes['data-event-key-type'] = typeof eventKey;
    }
    return renderDropdownItem(_extends({
      ref: mergeRefs(ref, menuitemRef),
      className: classes
    }, menuitem, dataAttributes, restProps, {
      children: /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.cloneElement(icon, {
        className: classNames(prefix('menu-icon'), icon.props.className)
      }), /*#__PURE__*/React.createElement(Text, {
        as: "span",
        className: prefix('content')
      }, children), shortcut && /*#__PURE__*/React.createElement(Text, {
        as: "kbd",
        className: prefix('shortcut'),
        muted: true
      }, shortcut))
    }));
  });
});
DropdownItem.displayName = 'Dropdown.Item';
DropdownItem.propTypes = {
  as: PropTypes.elementType,
  divider: deprecatePropTypeNew(PropTypes.bool, 'Use Dropdown.Separator component instead.'),
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, oneOf(['click', 'hover'])]),
  open: deprecatePropType(PropTypes.bool),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: deprecatePropType(PropTypes.bool),
  submenu: PropTypes.element,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number
};
export default DropdownItem;