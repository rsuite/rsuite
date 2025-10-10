'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.RadioContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "inline", "children", "classPrefix", "value", "defaultValue", "appearance", "name", "plaintext", "disabled", "readOnly", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var RadioContext = exports.RadioContext = /*#__PURE__*/_react.default.createContext(void 0);

/**
 * The `RadioGroup` component is used to group a collection of `Radio` components.
 * @see https://rsuitejs.com/components/radio/#radio-group
 */
var RadioGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('RadioGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-group' : _propsWithDefaults$cl,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    name = propsWithDefaults.name,
    plaintext = propsWithDefaults.plaintext,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(appearance, {
    inline: inline
  }));
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var handleChange = (0, _hooks.useEventCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue !== null && nextValue !== void 0 ? nextValue : '', event);
  });
  var contextValue = (0, _react.useMemo)(function () {
    return {
      inline: inline,
      name: name,
      value: typeof value === 'undefined' ? null : value,
      controlled: isControlled,
      plaintext: plaintext,
      disabled: disabled,
      readOnly: readOnly,
      onChange: handleChange
    };
  }, [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]);
  return /*#__PURE__*/_react.default.createElement(RadioContext.Provider, {
    value: contextValue
  }, plaintext ? /*#__PURE__*/_react.default.createElement(_Plaintext.default, (0, _extends2.default)({
    ref: ref,
    localeKey: "notSelected"
  }, rest), value ? children : null) : /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "radiogroup"
  }, rest, {
    ref: ref,
    className: classes
  }), children));
});
RadioGroup.displayName = 'RadioGroup';
RadioGroup.propTypes = {
  appearance: (0, _propTypes2.oneOf)(['default', 'picker']),
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func,
  plaintext: _propTypes.default.bool
};
var _default = exports.default = RadioGroup;