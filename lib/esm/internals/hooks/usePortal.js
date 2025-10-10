'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import canUseDOM from 'dom-lib/canUseDOM';
var MountedPortal = /*#__PURE__*/React.memo(function (_ref) {
  var children = _ref.children,
    container = _ref.container;
  var _useState = useState(false),
    mounted = _useState[0],
    setMounted = _useState[1];
  useEffect(function () {
    return setMounted(true);
  }, []);
  if (container && mounted) {
    return /*#__PURE__*/createPortal(children, container);
  }
  return null;
});
export function usePortal(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props,
    container = _props.container,
    _props$waitMount = _props.waitMount,
    waitMount = _props$waitMount === void 0 ? false : _props$waitMount;
  var containerElement = typeof container === 'function' ? container() : container;
  var rootElement = useMemo(function () {
    return canUseDOM ? containerElement || document.body : null;
  }, [containerElement]);
  var Portal = useCallback(function (_ref2) {
    var children = _ref2.children;
    return rootElement != null ? /*#__PURE__*/createPortal(children, rootElement) : null;
  }, [rootElement]);
  var WaitMountPortal = useCallback(function (props) {
    return /*#__PURE__*/React.createElement(MountedPortal, _extends({
      container: rootElement
    }, props));
  }, [rootElement]);
  return {
    target: rootElement,
    Portal: waitMount ? WaitMountPortal : Portal
  };
}
export default usePortal;