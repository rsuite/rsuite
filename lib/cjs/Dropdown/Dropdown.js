'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _DropdownState = require("./DropdownState");
var _CustomProvider = require("../CustomProvider");
var _DropdownItem = _interopRequireDefault(require("./DropdownItem"));
var _DropdownContext = _interopRequireDefault(require("./DropdownContext"));
var _Menu = _interopRequireDefault(require("../internals/Menu/Menu"));
var _DropdownToggle = _interopRequireDefault(require("./DropdownToggle"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _Nav = _interopRequireDefault(require("../Nav"));
var _DropdownSeparator = _interopRequireDefault(require("./DropdownSeparator"));
var _excluded = ["as", "activeKey", "title", "trigger", "placement", "toggleAs", "toggleClassName", "open", "defaultOpen", "classPrefix", "className", "disabled", "children", "menuStyle", "style", "onClose", "onOpen", "onToggle", "onSelect"],
  _excluded2 = ["open"],
  _excluded3 = ["open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Dropdown` component is used to select an option from a set of options.
 * @see https://rsuitejs.com/components/dropdown
 *
 * The `<Dropdown>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewRootItem>`;
 * - Otherwise renders a `<MenuRoot>`
 */
var Dropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Dropdown', props),
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
    toggleProps = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var nav = (0, _react.useContext)(_NavContext.default);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = (0, _hooks.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var menuButtonTriggers = (0, _react.useMemo)(function () {
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
  var _useReducer = (0, _react.useReducer)(_DropdownState.reducer, _DropdownState.initialState),
    items = _useReducer[0].items,
    dispatch = _useReducer[1];
  var hasSelectedItem = (0, _react.useMemo)(function () {
    return items.some(function (item) {
      return item.props.selected;
    });
  }, [items]);
  var dropdownContextValue = (0, _react.useMemo)(function () {
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
    (0, _utils.warnOnce)('Usage of <Dropdown> within <Nav> is deprecated. Replace with <Nav.Menu>');
    return /*#__PURE__*/_react.default.createElement(_Nav.default.Menu, (0, _extends2.default)({
      ref: ref
    }, props));
  }
  var renderMenuButton = function renderMenuButton(menuButtonProps, menuButtonRef) {
    return /*#__PURE__*/_react.default.createElement(_DropdownToggle.default, (0, _extends2.default)({
      ref: menuButtonRef,
      as: toggleAs,
      className: toggleClassName,
      placement: placement,
      disabled: disabled
    }, (0, _omit.default)(menuButtonProps, ['open']), (0, _omit.default)(toggleProps, ['data-testid'])), title);
  };
  return /*#__PURE__*/_react.default.createElement(_DropdownContext.default.Provider, {
    value: dropdownContextValue
  }, /*#__PURE__*/_react.default.createElement(_Menu.default, {
    open: open,
    defaultOpen: defaultOpen,
    menuButtonText: title,
    renderMenuButton: renderMenuButton,
    disabled: disabled,
    openMenuOn: menuButtonTriggers,
    renderMenuPopup: function renderMenuPopup(_ref, popupRef) {
      var open = _ref.open,
        popupProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
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
      menuContainer = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded3);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix['selected-within'] = hasSelectedItem, _withClassPrefix)));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, menuContainerRef),
      className: classes
    }, menuContainer, (0, _pick.default)(toggleProps, ['data-testid']), {
      style: style
    }));
  }));
});
Dropdown.Item = _DropdownItem.default;
Dropdown.Menu = _DropdownMenu.default;
Dropdown.Separator = _DropdownSeparator.default;
Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  activeKey: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  trigger: _propTypes.default.oneOfType([_propTypes.default.array, (0, _propTypes2.oneOf)(['click', 'hover', 'contextMenu'])]),
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT_8),
  title: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  menuStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  toggleClassName: _propTypes.default.string,
  children: _propTypes.default.node,
  open: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool),
  eventKey: _propTypes.default.any,
  as: _propTypes.default.elementType,
  toggleAs: _propTypes.default.elementType,
  noCaret: _propTypes.default.bool,
  style: _propTypes.default.object,
  onClose: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onToggle: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func,
  renderToggle: _propTypes.default.func
};
var _default = exports.default = Dropdown;