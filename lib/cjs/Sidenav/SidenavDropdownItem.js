'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Sidenav = require("./Sidenav");
var _propTypes2 = require("../internals/propTypes");
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _useRenderDropdownItem = require("../Dropdown/useRenderDropdownItem");
var _ExpandedSidenavDropdownItem = _interopRequireDefault(require("./ExpandedSidenavDropdownItem"));
var _classnames = _interopRequireDefault(require("classnames"));
var _excluded = ["classPrefix", "className", "active", "eventKey", "onSelect", "icon", "as", "divider", "panel", "children", "disabled"],
  _excluded2 = ["selected", "active"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Item> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Item></Nav.Item> -> This will render <SidenavDropdownItem> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
var SidenavDropdownItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  var nav = (0, _react.useContext)(_NavContext.default);
  if (!sidenav || !nav) {
    throw new Error('<Sidenav.Dropdown.Item> must be used within a <Nav> within a <Sidenav> component.');
  }
  var _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-item' : _props$classPrefix,
    className = props.className,
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
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleSelectItem = (0, _react.useCallback)(function (event) {
    var _nav$onSelect;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    (_nav$onSelect = nav.onSelect) === null || _nav$onSelect === void 0 || _nav$onSelect.call(nav, eventKey, event);
  }, [onSelect, eventKey, nav]);
  var selected = activeProp || !(0, _isNil.default)(eventKey) && (0, _utils.shallowEqual)(nav === null || nav === void 0 ? void 0 : nav.activeKey, eventKey);
  var renderDropdownItem = (0, _useRenderDropdownItem.useRenderDropdownItem)(Component);
  if (sidenav.expanded) {
    return /*#__PURE__*/_react.default.createElement(_ExpandedSidenavDropdownItem.default, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  if (divider) {
    return renderDropdownItem((0, _extends2.default)({
      ref: ref,
      role: 'separator',
      className: merge(prefix('divider'), className)
    }, restProps));
  }
  if (panel) {
    return renderDropdownItem((0, _extends2.default)({
      ref: ref,
      className: merge(prefix('panel'), className),
      children: children
    }, restProps));
  }
  return /*#__PURE__*/_react.default.createElement(_MenuItem.default, {
    selected: selected,
    disabled: disabled,
    onActivate: handleSelectItem
  }, function (_ref, menuitemRef) {
    var selected = _ref.selected,
      active = _ref.active,
      menuitem = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
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
    if (!(0, _isNil.default)(eventKey) && typeof eventKey !== 'string') {
      dataAttributes['data-event-key-type'] = typeof eventKey;
    }
    return renderDropdownItem((0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, menuitemRef),
      className: classes
    }, menuitem, dataAttributes, restProps, {
      children: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, icon && /*#__PURE__*/_react.default.cloneElement(icon, {
        className: (0, _classnames.default)(prefix('menu-icon'), icon.props.className)
      }), children)
    }));
  });
});
SidenavDropdownItem.displayName = 'Sidenav.Dropdown.Item';
SidenavDropdownItem.propTypes = {
  as: _propTypes.default.elementType,
  divider: _propTypes.default.bool,
  panel: _propTypes.default.bool,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, (0, _propTypes2.oneOf)(['click', 'hover'])]),
  open: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool),
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  pullLeft: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool),
  submenu: _propTypes.default.element,
  onSelect: _propTypes.default.func,
  onClick: _propTypes.default.func,
  icon: _propTypes.default.node,
  eventKey: _propTypes.default.any,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  tabIndex: _propTypes.default.number
};
var _default = exports.default = SidenavDropdownItem;