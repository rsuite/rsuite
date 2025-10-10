'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _Sidenav = require("./Sidenav");
var _Whisper = _interopRequireDefault(require("../Whisper"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["as", "active", "children", "className", "disabled", "classPrefix", "icon", "eventKey", "style", "onClick", "onSelect", "divider", "panel", "tooltip"],
  _excluded2 = ["selected", "active"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private
 */
var SidenavItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  if (!sidenav) {
    throw new Error('<SidenavItem> component is not supposed to be used standalone. Use <Nav.Item> inside <Sidenav> instead.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? _SafeAnchor.default : _props$as,
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _ref = (0, _react.useContext)(_NavContext.default),
    activeKey = _ref.activeKey,
    onSelectFromNav = _ref.onSelect;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var selected = activeProp !== null && activeProp !== void 0 ? activeProp : !(0, _isNil.default)(eventKey) && (0, _utils.shallowEqual)(activeKey, eventKey);
  var whisperRef = _react.default.useRef(null);
  var handleClick = (0, _react.useCallback)(function (event) {
    var _whisperRef$current;
    if (disabled) return;
    (_whisperRef$current = whisperRef.current) === null || _whisperRef$current === void 0 || _whisperRef$current.close();
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    onSelectFromNav === null || onSelectFromNav === void 0 || onSelectFromNav(eventKey, event);
    onClick === null || onClick === void 0 || onClick(event);
  }, [disabled, onSelect, onSelectFromNav, eventKey, onClick]);
  var clonedIcon = icon ? /*#__PURE__*/_react.default.cloneElement(icon, {
    className: (0, _classnames.default)(prefix('icon'), icon.props.className)
  }) : null;
  if (!sidenav.expanded) {
    return /*#__PURE__*/_react.default.createElement(_Whisper.default, {
      trigger: "hover",
      speaker: /*#__PURE__*/_react.default.createElement(_Tooltip.default, null, tooltip),
      placement: "right",
      ref: whisperRef
    }, function (triggerProps, triggerRef) {
      return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
        selected: selected,
        disabled: disabled,
        onActivate: handleClick
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
          active = _ref2.active,
          menuitem = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded2);
        var classes = merge(className, withClassPrefix({
          focus: active,
          active: selected,
          disabled: disabled
        }));

        // Show tooltip when inside a collapse <Sidenav>
        return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
          ref: (0, _utils.mergeRefs)((0, _utils.mergeRefs)(ref, menuitemRef), triggerRef),
          disabled: Component === _SafeAnchor.default ? disabled : undefined,
          className: classes,
          "data-event-key": eventKey
        }, (0, _omit.default)(rest, ['divider', 'panel']), triggerProps, menuitem, {
          onMouseOver: (0, _utils.createChainedFunction)(menuitem.onMouseOver, triggerProps.onMouseOver),
          onMouseOut: (0, _utils.createChainedFunction)(menuitem.onMouseOut, triggerProps.onMouseOut)
        }), clonedIcon, children, /*#__PURE__*/_react.default.createElement(_Ripple.default, null));
      });
    });
  }
  if (divider) {
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      ref: ref,
      role: "separator",
      style: style,
      className: merge(className, prefix('divider'))
    }, rest));
  }
  if (panel) {
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      ref: ref,
      role: "none presentation",
      style: style,
      className: merge(className, prefix('panel'))
    }, rest), children);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: merge(className, withClassPrefix({
      active: selected,
      disabled: disabled
    })),
    onClick: handleClick,
    style: style,
    "aria-selected": selected || undefined,
    "data-event-key": eventKey
  }, rest), clonedIcon, children, /*#__PURE__*/_react.default.createElement(_Ripple.default, null));
});
SidenavItem.displayName = 'Sidenav.Item';
SidenavItem.propTypes = {
  classPrefix: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  eventKey: _propTypes.default.any,
  as: _propTypes.default.elementType,
  style: _propTypes.default.object,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func
};
var _default = exports.default = SidenavItem;