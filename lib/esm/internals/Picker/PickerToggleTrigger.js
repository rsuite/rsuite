'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["pickerProps", "speaker", "placement", "trigger", "id", "multiple", "popupType"];
import React from 'react';
import pick from 'lodash/pick';
import OverlayTrigger from "../Overlay/OverlayTrigger.js";
import { useUniqueId } from "../hooks/index.js";
import { placementPolyfill } from "../utils/index.js";
import { useCustom } from "../../CustomProvider/index.js";
export var omitTriggerPropKeys = ['onEntered', 'onExited', 'onEnter', 'onEntering', 'onExit', 'onExiting', 'open', 'onOpen', 'defaultOpen', 'onClose', 'container', 'containerPadding', 'preventOverflow'];
export var pickTriggerPropKeys = [].concat(omitTriggerPropKeys, ['disabled', 'plaintext', 'readOnly', 'loading', 'label']);
export var ComboboxContextContext = /*#__PURE__*/React.createContext({
  popupType: 'listbox'
});
var PickerToggleTrigger = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var pickerProps = props.pickerProps,
    speaker = props.speaker,
    placement = props.placement,
    _props$trigger = props.trigger,
    trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
    id = props.id,
    multiple = props.multiple,
    _props$popupType = props.popupType,
    popupType = _props$popupType === void 0 ? 'listbox' : _props$popupType,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var pickerTriggerProps = pick(pickerProps, pickTriggerPropKeys);
  var pickerId = useUniqueId('rs-', id);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  return /*#__PURE__*/React.createElement(ComboboxContextContext.Provider, {
    value: {
      id: pickerId,
      hasLabel: typeof pickerTriggerProps.label !== 'undefined',
      multiple: multiple,
      popupType: popupType
    }
  }, /*#__PURE__*/React.createElement(OverlayTrigger, _extends({}, pickerTriggerProps, rest, {
    disabled: pickerTriggerProps.disabled || pickerTriggerProps.loading,
    ref: ref,
    trigger: trigger,
    placement: placementPolyfill(placement, rtl),
    speaker: speaker
  })));
});
PickerToggleTrigger.displayName = 'PickerToggleTrigger';
export default PickerToggleTrigger;