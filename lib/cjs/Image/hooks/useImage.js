'use client';
"use strict";

exports.__esModule = true;
exports.useImage = void 0;
var _react = require("react");
var _hooks = require("../../internals/hooks");
var useImage = exports.useImage = function useImage(props) {
  var src = props.src,
    fallbackSrc = props.fallbackSrc,
    crossOrigin = props.crossOrigin,
    srcSet = props.srcSet,
    sizes = props.sizes,
    loading = props.loading;
  var _useState = (0, _react.useState)(src || fallbackSrc || null),
    imgSrc = _useState[0],
    setImgSrc = _useState[1];
  var _useState2 = (0, _react.useState)(!!src),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    error = _useState3[0],
    setError = _useState3[1];
  var imageRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    setIsLoading(!!src); // true if src exists, false otherwise
  }, [src]);
  var flush = function flush() {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
    }
  };
  var loadImage = (0, _react.useCallback)(function () {
    if (!src) return;
    flush();
    var image = new Image();
    image.src = src;
    if (crossOrigin) image.crossOrigin = crossOrigin;
    if (srcSet) image.srcset = srcSet;
    if (sizes) image.sizes = sizes;
    if (loading) image.loading = loading;
    image.onload = function () {
      flush();
      setImgSrc(src);
      setIsLoading(false);
    };
    image.onerror = function () {
      flush();
      setError(true);
      setImgSrc(fallbackSrc || null);
      setIsLoading(false);
    };
    imageRef.current = image;
  }, [crossOrigin, fallbackSrc, loading, sizes, src, srcSet]);
  (0, _hooks.useIsomorphicLayoutEffect)(function () {
    loadImage();
    return function () {
      flush();
    };
  }, [loadImage]);
  return {
    imgSrc: imgSrc,
    isLoading: isLoading,
    error: error
  };
};