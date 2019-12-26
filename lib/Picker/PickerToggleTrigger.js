"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _react = _interopRequireDefault(require("react"));

var _OverlayTrigger = _interopRequireDefault(require("rsuite-utils/lib/Overlay/OverlayTrigger"));

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var PickerToggleTriggerProps = ['onEntered', 'onExited', 'open', 'defaultOpen', 'disabled', 'onEnter', 'onEntering', 'onExit', 'onExiting', 'onHide', 'container', 'containerPadding', 'preventOverflow'];

var PickerToggleTrigger = _react.default.forwardRef(function (props, ref) {
  var pickerProps = props.pickerProps,
      speaker = props.speaker,
      _props$trigger = props.trigger,
      trigger = _props$trigger === void 0 ? 'click' : _props$trigger,
      open = props.open,
      rest = (0, _objectWithoutPropertiesLoose2.default)(props, ["pickerProps", "speaker", "trigger", "open"]);
  var placement = pickerProps.placement;
  return _react.default.createElement(_IntlContext.default.Consumer, null, function (context) {
    return _react.default.createElement(_OverlayTrigger.default, (0, _extends2.default)({
      trigger: trigger,
      ref: ref,
      open: open,
      placement: (0, _utils.placementPolyfill)(placement, context === null || context === void 0 ? void 0 : context.rtl),
      speaker: speaker
    }, (0, _pick2.default)(pickerProps, PickerToggleTriggerProps), rest));
  });
});

PickerToggleTrigger.displayName = 'PickerToggleTrigger';
var _default = PickerToggleTrigger;
exports.default = _default;
module.exports = exports.default;