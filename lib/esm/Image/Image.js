'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "bordered", "classPrefix", "className", "circle", "crossOrigin", "fit", "fallbackSrc", "loading", "rounded", "srcSet", "sizes", "shaded", "src", "style", "position", "placeholder", "width", "height", "zoomed"];
import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from "../internals/hooks/index.js";
import { ImageWrapper } from "./ImageWrapper.js";
import { useImage } from "./hooks/useImage.js";
import { useCustom } from "../CustomProvider/index.js";
var Image = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _extends2;
  var _useCustom = useCustom('Image', props),
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
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _useClassNames = useClassNames(classPrefix),
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
  var _useImage = useImage(_extends({
      src: src,
      fallbackSrc: fallbackSrc
    }, imgProps)),
    imgSrc = _useImage.imgSrc,
    isLoading = _useImage.isLoading;
  var styles = _extends({}, style, (_extends2 = {}, _extends2['--rs-object-fit'] = fit, _extends2['--rs-object-position'] = position, _extends2));
  var wrapStyles = {
    width: width,
    height: height
  };
  var image = /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    src: imgSrc,
    className: classes,
    style: styles,
    width: width,
    height: height
  }, imgProps, rest));
  if (zoomed) {
    return /*#__PURE__*/React.createElement(ImageWrapper, {
      style: wrapStyles
    }, image);
  }
  if (placeholder) {
    return /*#__PURE__*/React.createElement(ImageWrapper, {
      style: wrapStyles
    }, isLoading && placeholder, image);
  }
  return image;
});
Image.displayName = 'Image';
Image.propTypes = {
  bordered: PropTypes.bool,
  circle: PropTypes.bool,
  fallbackSrc: PropTypes.string,
  fit: PropTypes.string,
  position: PropTypes.string,
  rounded: PropTypes.bool,
  shaded: PropTypes.bool,
  placeholder: PropTypes.node,
  zoomed: PropTypes.bool
};
export default Image;