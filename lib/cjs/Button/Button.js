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
var _Ripple = _interopRequireDefault(require("../internals/Ripple"));
var _SafeAnchor = _interopRequireDefault(require("../SafeAnchor"));
var _propTypes2 = require("../internals/propTypes");
var _ButtonGroup = require("../ButtonGroup");
var _utils = require("../internals/utils");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3;
var _excluded = ["as", "active", "appearance", "block", "className", "children", "classPrefix", "color", "disabled", "loading", "ripple", "size", "startIcon", "endIcon", "type"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The Button component is used to trigger a custom action.
 * @see https://rsuitejs.com/components/button
 */
var Button = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Button', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var as = propsWithDefaults.as,
    active = propsWithDefaults.active,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    block = propsWithDefaults.block,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'btn' : _propsWithDefaults$cl,
    color = propsWithDefaults.color,
    disabled = propsWithDefaults.disabled,
    loading = propsWithDefaults.loading,
    _propsWithDefaults$ri = propsWithDefaults.ripple,
    ripple = _propsWithDefaults$ri === void 0 ? true : _propsWithDefaults$ri,
    sizeProp = propsWithDefaults.size,
    startIcon = propsWithDefaults.startIcon,
    endIcon = propsWithDefaults.endIcon,
    typeProp = propsWithDefaults.type,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var buttonGroup = (0, _react.useContext)(_ButtonGroup.ButtonGroupContext);
  var size = sizeProp !== null && sizeProp !== void 0 ? sizeProp : buttonGroup === null || buttonGroup === void 0 ? void 0 : buttonGroup.size;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(appearance, color, size, {
    active: active,
    disabled: disabled,
    loading: loading,
    block: block
  }));
  var buttonContent = (0, _react.useMemo)(function () {
    var spin = /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["spin"])))
    });
    var rippleElement = ripple && !(0, _utils.isOneOf)(appearance, ['link', 'ghost']) ? /*#__PURE__*/_react.default.createElement(_Ripple.default, null) : null;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, loading && spin, startIcon ? /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["start-icon"])))
    }, startIcon) : null, children, endIcon ? /*#__PURE__*/_react.default.createElement("span", {
      className: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["end-icon"])))
    }, endIcon) : null, rippleElement);
  }, [appearance, children, endIcon, loading, prefix, ripple, startIcon]);
  if (rest.href) {
    return /*#__PURE__*/_react.default.createElement(_SafeAnchor.default, (0, _extends2.default)({}, rest, {
      as: as,
      ref: ref,
      "aria-disabled": disabled,
      disabled: disabled,
      className: classes
    }), buttonContent);
  }
  var Component = as || 'button';
  var type = typeProp || (Component === 'button' ? 'button' : undefined);
  var role = rest.role || (Component !== 'button' ? 'button' : undefined);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    role: role,
    type: type,
    ref: ref,
    disabled: disabled,
    "aria-disabled": disabled,
    className: classes
  }), buttonContent);
});
Button.displayName = 'Button';
Button.propTypes = {
  as: _propTypes.default.elementType,
  active: _propTypes.default.bool,
  appearance: (0, _propTypes2.oneOf)(['default', 'primary', 'link', 'subtle', 'ghost']),
  block: _propTypes.default.bool,
  children: _propTypes.default.node,
  color: (0, _propTypes2.oneOf)(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  disabled: _propTypes.default.bool,
  href: _propTypes.default.string,
  loading: _propTypes.default.bool,
  ripple: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  type: (0, _propTypes2.oneOf)(['button', 'reset', 'submit'])
};
var _default = exports.default = Button;