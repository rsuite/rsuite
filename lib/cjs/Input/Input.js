'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _FormGroup = require("../FormGroup");
var _InputGroup = require("../InputGroup/InputGroup");
var _Plaintext = _interopRequireDefault(require("../internals/Plaintext"));
var _constants = require("../internals/constants");
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["className", "classPrefix", "as", "type", "disabled", "value", "defaultValue", "inputRef", "id", "size", "htmlSize", "plaintext", "placeholder", "readOnly", "onPressEnter", "onFocus", "onBlur", "onKeyDown", "onChange"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * The `<Input>` component is used to get user input in a text field.
 *
 * @see https://rsuitejs.com/components/input
 */
var Input = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Input', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'input' : _propsWithDefaults$cl,
    _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'input' : _propsWithDefaults$as,
    _propsWithDefaults$ty = propsWithDefaults.type,
    type = _propsWithDefaults$ty === void 0 ? 'text' : _propsWithDefaults$ty,
    disabled = propsWithDefaults.disabled,
    value = propsWithDefaults.value,
    defaultValue = propsWithDefaults.defaultValue,
    inputRef = propsWithDefaults.inputRef,
    id = propsWithDefaults.id,
    size = propsWithDefaults.size,
    htmlSize = propsWithDefaults.htmlSize,
    plaintext = propsWithDefaults.plaintext,
    placeholder = propsWithDefaults.placeholder,
    readOnly = propsWithDefaults.readOnly,
    onPressEnter = propsWithDefaults.onPressEnter,
    onFocus = propsWithDefaults.onFocus,
    onBlur = propsWithDefaults.onBlur,
    onKeyDown = propsWithDefaults.onKeyDown,
    onChange = propsWithDefaults.onChange,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === _constants.KEY_VALUES.ENTER) {
      onPressEnter === null || onPressEnter === void 0 || onPressEnter(event);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  };
  var handleChange = function handleChange(event) {
    var _event$target;
    onChange === null || onChange === void 0 || onChange((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value, event);
  };
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, {
    plaintext: plaintext
  }));
  var inputGroupContext = (0, _react.useContext)(_InputGroup.InputGroupContext);
  var _useFormGroup = (0, _FormGroup.useFormGroup)(),
    controlId = _useFormGroup.controlId;

  // Make the Input component display in plain text,
  // and display default characters when there is no value.
  if (plaintext) {
    return /*#__PURE__*/_react.default.createElement(_Plaintext.default, {
      ref: ref,
      localeKey: "unfilled",
      placeholder: placeholder
    }, typeof value === 'undefined' ? defaultValue : value);
  }
  var inputable = !disabled && !readOnly;
  var eventProps = {};
  if (inputable) {
    eventProps.onChange = handleChange;
    eventProps.onKeyDown = handleKeyDown;
    eventProps.onFocus = (0, _utils.createChainedFunction)(onFocus, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onFocus);
    eventProps.onBlur = (0, _utils.createChainedFunction)(onBlur, inputGroupContext === null || inputGroupContext === void 0 ? void 0 : inputGroupContext.onBlur);
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, eventProps, {
    ref: (0, _utils.mergeRefs)(ref, inputRef),
    className: classes,
    type: type,
    id: id || controlId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    readOnly: readOnly,
    size: htmlSize,
    placeholder: placeholder
  }));
});
Input.displayName = 'Input';
Input.propTypes = {
  type: _propTypes.default.string,
  as: _propTypes.default.elementType,
  id: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  inputRef: _propTypes2.refType,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onPressEnter: _propTypes.default.func
};
var _default = exports.default = Input;