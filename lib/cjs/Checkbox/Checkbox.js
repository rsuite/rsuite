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
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _CheckboxGroup = require("../CheckboxGroup");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["as", "checked", "className", "children", "classPrefix", "checkable", "color", "defaultChecked", "title", "inputRef", "inputProps", "indeterminate", "labelClickable", "tabIndex", "disabled", "readOnly", "plaintext", "inline", "name", "value", "onClick", "onCheckboxClick", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The Checkbox component is used for selecting multiple options from a set.
 * @see https://rsuitejs.com/components/checkbox
 */
var Checkbox = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Checkbox', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var checkboxGroupContext = (0, _react.useContext)(_CheckboxGroup.CheckboxGroupContext);
  var _ref = checkboxGroupContext !== null && checkboxGroupContext !== void 0 ? checkboxGroupContext : {},
    inlineContext = _ref.inline,
    nameContext = _ref.name,
    disabledContext = _ref.disabled,
    readOnlyContext = _ref.readOnly,
    plaintextContext = _ref.plaintext,
    onGroupChange = _ref.onChange;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    controlledChecked = propsWithDefaults.checked,
    className = propsWithDefaults.className,
    children = propsWithDefaults.children,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'checkbox' : _propsWithDefaults$cl,
    _propsWithDefaults$ch = propsWithDefaults.checkable,
    checkable = _propsWithDefaults$ch === void 0 ? true : _propsWithDefaults$ch,
    color = propsWithDefaults.color,
    _propsWithDefaults$de = propsWithDefaults.defaultChecked,
    defaultChecked = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    title = propsWithDefaults.title,
    inputRef = propsWithDefaults.inputRef,
    inputProps = propsWithDefaults.inputProps,
    indeterminate = propsWithDefaults.indeterminate,
    _propsWithDefaults$la = propsWithDefaults.labelClickable,
    labelClickable = _propsWithDefaults$la === void 0 ? true : _propsWithDefaults$la,
    _propsWithDefaults$ta = propsWithDefaults.tabIndex,
    tabIndex = _propsWithDefaults$ta === void 0 ? 0 : _propsWithDefaults$ta,
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
    onClick = propsWithDefaults.onClick,
    onCheckboxClick = propsWithDefaults.onCheckboxClick,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useControlled = (0, _hooks.useControlled)(controlledChecked, defaultChecked),
    selfChecked = _useControlled[0],
    setSelfChecked = _useControlled[1],
    selfControlled = _useControlled[2];

  // Either <Checkbox> is checked itself or by parent <CheckboxGroup>
  var checked = (0, _react.useMemo)(function () {
    var _checkboxGroupContext, _checkboxGroupContext2;
    if (!checkboxGroupContext) {
      return selfChecked;
    }

    // fixme value from group should not be nullable
    return (_checkboxGroupContext = (_checkboxGroupContext2 = checkboxGroupContext.value) === null || _checkboxGroupContext2 === void 0 ? void 0 : _checkboxGroupContext2.some(function (checkedValue) {
      return checkedValue === value;
    })) !== null && _checkboxGroupContext !== void 0 ? _checkboxGroupContext : false;
  }, [checkboxGroupContext, selfChecked, value]);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix(color, {
    inline: inline,
    indeterminate: indeterminate,
    disabled: disabled,
    checked: checked
  }));
  var _partitionHTMLProps = (0, _utils.partitionHTMLProps)(rest),
    htmlInputProps = _partitionHTMLProps[0],
    restProps = _partitionHTMLProps[1];

  // If <Checkbox> is within a <CheckboxGroup>, it's bound to be controlled
  // because its checked state is inferred from group's value, not retrieved from the DOM
  var controlled = checkboxGroupContext ? true : selfControlled;
  if (typeof controlled !== 'undefined') {
    // In uncontrolled situations, use defaultChecked instead of checked
    htmlInputProps[controlled ? 'checked' : 'defaultChecked'] = checked;
  }
  var checkboxRef = (0, _react.useRef)(null);
  var handleChange = (0, _hooks.useEventCallback)(function (event) {
    var nextChecked = event.target.checked;
    if (disabled || readOnly) {
      return;
    }
    setSelfChecked(nextChecked);
    onChange === null || onChange === void 0 || onChange(value, nextChecked, event);
    onGroupChange === null || onGroupChange === void 0 || onGroupChange(value, nextChecked, event);
  });
  var handleLabelClick = (0, _hooks.useEventCallback)(function (event) {
    // Prevent check when label is not clickable
    if (!labelClickable && event.target !== checkboxRef.current) {
      event.preventDefault();
    }
  });
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
    "aria-disabled": disabled,
    "aria-checked": indeterminate ? 'mixed' : checked,
    "aria-labelledby": labelId,
    name: name,
    value: value,
    type: "checkbox",
    ref: (0, _utils.mergeRefs)(checkboxRef, inputRef),
    tabIndex: tabIndex,
    readOnly: readOnly,
    disabled: disabled,
    onClick: onCheckboxClick,
    onChange: handleChange
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["inner"]))),
    "aria-hidden": true,
    "data-testid": "checkbox-control-inner"
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, restProps, {
    ref: ref,
    onClick: onClick,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: prefix(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteralLoose2.default)(["checker"])))
  }, /*#__PURE__*/_react.default.createElement("label", {
    title: title,
    onClick: handleLabelClick
  }, checkable ? control : null, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteralLoose2.default)(["label"]))),
    id: labelId
  }, children))));
});
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  as: _propTypes.default.elementType,
  checked: _propTypes.default.bool,
  checkable: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  inputProps: _propTypes.default.any,
  inputRef: _propTypes2.refType,
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onCheckboxClick: _propTypes.default.func
};
var _default = exports.default = Checkbox;