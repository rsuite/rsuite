'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _Plaintext = _interopRequireDefault(require("../Plaintext"));
var _Stack = _interopRequireDefault(require("../../Stack"));
var _PickerIndicator = _interopRequireDefault(require("./PickerIndicator"));
var _PickerLabel = _interopRequireDefault(require("./PickerLabel"));
var _useCombobox2 = _interopRequireDefault(require("./hooks/useCombobox"));
var _templateObject;
var _excluded = ["active", "as", "classPrefix", "children", "caret", "className", "disabled", "readOnly", "plaintext", "hasValue", "loading", "cleanable", "tabIndex", "inputValue", "focusItemValue", "onClean", "placement", "caretComponent", "caretAs", "label", "name"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var PickerToggle = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var active = props.active,
    _props$as = props.as,
    Component = _props$as === void 0 ? _ToggleButton.default : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'picker-toggle' : _props$classPrefix,
    children = props.children,
    _props$caret = props.caret,
    caret = _props$caret === void 0 ? true : _props$caret,
    className = props.className,
    disabled = props.disabled,
    readOnly = props.readOnly,
    plaintext = props.plaintext,
    hasValue = props.hasValue,
    _props$loading = props.loading,
    loading = _props$loading === void 0 ? false : _props$loading,
    cleanable = props.cleanable,
    _props$tabIndex = props.tabIndex,
    tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex,
    inputValueProp = props.inputValue,
    focusItemValue = props.focusItemValue,
    onClean = props.onClean,
    _props$placement = props.placement,
    placement = _props$placement === void 0 ? 'bottomStart' : _props$placement,
    caretComponent = props.caretComponent,
    _props$caretAs = props.caretAs,
    caretAs = _props$caretAs === void 0 ? caretComponent : _props$caretAs,
    label = props.label,
    name = props.name,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var combobox = (0, _react.useRef)(null);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useCombobox = (0, _useCombobox2.default)(),
    id = _useCombobox.id,
    labelId = _useCombobox.labelId,
    popupType = _useCombobox.popupType;
  var inputValue = (0, _react.useMemo)(function () {
    if (typeof inputValueProp === 'number' || typeof inputValueProp === 'string') {
      return inputValueProp;
    } else if (Array.isArray(inputValueProp)) {
      return inputValueProp.join(',');
    }
    return '';
  }, [inputValueProp]);
  var classes = merge(className, withClassPrefix({
    active: active
  }));
  var handleClean = (0, _hooks.useEventCallback)(function (event) {
    var _combobox$current;
    event.stopPropagation();
    onClean === null || onClean === void 0 || onClean(event);
    (_combobox$current = combobox.current) === null || _combobox$current === void 0 || _combobox$current.focus();
  });
  var ToggleCaret = (0, _hooks.useToggleCaret)(placement);
  var Caret = caretAs !== null && caretAs !== void 0 ? caretAs : ToggleCaret;
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      ref: ref,
      localeKey: "notSelected"
    }, hasValue ? children : null);
  }
  var showCleanButton = cleanable && hasValue && !readOnly;
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "combobox",
    id: id,
    "aria-haspopup": popupType,
    "aria-expanded": active,
    "aria-disabled": disabled,
    "aria-controls": id + "-" + popupType,
    "aria-labelledby": labelId,
    "aria-describedby": id + "-describe",
    "aria-activedescendant": active && focusItemValue ? id + "-opt-" + focusItemValue : undefined
  }, rest, {
    ref: (0, _utils.mergeRefs)(combobox, ref),
    disabled: disabled,
    tabIndex: disabled ? undefined : tabIndex,
    className: classes
  }), /*#__PURE__*/_react.default.createElement(_Stack.default, null, label && /*#__PURE__*/_react.default.createElement(_Stack.default.Item, null, /*#__PURE__*/_react.default.createElement(_PickerLabel.default, {
    as: "span",
    className: prefix('label'),
    id: labelId
  }, label)), /*#__PURE__*/_react.default.createElement(_Stack.default.Item, {
    grow: 1,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_react.default.createElement("input", {
    readOnly: true,
    "aria-hidden": true,
    tabIndex: -1,
    "data-testid": "picker-toggle-input",
    name: name,
    value: inputValue,
    className: prefix('textbox', 'read-only'),
    style: {
      pointerEvents: 'none'
    }
  }), children ? /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(hasValue ? 'value' : 'placeholder'),
    id: id + "-describe",
    "data-testid": "picker-describe"
  }, children) : null), /*#__PURE__*/_react.default.createElement(_Stack.default.Item, {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["indicator"])))
  }, /*#__PURE__*/_react.default.createElement(_PickerIndicator.default, {
    as: _react.default.Fragment,
    loading: loading,
    caretAs: caret ? Caret : null,
    onClose: handleClean,
    showCleanButton: showCleanButton
  }))));
});
PickerToggle.displayName = 'PickerToggle';
var _default = exports.default = PickerToggle;