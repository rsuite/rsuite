'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isNil = _interopRequireDefault(require("lodash/isNil"));
var _PagePrevious = _interopRequireDefault(require("@rsuite/icons/PagePrevious"));
var _PageNext = _interopRequireDefault(require("@rsuite/icons/PageNext"));
var _Disclosure = _interopRequireDefault(require("../internals/Disclosure"));
var _NavContext = _interopRequireDefault(require("../Nav/NavContext"));
var _utils = require("../internals/utils");
var _hooks = require("../internals/hooks");
var _ = require(".");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2;
var _excluded = ["onToggle", "eventKey", "title", "classPrefix", "children", "openDirection"],
  _excluded2 = ["icon", "className", "disabled"],
  _excluded3 = ["open"],
  _excluded4 = ["open"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Navbar>
 *
 * <Navbar>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu title="menu"> -> This submenu will render <NavbarDropdownMenu> component
 *       </Nav.Menu>
 *     </Nav.Menu>
 *   </Nav>
 * </Navbar>
 */
var NavbarDropdownMenu = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var navbar = (0, _react.useContext)(_.NavbarContext);
  var nav = (0, _react.useContext)(_NavContext.default);
  if (!navbar || !nav) {
    throw new Error('<Navbar.Dropdown.Menu> must be rendered within a <Nav> within a <Navbar> component.');
  }
  var _onToggle = props.onToggle,
    eventKey = props.eventKey,
    title = props.title,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
    children = props.children,
    _props$openDirection = props.openDirection,
    openDirection = _props$openDirection === void 0 ? 'end' : _props$openDirection,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix;
  var _useClassNames2 = (0, _hooks.useClassNames)('dropdown-menu'),
    withMenuClassPrefix = _useClassNames2.withClassPrefix,
    mergeMenuClassName = _useClassNames2.merge;
  var _useClassNames3 = (0, _hooks.useClassNames)('dropdown-item'),
    mergeItemClassNames = _useClassNames3.merge,
    withItemClassPrefix = _useClassNames3.withClassPrefix,
    prefixItemClassName = _useClassNames3.prefix;

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  var _omit = (0, _omit2.default)(rest, ['trigger']),
    icon = _omit.icon,
    className = _omit.className,
    disabled = _omit.disabled,
    menuProps = (0, _objectWithoutPropertiesLoose2.default)(_omit, _excluded2);
  var Icon = rtl ? _PagePrevious.default : _PageNext.default;
  return /*#__PURE__*/_react.default.createElement(_Disclosure.default, {
    hideOnClickOutside: true,
    trigger: ['click', 'hover'],
    onToggle: function onToggle(open, event) {
      return _onToggle === null || _onToggle === void 0 ? void 0 : _onToggle(open, undefined, event);
    }
  }, function (_ref, containerRef) {
    var open = _ref.open,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded3);
    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/_react.default.createElement("li", (0, _extends2.default)({
      ref: (0, _utils.mergeRefs)(ref, containerRef),
      className: classes
    }, props), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Button, null, function (_ref2, buttonRef) {
      var open = _ref2.open,
        buttonProps = (0, _objectWithoutPropertiesLoose2.default)(_ref2, _excluded4);
      var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["toggle"]))), withItemClassPrefix({
        'with-icon': icon,
        open: open,
        disabled: disabled
      }));
      var dataAttributes = {
        'data-event-key': eventKey
      };
      if (!(0, _isNil.default)(eventKey) && typeof eventKey !== 'string') {
        dataAttributes['data-event-key-type'] = typeof eventKey;
      }
      return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
        ref: (0, _utils.mergeRefs)(buttonRef, buttonRef),
        className: classes
      }, dataAttributes, buttonProps), icon && /*#__PURE__*/_react.default.cloneElement(icon, {
        className: prefix('menu-icon')
      }), title, /*#__PURE__*/_react.default.createElement(Icon, {
        className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["toggle-icon"])))
      }));
    }), /*#__PURE__*/_react.default.createElement(_Disclosure.default.Content, null, function (_ref3, elementRef) {
      var open = _ref3.open;
      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/_react.default.createElement("ul", (0, _extends2.default)({
        ref: elementRef,
        className: menuClassName,
        hidden: !open,
        "data-direction": openDirection
      }, menuProps), children);
    }));
  });
});
NavbarDropdownMenu.displayName = 'Nav.Dropdown.Menu';
NavbarDropdownMenu.propTypes = {
  active: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  icon: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  pullLeft: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool, 'Use openDirection="start" instead.'),
  openDirection: (0, _propTypes2.oneOf)(['start', 'end']),
  title: _propTypes.default.node,
  open: _propTypes.default.bool,
  eventKey: _propTypes.default.any,
  expanded: _propTypes.default.bool,
  collapsible: _propTypes.default.bool,
  onToggle: _propTypes.default.func
};
var _default = exports.default = NavbarDropdownMenu;