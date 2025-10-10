'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"];
import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from "../internals/Overlay/OverlayTrigger.js";
import { PLACEMENT } from "../internals/constants/index.js";
import { oneOf } from "../internals/propTypes/index.js";
import { createChainedFunction, placementPolyfill } from "../internals/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `Whisper` component is used to display a floating element.
 * It is usually used with the `Tooltip` and `Popover` components.
 *
 * @see https://rsuitejs.com/components/whisper
 */
var Whisper = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('Whisper', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var onOpen = propsWithDefaults.onOpen,
    onClose = propsWithDefaults.onClose,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'right' : _propsWithDefaults$pl,
    preventOverflow = propsWithDefaults.preventOverflow,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  return /*#__PURE__*/React.createElement(OverlayTrigger, _extends({}, rest, {
    ref: ref,
    preventOverflow: preventOverflow,
    placement: placementPolyfill(placement, rtl),
    onEntered: createChainedFunction(onOpen, onEntered),
    onExited: createChainedFunction(onClose, onExited)
  }));
});
Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
  placement: oneOf(PLACEMENT),
  /**
   * Prevent floating element overflow
   */
  preventOverflow: PropTypes.bool,
  /**
   * Whether enable speaker follow cursor
   */
  followCursor: PropTypes.bool
};
export default Whisper;