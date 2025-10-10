'use client';
"use strict";

exports.__esModule = true;
exports.useScrollState = useScrollState;
var _react = require("react");
var _hooks = require("../../hooks");
function getScrollState(target) {
  var scrollTop = target.scrollTop;
  var scrollHeight = target.scrollHeight;
  var clientHeight = target.clientHeight;
  if (scrollHeight <= clientHeight) {
    return null;
  } else if (scrollTop === 0) {
    return 'top';
  } else if (scrollTop + clientHeight === scrollHeight) {
    return 'bottom';
  } else {
    return 'middle';
  }
}
function useScrollState(scrollShadow) {
  var bodyRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(null),
    scrollState = _useState[0],
    setScrollState = _useState[1];
  (0, _hooks.useMount)(function () {
    var observer;
    if (bodyRef.current && scrollShadow) {
      var target = bodyRef.current;
      setScrollState(getScrollState(target));
      var lastScrollHeight = target.scrollHeight;

      // Listen for changes in scrollHeight
      observer = new MutationObserver(function () {
        var newScrollHeight = target === null || target === void 0 ? void 0 : target.scrollHeight;
        if (newScrollHeight && newScrollHeight !== lastScrollHeight) {
          setScrollState(getScrollState(target));
          lastScrollHeight = newScrollHeight;
        }
      });
      observer.observe(target, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    return function () {
      var _observer;
      (_observer = observer) === null || _observer === void 0 || _observer.disconnect();
    };
  });
  var handleScroll = (0, _hooks.useEventCallback)(function (event) {
    var target = event.currentTarget;
    setScrollState(getScrollState(target));
  });
  return {
    scrollState: scrollState,
    handleScroll: scrollShadow ? handleScroll : undefined,
    bodyRef: bodyRef
  };
}