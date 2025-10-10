'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.pickTriggerPropKeys = exports.omitTriggerPropKeys = exports.default = exports.ComboboxContextContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _pick = _interopRequireDefault(require("lodash/pick"));
var _OverlayTrigger = _interopRequireDefault(require("../Overlay/OverlayTrigger"));
var _hooks = require("../hooks");
var _utils = require("../utils");
var _CustomProvider = require("../../CustomProvider");
var _excluded = ["pickerProps", "speaker", "placement", "trigger", "id", "multiple", "popupType"];
var omitTriggerPropKeys = exports.omitTriggerPropKeys = ['onEntered', 'onExited', 'onEnter', 'onEntering', 'onExit', 'onExiting', 'open', 'onOpen', 'defaultOpen', 'onClose', 'container', 'containerPadding', 'preventOverflow'];
var pickTriggerPropKeys = exports.pickTriggerPropKeys = [].concat(omitTriggerPropKeys, ['disabled', 'plaintext', 'readOnly', 'loading', 'label']);
var ComboboxContextContext = exports.ComboboxContextContext = /*#__PURE__*/_react.default.createContext({
  popupType: 'listbox'
});
var PickerToggleTrigger = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var pickerProps = props.pickerProps,
    speaker = props.speaker,
    placement = props.placement,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
    id = props.id,
    multiple = props.multiple,
    _props$popupType = props.popupType,
    popupType = _props$popupType === void 0 ? 'listbox' : _props$popupType,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var pickerTriggerProps = (0, _pick.default)(pickerProps, pickTriggerPropKeys);
  var pickerId = (0, _hooks.useUniqueId)('rs-', id);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  return /*#__PURE__*/_react.default.createElement(ComboboxContextContext.Provider, {
    value: {
      id: pickerId,
      hasLabel: typeof pickerTriggerProps.label !== 'undefined',
      multiple: multiple,
      popupType: popupType
    }
  }, /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, (0, _extends2.default)({}, pickerTriggerProps, rest, {
    disabled: pickerTriggerProps.disabled || pickerTriggerProps.loading,
    ref: ref,
    trigger: trigger,
    placement: (0, _utils.placementPolyfill)(placement, rtl),
    speaker: speaker
  })));
});
PickerToggleTrigger.displayName = 'PickerToggleTrigger';
var _default = exports.default = PickerToggleTrigger;