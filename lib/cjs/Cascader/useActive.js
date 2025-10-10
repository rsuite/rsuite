'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _hooks = require("../internals/hooks");
var useActive = function useActive(props) {
  var onOpen = props.onOpen,
    onClose = props.onClose,
    onEntered = props.onEntered,
    onExited = props.onExited,
    target = props.target,
    setSearchKeyword = props.setSearchKeyword;
  // Use component active state to support keyboard events.
  var _useState = (0, _react.useState)(false),
    active = _useState[0],
    setActive = _useState[1];
  var handleEntered = (0, _hooks.useEventCallback)(function (node) {
    onEntered === null || onEntered === void 0 || onEntered(node);
    if (!target.current) {
      return;
    }
    onOpen === null || onOpen === void 0 || onOpen();
    setActive(true);
  });
  var handleExited = (0, _hooks.useEventCallback)(function (node) {
    onExited === null || onExited === void 0 || onExited(node);
    if (!target.current) {
      return;
    }
    onClose === null || onClose === void 0 || onClose();
    setActive(false);
    setSearchKeyword('');
  });
  return {
    active: active,
    handleEntered: handleEntered,
    handleExited: handleExited
  };
};
var _default = exports.default = useActive;