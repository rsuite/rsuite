'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _hooks = require("../../internals/hooks");
var _utils = require("../utils");
function useTreeValue(controlledValue, _ref) {
  var defaultValue = _ref.defaultValue,
    uncheckableItemValues = _ref.uncheckableItemValues;
  var _useControlled = (0, _hooks.useControlled)(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1],
    isControlled = _useControlled[2];
  (0, _hooks.useMount)(function () {
    setValue((0, _utils.getCheckTreeDefaultValue)(value, uncheckableItemValues));
  });
  return [value, setValue, isControlled];
}
var _default = exports.default = useTreeValue;