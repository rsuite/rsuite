'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _hooks = require("../internals/hooks");
var _ImageWrapper = require("./ImageWrapper");
var _useImage2 = require("./hooks/useImage");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "bordered", "classPrefix", "className", "circle", "crossOrigin", "fit", "fallbackSrc", "loading", "rounded", "srcSet", "sizes", "shaded", "src", "style", "position", "placeholder", "width", "height", "zoomed"];
var Image = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _extends2;
  var _useCustom = (0, _CustomProvider.useCustom)('Image', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'img' : _propsWithDefaults$as,
    bordered = propsWithDefaults.bordered,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'image' : _propsWithDefaults$cl,
    className = propsWithDefaults.className,
    circle = propsWithDefaults.circle,
    crossOrigin = propsWithDefaults.crossOrigin,
    fit = propsWithDefaults.fit,
    fallbackSrc = propsWithDefaults.fallbackSrc,
    loading = propsWithDefaults.loading,
    rounded = propsWithDefaults.rounded,
    srcSet = propsWithDefaults.srcSet,
    sizes = propsWithDefaults.sizes,
    shaded = propsWithDefaults.shaded,
    src = propsWithDefaults.src,
    style = propsWithDefaults.style,
    position = propsWithDefaults.position,
    placeholder = propsWithDefaults.placeholder,
    width = propsWithDefaults.width,
    height = propsWithDefaults.height,
    zoomed = propsWithDefaults.zoomed,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var classes = merge(className, withClassPrefix({
    circle: circle,
    bordered: bordered,
    rounded: rounded,
    shaded: shaded,
    zoomed: zoomed
  }));
  var imgProps = {
    crossOrigin: crossOrigin,
    srcSet: srcSet,
    sizes: sizes,
    loading: loading
  };
  var _useImage = (0, _useImage2.useImage)((0, _extends3.default)({
      src: src,
      fallbackSrc: fallbackSrc
    }, imgProps)),
    imgSrc = _useImage.imgSrc,
    isLoading = _useImage.isLoading;
  var styles = (0, _extends3.default)({}, style, (_extends2 = {}, _extends2['--rs-object-fit'] = fit, _extends2['--rs-object-position'] = position, _extends2));
  var wrapStyles = {
    width: width,
    height: height
  };
  var image = /*#__PURE__*/_react.default.createElement(Component, (0, _extends3.default)({
    ref: ref,
    src: imgSrc,
    className: classes,
    style: styles,
    width: width,
    height: height
  }, imgProps, rest));
  if (zoomed) {
    return /*#__PURE__*/_react.default.createElement(_ImageWrapper.ImageWrapper, {
      style: wrapStyles
    }, image);
  }
  if (placeholder) {
    return /*#__PURE__*/_react.default.createElement(_ImageWrapper.ImageWrapper, {
      style: wrapStyles
    }, isLoading && placeholder, image);
  }
  return image;
});
Image.displayName = 'Image';
Image.propTypes = {
  bordered: _propTypes.default.bool,
  circle: _propTypes.default.bool,
  fallbackSrc: _propTypes.default.string,
  fit: _propTypes.default.string,
  position: _propTypes.default.string,
  rounded: _propTypes.default.bool,
  shaded: _propTypes.default.bool,
  placeholder: _propTypes.default.node,
  zoomed: _propTypes.default.bool
};
var _default = exports.default = Image;