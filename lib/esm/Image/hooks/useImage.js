'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from "../../internals/hooks/index.js";
export var useImage = function useImage(props) {
  var src = props.src,
    fallbackSrc = props.fallbackSrc,
    crossOrigin = props.crossOrigin,
    srcSet = props.srcSet,
    sizes = props.sizes,
    loading = props.loading;
  var _useState = useState(src || fallbackSrc || null),
    imgSrc = _useState[0],
    setImgSrc = _useState[1];
  var _useState2 = useState(!!src),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(false),
    error = _useState3[0],
    setError = _useState3[1];
  var imageRef = useRef(null);
  useEffect(function () {
    setIsLoading(!!src); // true if src exists, false otherwise
  }, [src]);
  var flush = function flush() {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
    }
  };
  var loadImage = useCallback(function () {
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
  useIsomorphicLayoutEffect(function () {
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