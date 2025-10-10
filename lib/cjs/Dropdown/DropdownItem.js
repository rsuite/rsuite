'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes2 = require("../internals/propTypes");
var _MenuItem = _interopRequireDefault(require("../internals/Menu/MenuItem"));
var _DropdownContext = _interopRequireDefault(require("./DropdownContext"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _DropdownState = require("./DropdownState");
var _useRenderDropdownItem = require("./useRenderDropdownItem");
var _Nav = _interopRequireDefault(require("../Nav"));
var _Text = _interopRequireDefault(require("../Text"));
var _DropdownSeparator = _interopRequireDefault(require("./DropdownSeparator"));
var _excluded = ["classPrefix", "className", "shortcut", "active", "eventKey", "onSelect", "icon", "as", "divider", "panel", "children", "disabled"],
  _excluded2 = ["selected", "active"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `<Dropdown.Item>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewItem>`
 * - Otherwise renders a `<MenuItem>`
 */
var DropdownItem = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
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
    restProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var internalId = (0, _hooks.useInternalId)('DropdownItem');
  var nav = (0, _react.useContext)(_NavContext.default);
  var dropdown = (0, _react.useContext)(_DropdownContext.default);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleSelectItem = (0, _react.useCallback)(function (event) {
    var _dropdown$onSelect;
    onSelect === null || onSelect === void 0 || onSelect(eventKey, event);
    dropdown === null || dropdown === void 0 || (_dropdown$onSelect = dropdown.onSelect) === null || _dropdown$onSelect === void 0 || _dropdown$onSelect.call(dropdown, eventKey, event);
  }, [onSelect, eventKey, dropdown]);
  var selected = activeProp || !(0, _isNil.default)(eventKey) && (0, _utils.shallowEqual)(dropdown === null || dropdown === void 0 ? void 0 : dropdown.activeKey, eventKey);
  var dispatch = dropdown === null || dropdown === void 0 ? void 0 : dropdown.dispatch;
  (0, _react.useEffect)(function () {
    if (dispatch) {
      dispatch({
        type: _DropdownState.DropdownActionType.RegisterItem,
        payload: {
          id: internalId,
          props: {
            selected: selected
          }
        }
      });
      return function () {
        dispatch({
          type: _DropdownState.DropdownActionType.UnregisterItem,
          payload: {
            id: internalId
          }
        });
      };
    }
  }, [internalId, selected, dispatch]);
  var renderDropdownItem = (0, _useRenderDropdownItem.useRenderDropdownItem)(Component);

  // If using <Dropdown.Item> within <Nav>
  // Suggest <Nav.Item>
  if (nav) {
    (0, _utils.warnOnce)('Usage of <Dropdown.Item> within <Nav> is deprecated. Replace with <Nav.Item> within <Nav.Menu>.');
    return /*#__PURE__*/_react.default.createElement(_Nav.default.Item, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  if (divider) {
    return /*#__PURE__*/_react.default.createElement(_DropdownSeparator.default, (0, _extends2.default)({
      as: "li"
    }, (0, _pick.default)(props, ['data-testid'])));
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
      }), /*#__PURE__*/_react.default.createElement(_Text.default, {
        as: "span",
        className: prefix('content')
      }, children), shortcut && /*#__PURE__*/_react.default.createElement(_Text.default, {
        as: "kbd",
        className: prefix('shortcut'),
        muted: true
      }, shortcut))
    }));
  });
});
DropdownItem.displayName = 'Dropdown.Item';
DropdownItem.propTypes = {
  as: _propTypes.default.elementType,
  divider: (0, _propTypes2.deprecatePropTypeNew)(_propTypes.default.bool, 'Use Dropdown.Separator component instead.'),
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
var _default = exports.default = DropdownItem;