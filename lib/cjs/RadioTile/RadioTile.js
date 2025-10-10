'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Check = _interopRequireDefault(require("@rsuite/icons/Check"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _RadioTileGroup = require("../RadioTileGroup/RadioTileGroup");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("../internals/utils");
var _excluded = ["as", "children", "classPrefix", "checked", "className", "defaultChecked", "disabled", "icon", "value", "label", "name", "tabIndex", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * A series of selectable tile components that behave like Radio.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTile = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('RadioTile', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useContext = (0, _react.useContext)(_RadioTileGroup.RadioTileContext),
    groupValue = _useContext.value,
    nameContext = _useContext.name,
    disabledContext = _useContext.disabled,
    onGroupChange = _useContext.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? _Stack.default : _propsWithDefaults$as,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-tile' : _propsWithDefaults$cl,
    checkedProp = propsWithDefaults.checked,
    className = propsWithDefaults.className,
    defaultChecked = propsWithDefaults.defaultChecked,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? disabledContext : _propsWithDefaults$di,
    icon = propsWithDefaults.icon,
    value = propsWithDefaults.value,
    label = propsWithDefaults.label,
    _propsWithDefaults$na = propsWithDefaults.name,
    name = _propsWithDefaults$na === void 0 ? nameContext : _propsWithDefaults$na,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var handleChange = (0, _react.useCallback)(function (event) {
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, event);
    onChange === null || onChange === void 0 || onChange(value, event);
  }, [onChange, onGroupChange, setChecked, value]);
  var classes = merge(className, withClassPrefix({
    checked: checked,
    disabled: disabled
  }));
  var radioId = (0, _hooks.useUniqueId)('radio-');
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    spacing: 6
  }, restProps, {
    childrenRenderMode: "clone",
    ref: ref,
    className: classes,
    as: "label"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('icon')
  }, icon), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('body')
  }, /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    tabIndex: tabIndex,
    disabled: disabled,
    onChange: handleChange,
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": radioId + "-label",
    "aria-describedby": radioId + "-desc"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('label'),
    id: radioId + "-label"
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('content'),
    id: radioId + "-desc"
  }, children), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('mark')
  }, /*#__PURE__*/_react.default.createElement(_Check.default, {
    className: prefix('mark-icon')
  }))));
});
RadioTile.displayName = 'RadioTile';
RadioTile.propTypes = {
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  icon: _propTypes.default.node,
  label: _propTypes.default.node,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func
};
var _default = exports.default = RadioTile;