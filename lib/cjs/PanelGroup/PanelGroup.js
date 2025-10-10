'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.PanelGroupContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "accordion", "defaultActiveKey", "bordered", "className", "classPrefix", "children", "activeKey", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PanelGroupContext = exports.PanelGroupContext = /*#__PURE__*/_react.default.createContext({});

/**
 * The `PanelGroup` component is used to display content that can be collapsed.
 * @see https://rsuitejs.com/components/panel
 */
var PanelGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('PanelGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    accordion = propsWithDefaults.accordion,
    defaultActiveKey = propsWithDefaults.defaultActiveKey,
    bordered = propsWithDefaults.bordered,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'panel-group' : _propsWithDefaults$cl,
    children = propsWithDefaults.children,
    activeProp = propsWithDefaults.activeKey,
    onSelect = propsWithDefaults.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var _useControlled = (0, _hooks.useControlled)(activeProp, defaultActiveKey),
    activeKey = _useControlled[0],
    setActiveKey = _useControlled[1];
  var classes = merge(className, withClassPrefix({
    accordion: accordion,
    bordered: bordered
  }));
  var handleSelect = (0, _hooks.useEventCallback)(function (activeKey, event) {
    setActiveKey(activeKey);
    onSelect === null || onSelect === void 0 || onSelect(activeKey, event);
  });
  var contextValue = (0, _react.useMemo)(function () {
    return {
      accordion: accordion,
      activeKey: activeKey,
      onGroupSelect: handleSelect
    };
  }, [accordion, activeKey, handleSelect]);
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(PanelGroupContext.Provider, {
    value: contextValue
  }, children));
});
PanelGroup.displayName = 'PanelGroup';
PanelGroup.propTypes = {
  accordion: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  bordered: _propTypes.default.bool,
  defaultActiveKey: _propTypes.default.any,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  onSelect: _propTypes.default.func
};
var _default = exports.default = PanelGroup;