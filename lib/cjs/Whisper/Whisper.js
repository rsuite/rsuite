'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _OverlayTrigger = _interopRequireDefault(require("../internals/Overlay/OverlayTrigger"));
var _constants = require("../internals/constants");
var _propTypes2 = require("../internals/propTypes");
var _utils = require("../internals/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"];
/**
 * The `Whisper` component is used to display a floating element.
 * It is usually used with the `Tooltip` and `Popover` components.
 *
 * @see https://rsuitejs.com/components/whisper
 */
var Whisper = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var _useCustom = (0, _CustomProvider.useCustom)('Whisper', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var onOpen = propsWithDefaults.onOpen,
    onClose = propsWithDefaults.onClose,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'right' : _propsWithDefaults$pl,
    preventOverflow = propsWithDefaults.preventOverflow,
    rest = (0, _objectWithoutPropertiesLoose2.default)(propsWithDefaults, _excluded);
  return /*#__PURE__*/_react.default.createElement(_OverlayTrigger.default, (0, _extends2.default)({}, rest, {
    ref: ref,
    preventOverflow: preventOverflow,
    placement: (0, _utils.placementPolyfill)(placement, rtl),
    onEntered: (0, _utils.createChainedFunction)(onOpen, onEntered),
    onExited: (0, _utils.createChainedFunction)(onClose, onExited)
  }));
});
Whisper.displayName = 'Whisper';
Whisper.propTypes = {
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExited: _propTypes.default.func,
  placement: (0, _propTypes2.oneOf)(_constants.PLACEMENT),
  /**
   * Prevent floating element overflow
   */
  preventOverflow: _propTypes.default.bool,
  /**
   * Whether enable speaker follow cursor
   */
  followCursor: _propTypes.default.bool
};
var _default = exports.default = Whisper;