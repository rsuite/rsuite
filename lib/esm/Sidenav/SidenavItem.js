'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "active", "children", "className", "disabled", "classPrefix", "icon", "eventKey", "style", "onClick", "onSelect", "divider", "panel", "tooltip"],
  _excluded2 = ["selected", "active"];
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { useClassNames } from "../internals/hooks/index.js";
import { shallowEqual, mergeRefs, createChainedFunction } from "../internals/utils/index.js";
import Ripple from "../internals/Ripple/index.js";
import SafeAnchor from "../SafeAnchor/index.js";
import NavContext from "../Nav/NavContext.js";
import MenuItem from "../internals/Menu/MenuItem.js";
import omit from 'lodash/omit';
import { SidenavContext } from "./Sidenav.js";
import Whisper from "../Whisper/index.js";
import Tooltip from "../Tooltip/index.js";
import classNames from 'classnames';
/**
 * @private
 */
var SidenavItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var sidenav = useContext(SidenavContext);
  if (!sidenav) {
    throw new Error('<SidenavItem> component is not supposed to be used standalone. Use <Nav.Item> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? SafeAnchor : _props$as,
    activeProp = props.active,
    children = props.children,
    className = props.className,
    disabled = props.disabled,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'sidenav-item' : _props$classPrefix,
    icon = props.icon,
    eventKey = props.eventKey,
    style = props.style,
    onClick = props.onClick,
    onSelect = props.onSelect,
    divider = props.divider,
    panel = props.panel,
    _props$tooltip = props.tooltip,
    tooltip = _props$tooltip === void 0 ? children : _props$tooltip,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _ref = useContext(NavContext),
    activeKey = _ref.activeKey,
    onSelectFromNav = _ref.onSelect;
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var selected = activeProp !== null && activeProp !== void 0 ? activeProp : !isNil(eventKey) && shallowEqual(activeKey, eventKey);
  var whisperRef = React.useRef(null);
  var handleClick = useCallback(function (event) {
    var _whisperRef$current;
    if (disabled) return;
    (_whisperRef$current = whisperRef.current) === null || _whisperRef$current === void 0 || _whisperRef$current.close();
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
    onClick === null || onClick === void 0 || onClick(event);
  }, [disabled, onSelect, onSelectFromNav, eventKey, onClick]);
  var clonedIcon = icon ? /*#__PURE__*/React.cloneElement(icon, {
    className: classNames(prefix('icon'), icon.props.className)
  }) : null;
  if (!sidenav.expanded) {
    return /*#__PURE__*/React.createElement(Whisper, {
      trigger: "hover",
      speaker: /*#__PURE__*/React.createElement(Tooltip, null, tooltip),
      placement: "right",
      ref: whisperRef
    }, function (triggerProps, triggerRef) {
      return /*#__PURE__*/React.createElement(MenuItem, {
        selected: selected,
        disabled: disabled,
        onActivate: handleClick
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
          active = _ref2.active,
          menuitem = _objectWithoutPropertiesLoose(_ref2, _excluded2);
        var classes = merge(className, withClassPrefix({
          focus: active,
          active: selected,
          disabled: disabled
        }));

        // Show tooltip when inside a collapse <Sidenav>
        return /*#__PURE__*/React.createElement(Component, _extends({
          ref: mergeRefs(mergeRefs(ref, menuitemRef), triggerRef),
          disabled: Component === SafeAnchor ? disabled : undefined,
          className: classes,
          "data-event-key": eventKey
        }, omit(rest, ['divider', 'panel']), triggerProps, menuitem, {
          onMouseOver: createChainedFunction(menuitem.onMouseOver, triggerProps.onMouseOver),
          onMouseOut: createChainedFunction(menuitem.onMouseOut, triggerProps.onMouseOut)
        }), clonedIcon, children, /*#__PURE__*/React.createElement(Ripple, null));
      });
    });
  }
  if (divider) {
    return /*#__PURE__*/React.createElement("li", _extends({
      ref: ref,
      role: "separator",
      style: style,
      className: merge(className, prefix('divider'))
    }, rest));
  }
  if (panel) {
    return /*#__PURE__*/React.createElement("li", _extends({
      ref: ref,
      role: "none presentation",
      style: style,
      className: merge(className, prefix('panel'))
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: merge(className, withClassPrefix({
      active: selected,
      disabled: disabled
    })),
    onClick: handleClick,
    style: style,
    "aria-selected": selected || undefined,
    "data-event-key": eventKey
  }, rest), clonedIcon, children, /*#__PURE__*/React.createElement(Ripple, null));
});
SidenavItem.displayName = 'Sidenav.Item';
SidenavItem.propTypes = {
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  style: PropTypes.object,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func
};
export default SidenavItem;