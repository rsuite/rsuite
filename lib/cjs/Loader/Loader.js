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
var _propTypes2 = require("../internals/propTypes");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "inverse", "backdrop", "speed", "center", "vertical", "content", "size"];
/**
 * The `Loader` component is used to indicate the loading state of a page or a section.
 * @see https://rsuitejs.com/components/loader
 */
var Loader = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Loader', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'loader' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    inverse = propsWithDefaults.inverse,
    backdrop = propsWithDefaults.backdrop,
    _propsWithDefaults$sp = propsWithDefaults.speed,
    speed = _propsWithDefaults$sp === void 0 ? 'normal' : _propsWithDefaults$sp,
    center = propsWithDefaults.center,
    vertical = propsWithDefaults.vertical,
    content = propsWithDefaults.content,
    size = propsWithDefaults.size,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix,
    prefix = _useClassNames.prefix;
  var labelId = (0, _hooks.useUniqueId)('loader-label-');
  var classes = merge(className, prefix('wrapper', "speed-" + speed, size, {
    'backdrop-wrapper': backdrop,
    vertical: vertical,
    inverse: inverse,
    center: center
  }));
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({
    role: "status",
    "aria-labelledby": content ? labelId : undefined
  }, rest, {
    ref: ref,
    className: classes
  }), backdrop && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('backdrop')
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: withClassPrefix()
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('spin')
  }), content && /*#__PURE__*/_react.default.createElement("span", {
    id: labelId,
    className: prefix('content')
  }, content)));
});
Loader.displayName = 'Loader';
Loader.propTypes = {
  as: _propTypes.default.elementType,
  className: _propTypes.default.string,
  classPrefix: _propTypes.default.string,
  center: _propTypes.default.bool,
  backdrop: _propTypes.default.bool,
  inverse: _propTypes.default.bool,
  vertical: _propTypes.default.bool,
  content: _propTypes.default.node,
  size: (0, _propTypes2.oneOf)(['lg', 'md', 'sm', 'xs']),
  speed: (0, _propTypes2.oneOf)(['normal', 'fast', 'slow', 'paused'])
};
var _default = exports.default = Loader;