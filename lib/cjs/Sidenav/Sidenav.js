'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.SidenavContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _remove = _interopRequireDefault(require("lodash/remove"));
var _Transition = _interopRequireDefault(require("../Animation/Transition"));
var _SidenavBody = _interopRequireDefault(require("./SidenavBody"));
var _SidenavHeader = _interopRequireDefault(require("./SidenavHeader"));
var _SidenavToggle = _interopRequireDefault(require("./SidenavToggle"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _excluded = ["as", "className", "classPrefix", "appearance", "expanded", "activeKey", "defaultOpenKeys", "openKeys", "onSelect", "onOpenChange"],
  _excluded2 = ["className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var SidenavContext = exports.SidenavContext = /*#__PURE__*/_react.default.createContext(null);
var emptyArray = [];

/**
 * The `Sidenav` component is an encapsulation of the page sidebar `Nav`.
 * @see https://rsuitejs.com/components/sidenav/
 */
var Sidenav = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Sidenav', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'nav' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'sidenav' : _propsWithDefaults$cl,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$ex = propsWithDefaults.expanded,
    expanded = _propsWithDefaults$ex === void 0 ? true : _propsWithDefaults$ex,
    activeKey = propsWithDefaults.activeKey,
    _propsWithDefaults$de = propsWithDefaults.defaultOpenKeys,
    defaultOpenKeys = _propsWithDefaults$de === void 0 ? emptyArray : _propsWithDefaults$de,
    openKeysProp = propsWithDefaults.openKeys,
    onSelect = propsWithDefaults.onSelect,
    onOpenChange = propsWithDefaults.onOpenChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(openKeysProp, defaultOpenKeys),
    openKeys = _useControlled[0],
    setOpenKeys = _useControlled[1];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance));
  var handleOpenChange = (0, _react.useCallback)(function (eventKey, event) {
    var find = function find(key) {
      return (0, _utils.shallowEqual)(key, eventKey);
    };
    var nextOpenKeys = [].concat(openKeys);
    if (nextOpenKeys.some(find)) {
      (0, _remove.default)(nextOpenKeys, find);
    } else {
      nextOpenKeys.push(eventKey);
    }
    setOpenKeys(nextOpenKeys);
    onOpenChange === null || onOpenChange === void 0 || onOpenChange(nextOpenKeys, event);
  }, [onOpenChange, openKeys, setOpenKeys]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      expanded: expanded,
      activeKey: activeKey,
      sidenav: true,
      openKeys: openKeys !== null && openKeys !== void 0 ? openKeys : [],
      onOpenChange: handleOpenChange,
      onSelect: onSelect
    };
  }, [activeKey, expanded, handleOpenChange, onSelect, openKeys]);
  return /*#__PURE__*/_react.default.createElement(SidenavContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(_Transition.default, {
    in: expanded,
    timeout: 300,
    exitedClassName: prefix('collapse-out'),
    exitingClassName: prefix('collapse-out', 'collapsing'),
    enteredClassName: prefix('collapse-in'),
    enteringClassName: prefix('collapse-in', 'collapsing')
  }, function (transitionProps, transitionRef) {
    var className = transitionProps.className,
      transitionRest = (0, _objectWithoutPropertiesLoose2.default)(transitionProps, _excluded2);
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, transitionRest, {
      ref: (0, _utils.mergeRefs)(ref, transitionRef),
      className: merge(classes, className)
    }));
  }));
});
Sidenav.Header = _SidenavHeader.default;
Sidenav.Body = _SidenavBody.default;
Sidenav.Toggle = _SidenavToggle.default;
Sidenav.displayName = 'Sidenav';
Sidenav.propTypes = {
  as: _propTypes.default.elementType,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  expanded: _propTypes.default.bool,
  appearance: (0, _propTypes2.oneOf)(['default', 'inverse', 'subtle']),
  defaultOpenKeys: _propTypes.default.array,
  openKeys: _propTypes.default.array,
  onOpenChange: _propTypes.default.func,
  activeKey: (0, _propTypes2.deprecatePropType)(_propTypes.default.any, 'Use `activeKey` on <Nav> component instead'),
  onSelect: (0, _propTypes2.deprecatePropType)(_propTypes.default.func, 'Use `onSelect` on <Nav> component instead')
};
var _default = exports.default = Sidenav;