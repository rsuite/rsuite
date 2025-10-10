'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "href", "disabled", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * A SafeAnchor is a wrapper around the `<a>` HTML element.
 * @private
 */
var SafeAnchor = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('SafeAnchor', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'a' : _propsWithDefaults$as,
    href = propsWithDefaults.href,
    disabled = propsWithDefaults.disabled,
    onClick = propsWithDefaults.onClick,
    restProps = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var handleClick = (0, _react.useCallback)(function (event) {
    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick === null || onClick === void 0 || onClick(event);
  }, [disabled, href, onClick]);

  // There are default role and href attributes on the node to ensure Focus management and keyboard interactions.
  var trivialProps = isTrivialHref(href) ? {
    role: 'button',
    href: '#'
  } : null;
  if (disabled) {
    restProps.tabIndex = -1;
    restProps['aria-disabled'] = true;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: ref,
    href: href
  }, trivialProps, restProps, {
    onClick: handleClick
  }));
});
SafeAnchor.displayName = 'SafeAnchor';
SafeAnchor.propTypes = {
  href: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  as: _propTypes.default.elementType
};
var _default = exports.default = SafeAnchor;