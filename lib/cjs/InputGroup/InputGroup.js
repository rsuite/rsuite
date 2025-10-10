'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = exports.InputGroupContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InputGroupAddon = _interopRequireDefault(require("./InputGroupAddon"));
var _InputGroupButton = _interopRequireDefault(require("./InputGroupButton"));
var _hooks = require("../internals/hooks");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "disabled", "inside", "size", "children"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var InputGroupContext = exports.InputGroupContext = /*#__PURE__*/_react.default.createContext(null);
/**
 * The `InputGroup` component is used to specify an input field with an add-on.
 * @see https://rsuitejs.com/components/input/#input-group
 */
var InputGroup = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('InputGroup', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'input-group' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    disabled = propsWithDefaults.disabled,
    inside = propsWithDefaults.inside,
    size = propsWithDefaults.size,
    children = propsWithDefaults.children,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useState = (0, _react.useState)(false),
    focus = _useState[0],
    setFocus = _useState[1];
  var handleFocus = (0, _react.useCallback)(function () {
    setFocus(true);
  }, []);
  var handleBlur = (0, _react.useCallback)(function () {
    setFocus(false);
  }, []);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    inside: inside,
    focus: focus,
    disabled: disabled
  }));
  var renderChildren = (0, _react.useCallback)(function () {
    return _react.default.Children.map(children, function (item) {
      if (/*#__PURE__*/_react.default.isValidElement(item)) {
        if (/*#__PURE__*/_react.default.isValidElement(item)) {
          // Fix: Add type assertion to pass the disabled prop to the child element
          return disabled ? /*#__PURE__*/_react.default.cloneElement(item, {
            disabled: disabled
          }) : item;
        }
      }
      return item;
    });
  }, [children, disabled]);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      onFocus: handleFocus,
      onBlur: handleBlur
    };
  }, [handleFocus, handleBlur]);
  return /*#__PURE__*/_react.default.createElement(InputGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), renderChildren()));
});
InputGroup.displayName = 'InputGroup';
InputGroup.propTypes = {
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  inside: _propTypes.default.bool,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs'])
};
InputGroup.Addon = _InputGroupAddon.default;
InputGroup.Button = _InputGroupButton.default;
var _default = exports.default = InputGroup;