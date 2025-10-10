'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _hooks = require("../internals/hooks");
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
  var _useState = (0, _react.useState)('pending'),
    status = _useState[0],
    setStatus = _useState[1];
  var imgRef = (0, _react.useRef)(null);
  var flush = function flush() {
    if (imgRef.current) {
      imgRef.current.onload = null;
      imgRef.current.onerror = null;
      imgRef.current = null;
    }
  };
  var handleLoad = (0, _react.useCallback)(function () {
    setStatus('loaded');
    flush();
  }, []);
  var handleError = (0, _react.useCallback)(function (event) {
    setStatus('error');
    flush();
    onError === null || onError === void 0 || onError(event);
  }, [onError]);
  (0, _react.useEffect)(function () {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);
  var loadImge = (0, _react.useCallback)(function () {
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
  (0, _hooks.useIsomorphicLayoutEffect)(function () {
    if (status === 'loading') {
      loadImge();
    }
  }, [loadImge, status]);
  (0, _react.useEffect)(function () {
    return flush;
  }, []);
  return {
    loaded: status === 'loaded',
    status: status
  };
};
var _default = exports.default = useImage;