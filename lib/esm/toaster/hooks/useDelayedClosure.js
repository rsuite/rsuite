'use client';
import { useContext, useRef } from 'react';
import on from 'dom-lib/on';
import { useTimeout, useMount } from "../../internals/hooks/index.js";
import ToastContext from "../ToastContext.js";
/**
 * A hook that delays the closure of the message box.
 */
function useDelayedClosure(props) {
  var onClose = props.onClose,
    durationProp = props.duration,
    targetRef = props.targetRef;
  var _useContext = useContext(ToastContext),
    usedToaster = _useContext.usedToaster,
    _useContext$duration = _useContext.duration,
    duration = _useContext$duration === void 0 ? durationProp : _useContext$duration,
    mouseReset = _useContext.mouseReset;
  var mouseEnterRef = useRef();
  var mouseLeaveRef = useRef();
  var _useTimeout = useTimeout(onClose, duration, usedToaster && duration > 0),
    clear = _useTimeout.clear,
    reset = _useTimeout.reset;
  useMount(function () {
    if (targetRef !== null && targetRef !== void 0 && targetRef.current && mouseReset) {
      if (mouseEnterRef.current || mouseLeaveRef.current) {
        return;
      }
      mouseEnterRef.current = on(targetRef.current, 'mouseenter', clear);
      mouseLeaveRef.current = on(targetRef.current, 'mouseleave', reset);
      return function () {
        var _mouseEnterRef$curren, _mouseLeaveRef$curren;
        (_mouseEnterRef$curren = mouseEnterRef.current) === null || _mouseEnterRef$curren === void 0 || _mouseEnterRef$curren.off();
        (_mouseLeaveRef$curren = mouseLeaveRef.current) === null || _mouseLeaveRef$curren === void 0 || _mouseLeaveRef$curren.off();
      };
    }
  });
  return {
    clear: clear,
    reset: reset
  };
}
export default useDelayedClosure;