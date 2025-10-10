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
var _CloseButton = _interopRequireDefault(require("../internals/CloseButton"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _templateObject, _templateObject2;
var _excluded = ["as", "classPrefix", "size", "color", "children", "closable", "className", "locale", "onClose"];
/**
 * The `Tag` component is used to label and categorize.
 * It can be used to mark the status of an object or classify it into different categories.
 *
 * @see https://rsuitejs.com/components/tag
 */
var Tag = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Tag', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    getLocale = _useCustom.getLocale;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'tag' : _propsWithDefaults$cl,
    _propsWithDefaults$si = propsWithDefaults.size,
    size = _propsWithDefaults$si === void 0 ? 'md' : _propsWithDefaults$si,
    _propsWithDefaults$co = propsWithDefaults.color,
    color = _propsWithDefaults$co === void 0 ? 'default' : _propsWithDefaults$co,
    children = propsWithDefaults.children,
    closable = propsWithDefaults.closable,
    className = propsWithDefaults.className,
    overrideLocale = propsWithDefaults.locale,
    onClose = propsWithDefaults.onClose,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _getLocale = getLocale('common', overrideLocale),
    remove = _getLocale.remove;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix(size, color, {
    closable: closable
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: ref,
    className: classes
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix(_templateObject || (_templateObject = (0, _taggedTemplateLiteralLoose2.default)(["text"])))
  }, children), closable && /*#__PURE__*/_react.default.createElement(_CloseButton.default, {
    className: prefix(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteralLoose2.default)(["icon-close"]))),
    onClick: onClose,
    tabIndex: -1,
    locale: {
      closeLabel: remove
    }
  }));
});
Tag.displayName = 'Tag';
Tag.propTypes = {
  closable: _propTypes.default.bool,
  classPrefix: _propTypes.default.string,
  onClose: _propTypes.default.func,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  as: _propTypes.default.elementType
};
var _default = exports.default = Tag;