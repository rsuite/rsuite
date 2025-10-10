'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.RadioTileContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Stack = _interopRequireDefault(require("../Stack"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "className", "inline", "children", "classPrefix", "disabled", "value", "defaultValue", "name", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var RadioTileContext = exports.RadioTileContext = /*#__PURE__*/_react.default.createContext({});

/**
 * The `RadioTileGroup` component is used to group a collection of `RadioTile` components.
 * @version 5.35.0
 * @see https://rsuitejs.com/components/radio-tile/
 */
var RadioTileGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('RadioTileGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? _Stack.default : _propsWithDefaults$as,
    className = propsWithDefaults.className,
    inline = propsWithDefaults.inline,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'radio-tile-group' : _propsWithDefaults$cl,
    disabled = propsWithDefaults.disabled,
    valueProp = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    name = propsWithDefaults.name,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix());
  var _useControlled = (0, _hooks.useControlled)(valueProp, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var handleChange = (0, _react.useCallback)(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
  }, [onChange, setValue]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      name: name,
      disabled: disabled,
      value: typeof value === 'undefined' ? null : value,
      onChange: handleChange
    };
  }, [disabled, handleChange, name, value]);
  return /*#__PURE__*/_react.default.createElement(RadioTileContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    alignItems: "stretch",
    spacing: 10
  }, rest, {
    role: "radiogroup",
    childrenRenderMode: "clone",
    direction: inline ? 'row' : 'column',
    ref: ref,
    className: classes
  }), children));
});
RadioTileGroup.displayName = 'RadioTileGroup';
RadioTileGroup.propTypes = {
  name: _propTypes.default.string,
  inline: _propTypes.default.bool,
  value: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  onChange: _propTypes.default.func
};
var _default = exports.default = RadioTileGroup;