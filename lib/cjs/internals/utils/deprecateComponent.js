'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.deprecateComponent = deprecateComponent;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _warnOnce = _interopRequireDefault(require("./warnOnce"));
/**
 * HOC for display a deprecation message from a deprecated component
 * fixme: Only display deprecation message in non-production environment
 */
function deprecateComponent(Component, message) {
  var _Component$displayNam;
  var componentDisplayName = (_Component$displayNam = Component.displayName) !== null && _Component$displayNam !== void 0 ? _Component$displayNam : Component.name;
  var Deprecated = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
    (0, _warnOnce.default)(message);
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
      ref: ref
    }, props));
  });
  Deprecated.displayName = "deprecated(" + componentDisplayName + ")";
  return Deprecated;
}
var _default = exports.default = deprecateComponent;