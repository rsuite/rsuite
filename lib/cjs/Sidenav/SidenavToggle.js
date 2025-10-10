'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _PagePrevious = _interopRequireDefault(require("@rsuite/icons/PagePrevious"));
var _PageNext = _interopRequireDefault(require("@rsuite/icons/PageNext"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _Sidenav = require("./Sidenav");
var _excluded = ["as", "expanded", "className", "classPrefix", "onToggle"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var SidenavToggle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sidenav = (0, _react.useContext)(_Sidenav.SidenavContext);
  if (!sidenav) {
    throw new Error('<Sidenav.Toggle> must be rendered within a <Sidenav>');
  }
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    DEPRECATED_expanded = props.expanded,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'sidenav-toggle' : _props$classPrefix,
    onToggle = props.onToggle,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  // if `expanded` prop is provided, it takes priority
  var expanded = DEPRECATED_expanded !== null && DEPRECATED_expanded !== void 0 ? DEPRECATED_expanded : sidenav.expanded;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix({
    collapsed: !expanded
  }));
  var Icon = expanded ? _PagePrevious.default : _PageNext.default;
  var handleToggle = function handleToggle(event) {
    onToggle === null || onToggle === void 0 || onToggle(!expanded, event);
  };
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    icon: /*#__PURE__*/_react.default.createElement(Icon, null),
    className: prefix('button'),
    onClick: handleToggle,
    "aria-label": expanded ? 'Collapse' : 'Expand'
  }));
});
SidenavToggle.displayName = 'Sidenav.Toggle';
SidenavToggle.propTypes = {
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  expanded: (0, _propTypes2.deprecatePropType)(_propTypes.default.bool, 'Use <Sidenav expanded> instead.'),
  onToggle: _propTypes.default.func
};
var _default = exports.default = SidenavToggle;