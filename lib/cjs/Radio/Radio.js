'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _RadioGroup = require("../RadioGroup/RadioGroup");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["as", "title", "className", "children", "checked", "color", "defaultChecked", "classPrefix", "tabIndex", "inputRef", "inputProps", "disabled", "readOnly", "plaintext", "inline", "name", "value", "onChange", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `Radio` component is a simple radio button.
 * @see https://rsuitejs.com/components/radio
 */
var Radio = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var radioContext = (0, _react.useContext)(_RadioGroup.RadioContext);
  var _useCustom = (0, _CustomProvider.useCustom)('Radio', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _ref = radioContext !== null && radioContext !== void 0 ? radioContext : {},
    groupValue = _ref.value,
    inlineContext = _ref.inline,
    nameContext = _ref.name,
    disabledContext = _ref.disabled,
    readOnlyContext = _ref.readOnly,
    plaintextContext = _ref.plaintext,
    onGroupChange = _ref.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    title = propsWithDefaults.title,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    checkedProp = propsWithDefaults.checked,
    color = propsWithDefaults.color,
    defaultChecked = propsWithDefaults.defaultChecked,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio' : _propsWithDefaults$cl,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
    inputRef = propsWithDefaults.inputRef,
    inputProps = propsWithDefaults.inputProps,
    _propsWithDefaults$di = propsWithDefaults.disabled,
    disabled = _propsWithDefaults$di === void 0 ? disabledContext : _propsWithDefaults$di,
    _propsWithDefaults$re = propsWithDefaults.readOnly,
    readOnly = _propsWithDefaults$re === void 0 ? readOnlyContext : _propsWithDefaults$re,
    _propsWithDefaults$pl = propsWithDefaults.plaintext,
    plaintext = _propsWithDefaults$pl === void 0 ? plaintextContext : _propsWithDefaults$pl,
    _propsWithDefaults$in = propsWithDefaults.inline,
    inline = _propsWithDefaults$in === void 0 ? inlineContext : _propsWithDefaults$in,
    _propsWithDefaults$na = propsWithDefaults.name,
    name = _propsWithDefaults$na === void 0 ? nameContext : _propsWithDefaults$na,
    value = propsWithDefaults.value,
    onChange = propsWithDefaults.onChange,
    onClick = propsWithDefaults.onClick,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(typeof groupValue !== 'undefined' ? groupValue === value : checkedProp, defaultChecked || false),
    checked = _useControlled[0],
    setChecked = _useControlled[1],
    selfControlled = _useControlled[2];
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var classes = merge(className, withClassPrefix(color, {
    inline: inline,
    disabled: disabled,
    checked: checked
  }));
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];
  var handleChange = (0, _hooks.useEventCallback)(function (event) {
    if (disabled || readOnly) {
      return;
    }
    setChecked(true);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, event);
    onChange === null || onChange === void 0 || onChange(value, true, event);
  });
  var controlled = radioContext ? true : selfControlled;
  if (typeof controlled !== 'undefined') {
    // In uncontrolled situations, use defaultChecked instead of checked
    htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
  }
  var labelId = (0, _hooks.useUniqueId)('label-');
  if (plaintext) {
    return checked ? /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, restProps, {
      ref: ref,
      className: classes
    }), children) : null;
  }
  var control = /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["control"])))
  }, /*#__PURE__*/_react.default.createElement("input", (0, _extends2.default)({}, htmlInputProps, inputProps, {
    "aria-labelledby": labelId,
    "aria-checked": checked,
    "aria-disabled": disabled,
    ref: inputRef,
    type: "radio",
    name: name,
    value: value,
    tabIndex: tabIndex,
    readOnly: readOnly,
    disabled: disabled,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["inner"]))),
    "aria-hidden": true
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: ref,
    onClick: onClick,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["checker"])))
  }, children ? /*#__PURE__*/_react.default.createElement("label", {
    title: title
  }, control, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteralLoose2.default)(["label"]))),
    id: labelId
  }, children)) : control));
});
Radio.displayName = 'Radio';
Radio.propTypes = {
  id: _propTypes.default.string,
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  inputProps: _propTypes.default.any,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  value: _propTypes.default.any,
  inputRef: _propTypes2.refType,
  onChange: _propTypes.default.func
};
var _default = exports.default = Radio;