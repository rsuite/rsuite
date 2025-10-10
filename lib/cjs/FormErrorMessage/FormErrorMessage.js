'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _taggedTemplateLiteralLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteralLoose"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/utils");
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "className", "show", "children", "placement"];
/**
 * The `<Form.ErrorMessage>` component is used to display error messages in the form.
 * @see https://rsuitejs.com/components/form/
 */
var FormErrorMessage = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _prefix;
  var _useCustom = (0, _CustomProvider.useCustom)('FormErrorMessage', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'form-error-message' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    show = propsWithDefaults.show,
    children = propsWithDefaults.children,
    placement = propsWithDefaults.placement,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = withClassPrefix('show');
  var wrapperClasses = merge(className, prefix('wrapper', (_prefix = {}, _prefix["placement-" + (0, _kebabCase.default)((0, _utils.placementPolyfill)(placement))] = placement, _prefix)));
  return show ? /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: wrapperClasses
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: classes
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["arrow"])))
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["inner"])))
  }, children))) : null;
});
FormErrorMessage.displayName = 'FormErrorMessage';
FormErrorMessage.propTypes = {
  show: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  placement: (0, _propTypes2.oneOf)(['bottomStart', 'bottomEnd', 'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd'])
};
var _default = exports.default = FormErrorMessage;