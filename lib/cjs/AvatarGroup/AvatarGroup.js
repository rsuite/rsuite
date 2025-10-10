'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.AvatarGroupContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "spacing", "className", "children", "stack", "size", "style"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var AvatarGroupContext = exports.AvatarGroupContext = /*#__PURE__*/_react.default.createContext({});

/**
 * The AvatarGroup component is used to represent a collection of avatars.
 * @see https://rsuitejs.com/components/avatar
 */
var AvatarGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('AvatarGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'avatar-group' : _propsWithDefaults$cl,
    spacing = propsWithDefaults.spacing,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    stack = propsWithDefaults.stack,
    size = propsWithDefaults.size,
    style = propsWithDefaults.style,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    stack: stack
  }));
  var contextValue = (0, _react.useMemo)(function () {
    return {
      size: size
    };
  }, [size]);
  var styles = (0, _utils.isIE)() ? style : (0, _extends2.default)({}, style, {
    gap: spacing
  });
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "group"
  }, rest, {
    ref: ref,
    className: classes,
    style: styles
  }), /*#__PURE__*/_react.default.createElement(AvatarGroupContext.Provider, {
    value: contextValue
  }, children));
});
AvatarGroup.displayName = 'AvatarGroup';
AvatarGroup.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  stack: _propTypes.default.bool,
  spacing: _propTypes.default.number,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs'])
};
var _default = exports.default = AvatarGroup;