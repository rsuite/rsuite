'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));
var _remove = _interopRequireDefault(require("lodash/remove"));
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _CheckboxGroupContext = require("./CheckboxGroupContext");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "inline", "children", "name", "value", "defaultValue", "classPrefix", "disabled", "readOnly", "plaintext", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `CheckboxGroup` component is used for selecting multiple options which are unrelated.
 * @see https://rsuitejs.com/components/checkbox/#checkbox-group
 */
var CheckboxGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('CheckboxGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    name = propsWithDefaults.name,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'checkbox-group' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    readOnly = propsWithDefaults.readOnly,
    plaintext = propsWithDefaults.plaintext,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    inline: inline
  }));
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  var handleChange = (0, _react.useCallback)(function (itemValue, itemChecked, event) {
    var nextValue = (0, _cloneDeep.default)(value) || [];
    if (itemChecked) {
      nextValue.push(itemValue);
    } else {
      (0, _remove.default)(nextValue, function (i) {
        return (0, _utils.shallowEqual)(i, itemValue);
      });
    }
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  }, [onChange, setValue, value]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      inline: inline,
      name: name,
      value: value,
      readOnly: readOnly,
      disabled: disabled,
      plaintext: plaintext,
      controlled: isControlled,
      onChange: handleChange
    };
  }, [disabled, handleChange, inline, isControlled, name, plaintext, readOnly, value]);
  return /*#__PURE__*/_react.default.createElement(_CheckboxGroupContext.CheckboxGroupContext.Provider, {
    value: contextValue
  }, plaintext ? /*#__PURE__*/_react.default.createElement(_Plaintext.default, (0, _extends2.default)({
    ref: ref,
    localeKey: "notSelected"
  }, rest), value !== null && value !== void 0 && value.length ? children : null) : /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    role: "group",
    className: classes
  }), children));
});
CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxGroup.propTypes = {
  as: _propTypes.default.elementType,
  name: _propTypes.default.string,
  className: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.array,
  defaultValue: _propTypes.default.array,
  onChange: _propTypes.default.func,
  children: _propTypes.default.array,
  classPrefix: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  plaintext: _propTypes.default.bool
};
var _default = exports.default = CheckboxGroup;