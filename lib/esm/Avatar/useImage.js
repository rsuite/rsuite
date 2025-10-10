'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from "../internals/hooks/index.js";
/**
 * A hook that loads an image and returns the status of the image.
 *
 * @example
 * ```jsx
 * const { loaded } = useImage({ src:'https://example.com/image.jpg' });
 *
 * return loaded ? <img src="https://example.com/image.jpg" /> : <Placeholder />;
 * ```
 */
var useImage = function useImage(props) {
  var src = props.src,
    srcSet = props.srcSet,
    sizes = props.sizes,
    crossOrigin = props.crossOrigin,
    onError = props.onError;
  var _useState = useState('pending'),
    status = _useState[0],
    setStatus = _useState[1];
  var imgRef = useRef(null);
  var flush = function flush() {
    if (imgRef.current) {
      imgRef.current.onload = null;
      imgRef.current.onerror = null;
      imgRef.current = null;
    }
  };
  var handleLoad = useCallback(function () {
    setStatus('loaded');
    flush();
  }, []);
  var handleError = useCallback(function (event) {
    setStatus('error');
    flush();
    onError === null || onError === void 0 || onError(event);
  }, [onError]);
  useEffect(function () {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);
  var loadImge = useCallback(function () {
    if (!src) {
      return;
    }
    var img = new Image();
    img.onload = handleLoad;
    img.onerror = handleError;
    if (src) img.src = src;
    if (srcSet) img.srcset = srcSet;
    if (sizes) img.sizes = sizes;
    if (crossOrigin) img.crossOrigin = crossOrigin;
    imgRef.current = img;
  }, [crossOrigin, handleError, handleLoad, sizes, src, srcSet]);
  useIsomorphicLayoutEffect(function () {
    if (status === 'loading') {
      loadImge();
    }
  }, [loadImge, status]);
  useEffect(function () {
    return flush;
  }, []);
  return {
    loaded: status === 'loaded',
    status: status
  };
};
export default useImage;