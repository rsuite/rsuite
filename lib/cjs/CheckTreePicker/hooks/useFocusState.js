'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _hooks = require("../../internals/hooks");
function useFocusState(props) {
  var target = props.target;
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var _useState2 = (0, _react.useState)(null),
    focusItemValue = _useState2[0],
    setFocusItemValue = _useState2[1];
  var focusTarget = (0, _hooks.useEventCallback)(function () {
    var _target$current;
    (_target$current = target.current) === null || _target$current === void 0 || _target$current.focus();
  });
  var onEnter = (0, _hooks.useEventCallback)(function (node) {
    var _props$onEnter;
    setActive(true);
    (_props$onEnter = props.onEnter) === null || _props$onEnter === void 0 || _props$onEnter.call(props, node);
  });
  var onExit = (0, _hooks.useEventCallback)(function (node) {
    var _props$onExit;
    setActive(false);
    focusTarget();
    (_props$onExit = props.onExit) === null || _props$onExit === void 0 || _props$onExit.call(props, node);
  });
  return {
    active: active,
    focusItemValue: focusItemValue,
    setFocusItemValue: setFocusItemValue,
    triggerProps: {
      onEnter: onEnter,
      onExit: onExit
    }
  };
}
var _default = exports.default = useFocusState;