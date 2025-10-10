'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import getHeight from 'dom-lib/getHeight';
import on from 'dom-lib/on';
import { ResizeObserver } from '@juggle/resize-observer';
export var useBodyStyles = function useBodyStyles(ref, options) {
  var _useState = useState({}),
    bodyStyles = _useState[0],
    setBodyStyles = _useState[1];
  var overflow = options.overflow,
    prefix = options.prefix,
    size = options.size;
  var windowResizeListener = useRef();
  var contentElement = useRef(null);
  var contentElementResizeObserver = useRef();
  var updateBodyStyles = useCallback(function (_event, entering) {
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
      headerHeight = headerDOM ? getHeight(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? getHeight(footerDOM) + footerHeight : footerHeight;

      /**
       * Header height + Footer height + Dialog margin
       */
      var excludeHeight = headerHeight + footerHeight + (entering ? 70 : 60);
      var bodyHeight = getHeight(window) - excludeHeight;
      var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
      styles.maxHeight = maxHeight;
    }
    setBodyStyles(styles);
  }, [prefix, ref]);
  var onDestroyEvents = useCallback(function () {
    var _windowResizeListener, _windowResizeListener2, _contentElementResize;
    (_windowResizeListener = windowResizeListener.current) === null || _windowResizeListener === void 0 || (_windowResizeListener2 = _windowResizeListener.off) === null || _windowResizeListener2 === void 0 || _windowResizeListener2.call(_windowResizeListener);
    (_contentElementResize = contentElementResizeObserver.current) === null || _contentElementResize === void 0 || _contentElementResize.disconnect();
    windowResizeListener.current = null;
    contentElementResizeObserver.current = null;
  }, []);
  var onChangeBodyStyles = useCallback(function (entering) {
    if (!overflow || size === 'full') {
      setBodyStyles(null);
      return;
    }
    if (ref.current) {
      updateBodyStyles(undefined, entering);
      contentElement.current = ref.current.querySelector("." + prefix('content'));
      if (!windowResizeListener.current) {
        windowResizeListener.current = on(window, 'resize', updateBodyStyles);
      }
      if (contentElement.current && !contentElementResizeObserver.current) {
        contentElementResizeObserver.current = new ResizeObserver(function () {
          return updateBodyStyles();
        });
        contentElementResizeObserver.current.observe(contentElement.current);
      }
    }
  }, [overflow, prefix, ref, size, updateBodyStyles]);
  useEffect(function () {
    return onDestroyEvents;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [overflow ? bodyStyles : null, onChangeBodyStyles, onDestroyEvents];
};