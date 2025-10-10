'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _HelpOutline = _interopRequireDefault(require("@rsuite/icons/HelpOutline"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _Whisper = _interopRequireDefault(require("../Whisper"));
var _hooks = require("../internals/hooks");
var _FormGroup = require("../FormGroup");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "tooltip", "children", "id"];
/**
 * The `<Form.HelpText>` component is used to display help information in the form.
 * @see https://rsuitejs.com/components/form/
 */
var FormHelpText = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useFormGroup = (0, _FormGroup.useFormGroup)(),
    helpTextId = _useFormGroup.helpTextId;
  var _useCustom = (0, _CustomProvider.useCustom)('FormHelpText', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'span' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-help-text' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    tooltip = propsWithDefaults.tooltip,
    children = propsWithDefaults.children,
    _propsWithDefaults$id = propsWithDefaults.id,
    id = _propsWithDefaults$id === void 0 ? helpTextId : _propsWithDefaults$id,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix({
    tooltip: tooltip
  }));
  if (tooltip) {
    return /*#__PURE__*/_react.default.createElement(_Whisper.default, {
      ref: ref,
      placement: "topEnd",
      speaker: /*#__PURE__*/_react.default.createElement(_Tooltip.default, (0, _extends2.default)({
        id: id
      }, rest), children)
    }, /*#__PURE__*/_react.default.createElement(Component, {
      role: "img",
      "aria-label": "help",
      className: classes
    }, /*#__PURE__*/_react.default.createElement(_HelpOutline.default, {
      "aria-hidden": true
    })));
  }
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    id: id
  }, rest, {
    ref: ref,
    className: classes
  }), children);
});
FormHelpText.displayName = 'FormHelpText';
FormHelpText.propTypes = {
  className: _propTypes.default.string,
  tooltip: _propTypes.default.bool,
  children: _propTypes.default.node,
  classPrefix: _propTypes.default.string
};
var _default = exports.default = FormHelpText;