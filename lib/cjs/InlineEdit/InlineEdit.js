'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _EditableControls = _interopRequireDefault(require("./EditableControls"));
var _useFocusEvent2 = _interopRequireDefault(require("./useFocusEvent"));
var _useEditState2 = _interopRequireDefault(require("./useEditState"));
var _renderChildren = require("./renderChildren");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "children", "classPrefix", "className", "disabled", "size", "showControls", "stateOnBlur", "placeholder"];
var InlineEdit = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('InlineEdit', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ch = propsWithDefaults.children,
    children = _propsWithDefaults$ch === void 0 ? _renderChildren.defaultRenderInput : _propsWithDefaults$ch,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'inline-edit' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    disabled = propsWithDefaults.disabled,
    size = propsWithDefaults.size,
    _propsWithDefaults$sh = propsWithDefaults.showControls,
    showControls = _propsWithDefaults$sh === void 0 ? true : _propsWithDefaults$sh,
    _propsWithDefaults$st = propsWithDefaults.stateOnBlur,
    stateOnBlur = _propsWithDefaults$st === void 0 ? 'save' : _propsWithDefaults$st,
    placeholder = propsWithDefaults.placeholder,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix;
  var _useEditState = (0, _useEditState2.default)((0, _extends2.default)({}, rest, {
      disabled: disabled
    })),
    value = _useEditState.value,
    isEditing = _useEditState.isEditing,
    onSave = _useEditState.onSave,
    onCancel = _useEditState.onCancel,
    onChange = _useEditState.onChange,
    onKeyDown = _useEditState.onKeyDown,
    onClick = _useEditState.onClick,
    onFocus = _useEditState.onFocus,
    htmlProps = _useEditState.htmlProps;
  var _useFocusEvent = (0, _useFocusEvent2.default)({
      isEditing: isEditing,
      stateOnBlur: stateOnBlur,
      onSave: onSave,
      onCancel: onCancel
    }),
    target = _useFocusEvent.target,
    root = _useFocusEvent.root,
    onBlur = _useFocusEvent.onBlur;
  var childrenProps = {
    size: size,
    value: value,
    disabled: disabled,
    placeholder: placeholder,
    plaintext: !isEditing,
    onChange: onChange,
    onBlur: onBlur
  };
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    ref: (0, _utils.mergeRefs)(root, ref),
    tabIndex: 0,
    className: merge(className, withClassPrefix(size, {
      disabled: disabled
    })),
    onClick: onClick,
    onKeyDown: onKeyDown,
    onFocus: onFocus
  }, htmlProps), (0, _renderChildren.renderChildren)(children, childrenProps, target), showControls && isEditing && /*#__PURE__*/_react.default.createElement(_EditableControls.default, {
    className: prefix('controls'),
    onSave: onSave,
    onCancel: onCancel
  }));
});
InlineEdit.displayName = 'InlineEdit';
InlineEdit.propTypes = {
  children: _propTypes.default.any,
  classPrefix: _propTypes.default.string,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  defaultValue: _propTypes.default.any,
  value: _propTypes.default.any,
  showControls: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  stateOnBlur: (0, _propTypes2.oneOf)(['save', 'cancel']),
  onChange: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onSave: _propTypes.default.func,
  onEdit: _propTypes.default.func
};
var _default = exports.default = InlineEdit;