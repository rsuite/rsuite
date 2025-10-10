'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useElementResize = useElementResize;
var _react = require("react");
var _resizeObserver = require("@juggle/resize-observer");
/**
 * Attach the event handler directly to the specified DOM element,
 * and it will be triggered when the size of the DOM element is changed.
 *
 * @param eventTarget The target to listen for events on
 * @param listener An event handler
 */
function useElementResize(eventTarget, listener) {
  var resizeObserver = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (!resizeObserver.current) {
      var target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
      if (target) {
        resizeObserver.current = new _resizeObserver.ResizeObserver(listener);
        resizeObserver.current.observe(target);
      }
    }
    return function () {
      var _resizeObserver$curre;
      (_resizeObserver$curre = resizeObserver.current) === null || _resizeObserver$curre === void 0 || _resizeObserver$curre.disconnect();
    };
  }, [eventTarget, listener]);
}
var _default = exports.default = useElementResize;