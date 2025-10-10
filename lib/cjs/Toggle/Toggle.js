'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "disabled", "readOnly", "loading", "plaintext", "children", "className", "color", "checkedChildren", "unCheckedChildren", "classPrefix", "checked", "defaultChecked", "size", "locale", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Toggle` component is used to activate or deactivate an element.
 *
 * @see https://rsuitejs.com/components/toggle
 */
var Toggle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Toggle', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'span' : _propsWithDefaults$as,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    _propsWithDefaults$lo = propsWithDefaults.loading,
    loading = _propsWithDefaults$lo === void 0 ? false : _propsWithDefaults$lo,
    plaintext = propsWithDefaults.plaintext,
    children = propsWithDefaults.children,
    className = propsWithDefaults.className,
    color = propsWithDefaults.color,
    checkedChildren = propsWithDefaults.checkedChildren,
    unCheckedChildren = propsWithDefaults.unCheckedChildren,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'toggle' : _propsWithDefaults$cl,
    checkedProp = propsWithDefaults.checked,
    defaultChecked = propsWithDefaults.defaultChecked,
    size = propsWithDefaults.size,
    locale = propsWithDefaults.locale,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var inputRef = (0, _react.useRef)(null);
  var _useControlled = (0, _hooks.useControlled)(checkedProp, defaultChecked),
    checked = _useControlled[0],
    setChecked = _useControlled[1];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(size, color, {
    checked: checked,
    disabled: disabled,
    loading: loading
  }));
  var inner = checked ? checkedChildren : unCheckedChildren;
  var label = checked ? locale === null || locale === void 0 ? void 0 : locale.on : locale === null || locale === void 0 ? void 0 : locale.off;
  var labelId = (0, _hooks.useUniqueId)('rs-label');
  var innerId = inner ? labelId + '-inner' : undefined;
  var labelledby = children ? labelId : innerId;
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var handleInputChange = (0, _hooks.useEventCallback)(function (e) {
    if (disabled || readOnly || loading) {
      return;
    }
    var checked = e.target.checked;
    setChecked(checked);
    onChange === null || onChange === void 0 || onChange(checked, e);
  });
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, null, inner || label);
  }
  return /*#__PURE__*/_react.default.createElement("label", (0, _extends2.default)({
    ref: ref,
    className: classes
  }, restProps), /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({}, htmlInputProps, {
    ref: inputRef,
    type: "checkbox",
    checked: checkedProp,
    defaultChecked: defaultChecked,
    disabled: disabled,
    readOnly: readOnly,
    onChange: handleInputChange,
    className: prefix('input'),
    role: "switch",
    "aria-checked": checked,
    "aria-disabled": disabled,
    "aria-labelledby": labelledby,
    "aria-label": labelledby ? undefined : label,
    "aria-busy": loading || undefined
  })), /*#__PURE__*/_react.default.createElement(Component, {
    className: prefix('presentation')
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('inner'),
    id: innerId
  }, inner), loading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
    className: prefix('loader')
  })), children && /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('label'),
    id: labelId
  }, children));
});
Toggle.displayName = 'Toggle';
Toggle.propTypes = {
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  plaintext: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  checkedChildren: _propTypes.default.node,
  unCheckedChildren: _propTypes.default.node,
  loading: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func,
  as: _propTypes.default.elementType,
  size: (0, _propTypes2.oneOf)(['sm', 'md', 'lg']),
  locale: _propTypes.default.shape({
    on: _propTypes.default.string,
    off: _propTypes.default.string
  })
};
var _default = exports.default = Toggle;