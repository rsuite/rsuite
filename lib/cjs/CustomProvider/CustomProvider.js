'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = CustomProvider;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _IconProvider = _interopRequireDefault(require("@rsuite/icons/IconProvider"));
var _hooks = require("../internals/hooks");
var _prefix = require("../internals/utils/prefix");
var _DOMHelper = require("../DOMHelper");
var _CustomContext = require("./CustomContext");
var _ToastContainer = _interopRequireWildcard(require("../toaster/ToastContainer"));
var _excluded = ["children", "classPrefix", "components", "iconClassPrefix", "theme", "toastContainer", "disableRipple", "csp", "disableInlineStyles"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
function CustomProvider(props) {
  var children = props.children,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? (0, _prefix.getClassNamePrefix)() : _props$classPrefix,
    components = props.components,
    _props$iconClassPrefi = props.iconClassPrefix,
    iconClassPrefix = _props$iconClassPrefi === void 0 ? classPrefix : _props$iconClassPrefi,
    theme = props.theme,
    _props$toastContainer = props.toastContainer,
    toastContainer = _props$toastContainer === void 0 ? _ToastContainer.defaultToasterContainer : _props$toastContainer,
    disableRipple = props.disableRipple,
    csp = props.csp,
    disableInlineStyles = props.disableInlineStyles,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var toasters = (0, _react.useRef)(new Map());
  var _usePortal = (0, _hooks.usePortal)({
      container: toastContainer,
      waitMount: true
    }),
    Portal = _usePortal.Portal;
  var value = (0, _react.useMemo)(function () {
    return (0, _extends2.default)({
      classPrefix: classPrefix,
      theme: theme,
      toasters: toasters,
      disableRipple: disableRipple,
      components: components,
      toastContainer: toastContainer
    }, rest);
  }, [classPrefix, theme, disableRipple, components, toastContainer, rest]);
  var iconContext = (0, _react.useMemo)(function () {
    return {
      classPrefix: iconClassPrefix,
      csp: csp,
      disableInlineStyles: disableInlineStyles
    };
  }, [iconClassPrefix, csp, disableInlineStyles]);
  (0, _hooks.useIsomorphicLayoutEffect)(function () {
    if (_DOMHelper.canUseDOM && theme) {
      (0, _DOMHelper.addClass)(document.body, (0, _prefix.prefix)(classPrefix, "theme-" + theme));

      // Remove the className that will cause style conflicts
      themes.forEach(function (t) {
        if (t !== theme) {
          (0, _DOMHelper.removeClass)(document.body, (0, _prefix.prefix)(classPrefix, "theme-" + t));
        }
      });
    }
  }, [classPrefix, theme]);
  return /*#__PURE__*/_react.default.createElement(_CustomContext.CustomContext.Provider, {
    value: value
  }, /*#__PURE__*/_react.default.createElement(_IconProvider.default, {
    value: iconContext
  }, children, /*#__PURE__*/_react.default.createElement(Portal, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classPrefix + "toast-provider"
  }, _ToastContainer.toastPlacements.map(function (placement) {
    return /*#__PURE__*/_react.default.createElement(_ToastContainer.default, {
      key: placement,
      placement: placement,
      ref: function ref(_ref) {
        toasters.current.set(placement, _ref);
      }
    });
  })))));
}