'use client';
import { useState } from 'react';
import { useEventCallback } from "../../internals/hooks/index.js";
function useFocusState(props) {
  var target = props.target,
    value = props.value,
    focusActiveNode = props.focusActiveNode;
  var _useState = useState(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = useState(null),
    focusItemValue = _useState2[0],
    setFocusItemValue = _useState2[1];
  var focusTarget = useEventCallback(function () {
    var _target$current;
    (_target$current = target.current) === null || _target$current === void 0 || _target$current.focus();
  });
  var onEnter = useEventCallback(function (node) {
    var _props$onEnter;
    setActive(true);
    (_props$onEnter = props.onEnter) === null || _props$onEnter === void 0 || _props$onEnter.call(props, node);
  });
  var onExit = useEventCallback(function (node) {
    var _props$onExit;
    setActive(false);
    focusTarget();
    (_props$onExit = props.onExit) === null || _props$onExit === void 0 || _props$onExit.call(props, node);
  });
  var onEntered = useEventCallback(function (node) {
    var _props$onEntered;
    if (value) {
      setFocusItemValue(value);
      focusActiveNode();
    }
    (_props$onEntered = props.onEntered) === null || _props$onEntered === void 0 || _props$onEntered.call(props, node);
  });
  return {
    active: active,
    focusItemValue: focusItemValue,
    setFocusItemValue: setFocusItemValue,
    triggerProps: {
      onEnter: onEnter,
      onExit: onExit,
      onEntered: onEntered
    }
  };
}
export default useFocusState;