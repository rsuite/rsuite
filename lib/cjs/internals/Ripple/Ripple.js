'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _getOffset = _interopRequireDefault(require("dom-lib/getOffset"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _Transition = _interopRequireDefault(require("../../Animation/Transition"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["as", "className", "classPrefix", "onMouseDown"],
  _excluded2 = ["className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var getPosition = function getPosition(target, event) {
  var offset = (0, _getOffset.default)(target);
  var offsetX = (event.pageX || 0) - offset.left;
  var offsetY = (event.pageY || 0) - offset.top;
  var radiusX = Math.max(offset.width - offsetX, offsetX);
  var radiusY = Math.max(offset.height - offsetY, offsetY);
  var radius = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
  return {
    width: radius * 2,
    height: radius * 2,
    left: offsetX - radius,
    top: offsetY - radius
  };
};

/**
 * The `Ripple` component is used to implement the ripple effect.
 * @private
 */
var Ripple = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)(),
    disableRipple = _useCustom.disableRipple;
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'span' : _props$as,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'ripple' : _props$classPrefix,
    onMouseDown = props.onMouseDown,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, prefix('pond'));
  var triggerRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    rippling = _useState[0],
    setRippling = _useState[1];
  var _useState2 = (0, _react.useState)(),
    position = _useState2[0],
    setPosition = _useState2[1];
  var handleRippled = function handleRippled() {
    setRippling(false);
  };
  var handleMouseDown = (0, _react.useCallback)(function (event) {
    if (triggerRef.current) {
      var _position = getPosition(triggerRef.current, event);
      setRippling(true);
      setPosition(_position);
      onMouseDown === null || onMouseDown === void 0 || onMouseDown(_position, event);
    }
  }, [onMouseDown]);
  (0, _react.useEffect)(function () {
    var _triggerRef$current;
    var parentNode = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.parentNode;
    if (parentNode) {
      var mousedownListener = (0, _on.default)(parentNode, 'mousedown', handleMouseDown);
      return function () {
        mousedownListener === null || mousedownListener === void 0 || mousedownListener.off();
      };
    }
  }, [handleMouseDown]);
  if (disableRipple) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: (0, _utils.mergeRefs)(triggerRef, ref)
  }), /*#__PURE__*/_react.default.createElement(_Transition.default, {
    in: rippling,
    enteringClassName: prefix('rippling'),
    onEntered: handleRippled
  }, function (props, ref) {
    var className = props.className,
      transitionRest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded2);
    return /*#__PURE__*/_react.default.createElement("span", (0, _extends2.default)({}, transitionRest, {
      ref: ref,
      className: merge(withClassPrefix(), className),
      style: position
    }));
  }));
});
Ripple.displayName = 'Ripple';
Ripple.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  onMouseDown: _propTypes.default.func
};
var _default = exports.default = Ripple;