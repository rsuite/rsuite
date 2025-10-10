'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _omit = _interopRequireDefault(require("lodash/omit"));
var _addStyle = _interopRequireDefault(require("dom-lib/addStyle"));
var _getWidth = _interopRequireDefault(require("dom-lib/getWidth"));
var _utils = require("../utils");
var _hooks = require("../hooks");
var _excluded = ["as", "classPrefix", "autoWidth", "className", "placement", "target"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var omitProps = ['placement', 'arrowOffsetLeft', 'arrowOffsetTop', 'positionLeft', 'positionTop', 'getPositionInstance', 'getToggleInstance', 'autoWidth'];
var resizePlacement = ['topStart', 'topEnd', 'leftEnd', 'rightEnd', 'auto', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontalEnd'];
var PickerPopup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-popup' : _props$classPrefix,
    autoWidth = props.autoWidth,
    className = props.className,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    target = props.target,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var overlayRef = (0, _react.useRef)(null);
  var handleResize = (0, _hooks.useEventCallback)(function () {
    var instance = target === null || target === void 0 ? void 0 : target.current;
    if (instance && resizePlacement.includes(placement)) {
      instance.updatePosition();
    }
  });
  (0, _hooks.useElementResize)((0, _react.useCallback)(function () {
    return overlayRef.current;
  }, []), handleResize);
  (0, _react.useEffect)(function () {
    var toggle = target === null || target === void 0 ? void 0 : target.current;
    if (autoWidth && toggle !== null && toggle !== void 0 && toggle.root) {
      // Get the width value of the button,
      // and then set it to the menu to make their width consistent.
      var width = (0, _getWidth.default)((0, _utils.getDOMNode)(toggle.root));
      if (overlayRef.current) {
        (0, _addStyle.default)(overlayRef.current, 'min-width', width + "px");
      }
    }
  }, [autoWidth, target, overlayRef]);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    "data-testid": "picker-popup"
  }, (0, _omit.default)(rest, omitProps), {
    ref: (0, _utils.mergeRefs)(overlayRef, ref),
    className: classes
  }));
});
PickerPopup.displayName = 'PickerPopup';
var _default = exports.default = PickerPopup;