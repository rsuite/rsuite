'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useBodyStyles = void 0;
var _react = require("react");
var _getHeight = _interopRequireDefault(require("dom-lib/getHeight"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _resizeObserver = require("@juggle/resize-observer");
var useBodyStyles = exports.useBodyStyles = function useBodyStyles(ref, options) {
  var _useState = (0, _react.useState)({}),
    bodyStyles = _useState[0],
    setBodyStyles = _useState[1];
  var overflow = options.overflow,
    prefix = options.prefix,
    size = options.size;
  var windowResizeListener = (0, _react.useRef)();
  var contentElement = (0, _react.useRef)(null);
  var contentElementResizeObserver = (0, _react.useRef)();
  var updateBodyStyles = (0, _react.useCallback)(function (_event, entering) {
    var dialog = ref.current;
    var scrollHeight = dialog ? dialog.scrollHeight : 0;
    var styles = {
      overflow: 'auto'
    };
    if (dialog) {
      // default margin
      var headerHeight = 46;
      var footerHeight = 46;
      var headerDOM = dialog.querySelector("." + prefix('header'));
      var footerDOM = dialog.querySelector("." + prefix('footer'));
      headerHeight = headerDOM ? (0, _getHeight.default)(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? (0, _getHeight.default)(footerDOM) + footerHeight : footerHeight;

      /**
       * Header height + Footer height + Dialog margin
       */
      var excludeHeight = headerHeight + footerHeight + (entering ? 70 : 60);
      var bodyHeight = (0, _getHeight.default)(window) - excludeHeight;
      var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
      styles.maxHeight = maxHeight;
    }
    setBodyStyles(styles);
  }, [prefix, ref]);
  var onDestroyEvents = (0, _react.useCallback)(function () {
    var _windowResizeListener, _windowResizeListener2, _contentElementResize;
    (_windowResizeListener = windowResizeListener.current) === null || _windowResizeListener === void 0 || (_windowResizeListener2 = _windowResizeListener.off) === null || _windowResizeListener2 === void 0 || _windowResizeListener2.call(_windowResizeListener);
    (_contentElementResize = contentElementResizeObserver.current) === null || _contentElementResize === void 0 || _contentElementResize.disconnect();
    windowResizeListener.current = null;
    contentElementResizeObserver.current = null;
  }, []);
  var onChangeBodyStyles = (0, _react.useCallback)(function (entering) {
    if (!overflow || size === 'full') {
      setBodyStyles(null);
      return;
    }
    if (ref.current) {
      updateBodyStyles(undefined, entering);
      contentElement.current = ref.current.querySelector("." + prefix('content'));
      if (!windowResizeListener.current) {
        windowResizeListener.current = (0, _on.default)(window, 'resize', updateBodyStyles);
      }
      if (contentElement.current && !contentElementResizeObserver.current) {
        contentElementResizeObserver.current = new _resizeObserver.ResizeObserver(function () {
          return updateBodyStyles();
        });
        contentElementResizeObserver.current.observe(contentElement.current);
      }
    }
  }, [overflow, prefix, ref, size, updateBodyStyles]);
  (0, _react.useEffect)(function () {
    return onDestroyEvents;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [overflow ? bodyStyles : null, onChangeBodyStyles, onDestroyEvents];
};