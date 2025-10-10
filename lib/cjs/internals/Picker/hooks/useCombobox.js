'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _PickerToggleTrigger = require("../PickerToggleTrigger");
function useCombobox() {
  var _useContext = (0, _react.useContext)(_PickerToggleTrigger.ComboboxContextContext),
    id = _useContext.id,
    hasLabel = _useContext.hasLabel,
    popupType = _useContext.popupType,
    multiple = _useContext.multiple;
  return {
    id: id,
    popupType: popupType,
    multiple: multiple,
    labelId: hasLabel ? id + "-label" : undefined
  };
}
var _default = exports.default = useCombobox;