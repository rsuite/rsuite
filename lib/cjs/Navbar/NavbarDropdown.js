'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _castArray = _interopRequireDefault(require("lodash/castArray"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _hooks = require("../internals/hooks");
var _constants = require("../internals/constants");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _ = require(".");
var _Disclosure = _interopRequireDefault(require("../internals/Disclosure/Disclosure"));
var _NavDropdownItem = _interopRequireDefault(require("../Nav/NavDropdownItem"));
var _NavDropdownMenu = _interopRequireDefault(require("../Nav/NavDropdownMenu"));
var _NavbarDropdownToggle = _interopRequireDefault(require("./NavbarDropdownToggle"));
var _excluded = ["as", "title", "onClose", "onOpen", "onToggle", "trigger", "placement", "toggleAs", "toggleClassName", "classPrefix", "className", "disabled", "children", "menuStyle", "style"],
  _excluded2 = ["open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private
 */
var NavbarDropdown = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var navbar = (0, _react.useContext)(_.NavbarContext);
  if (!navbar) {
    throw new Error('<Navbar.Dropdown> should be used within a <Navbar> component.');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    title = props.title,
    onClose = props.onClose,
    onOpen = props.onOpen,
    _onToggle = props.onToggle,
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
    toggleProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var _useClassNames2 = (0, _hooks.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  return /*#__PURE__*/_react.default.createElement(_Disclosure.default, {
    trigger: (0, _castArray.default)(trigger),
    hideOnClickOutside: true,
    onToggle: function onToggle(open) {
      _onToggle === null || _onToggle === void 0 || _onToggle(open);
      if (open) {
        onOpen === null || onOpen === void 0 || onOpen();
      } else {
        onClose === null || onClose === void 0 || onClose();
      }
    }
  }, function (_ref, containerRef) {
    var _withClassPrefix;
    var open = _ref.open,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
    var classes = merge(className, withClassPrefix((_withClassPrefix = {}, _withClassPrefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = !!placement, _withClassPrefix.disabled = disabled, _withClassPrefix.open = open, _withClassPrefix)));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, containerRef),
      className: classes,
      style: style
    }, props), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Button, null, function (buttonProps, buttonRef) {
      return /*#__PURE__*/_react.default.createElement(_NavbarDropdownToggle.default, (0, _extends2.default)({
        ref: buttonRef,
        as: toggleAs,
        className: toggleClassName,
        placement: placement,
        disabled: disabled
      }, (0, _omit.default)(buttonProps, ['open']), toggleProps), title);
    }), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Content, null, function (_ref2, elementRef) {
      var open = _ref2.open;
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: elementRef,
        className: menuClassName,
        style: menuStyle,
        hidden: !open
      }, children);
    }));
  });
});
NavbarDropdown.Item = _NavDropdownItem.default;
NavbarDropdown.Menu = _NavDropdownMenu.default;
NavbarDropdown.displayName = 'Navbar.Dropdown';
NavbarDropdown.propTypes = {
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
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  onContextMenu: _propTypes.default.func,
  onClick: _propTypes.default.func,
  renderToggle: _propTypes.default.func
};
var _default = exports.default = NavbarDropdown;