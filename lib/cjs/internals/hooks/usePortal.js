'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.usePortal = usePortal;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _canUseDOM = _interopRequireDefault(require("dom-lib/canUseDOM"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var MountedPortal = /*#__PURE__*/_react.default.memo(function (_ref) {
  var children = _ref.children,
    container = _ref.container;
  var _useState = (0, _react.useState)(false),
    mounted = _useState[0],
    setMounted = _useState[1];
  (0, _react.useEffect)(function () {
    return setMounted(true);
  }, []);
  if (container && mounted) {
    return /*#__PURE__*/(0, _reactDom.createPortal)(children, container);
  }
  return null;
});
function usePortal(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props,
    container = _props.container,
    _props$waitMount = _props.waitMount,
    waitMount = _props$waitMount === void 0 ? false : _props$waitMount;
  var containerElement = typeof container === 'function' ? container() : container;
  var rootElement = (0, _react.useMemo)(function () {
    return _canUseDOM.default ? containerElement || document.body : null;
  }, [containerElement]);
  var Portal = (0, _react.useCallback)(function (_ref2) {
    var children = _ref2.children;
    return rootElement != null ? /*#__PURE__*/(0, _reactDom.createPortal)(children, rootElement) : null;
  }, [rootElement]);
  var WaitMountPortal = (0, _react.useCallback)(function (props) {
    return /*#__PURE__*/_react.default.createElement(MountedPortal, (0, _extends2.default)({
      container: rootElement
    }, props));
  }, [rootElement]);
  return {
    target: rootElement,
    Portal: waitMount ? WaitMountPortal : Portal
  };
}
var _default = exports.default = usePortal;