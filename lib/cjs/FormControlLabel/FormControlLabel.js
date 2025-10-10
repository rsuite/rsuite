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
var _FormGroup = require("../FormGroup");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "htmlFor", "className", "id"];
/**
 * The `<Form.ControlLabel>` component renders a label with required indicator, for form controls.
 * @see https://rsuitejs.com/components/form/
 */
var FormControlLabel = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('FormControlLabel', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _useFormGroup = (0, _FormGroup.useFormGroup)(),
    labelId = _useFormGroup.labelId,
    controlId = _useFormGroup.controlId;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'label' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-control-label' : _propsWithDefaults$cl,
    _propsWithDefaults$ht = propsWithDefaults.htmlFor,
    htmlFor = _propsWithDefaults$ht === void 0 ? controlId : _propsWithDefaults$ht,
    className = propsWithDefaults.className,
    _propsWithDefaults$id = propsWithDefaults.id,
    id = _propsWithDefaults$id === void 0 ? labelId : _propsWithDefaults$id,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix());
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    id: id,
    htmlFor: htmlFor
  }, rest, {
    ref: ref,
    className: classes
  }));
});
FormControlLabel.displayName = 'FormControlLabel';
FormControlLabel.propTypes = {
  className: _propTypes.default.string,
  htmlFor: _propTypes.default.string,
  classPrefix: _propTypes.default.string
};
var _default = exports.default = FormControlLabel;