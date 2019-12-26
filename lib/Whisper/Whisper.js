"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _OverlayTrigger = _interopRequireDefault(require("rsuite-utils/lib/Overlay/OverlayTrigger"));

var _utils = require("../utils");

var _IntlContext = _interopRequireDefault(require("../IntlProvider/IntlContext"));

var Whisper =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Whisper, _React$Component);

  function Whisper() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Whisper.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        triggerRef = _this$props.triggerRef,
        onOpen = _this$props.onOpen,
        onClose = _this$props.onClose,
        onEntered = _this$props.onEntered,
        onExited = _this$props.onExited,
        _this$props$placement = _this$props.placement,
        placement = _this$props$placement === void 0 ? 'right' : _this$props$placement,
        preventOverflow = _this$props.preventOverflow,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["triggerRef", "onOpen", "onClose", "onEntered", "onExited", "placement", "preventOverflow"]);
    return React.createElement(_IntlContext.default.Consumer, null, function (context) {
      return React.createElement(_OverlayTrigger.default, (0, _extends2.default)({
        preventOverflow: preventOverflow,
        placement: (0, _utils.placementPolyfill)(placement, context === null || context === void 0 ? void 0 : context.rtl),
        onEntered: (0, _utils.createChainedFunction)(onOpen, onEntered),
        onExited: (0, _utils.createChainedFunction)(onClose, onExited),
        ref: triggerRef // for test

      }, rest));
    });
  };

  return Whisper;
}(React.Component);

Whisper.propTypes = {
  triggerRef: _propTypes.default.func,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onEntered: _propTypes.default.func,
  onExited: _propTypes.default.func,
  placement: _propTypes.default.string,

  /**
   * Prevent floating element overflow
   */
  preventOverflow: _propTypes.default.bool
};
var _default = Whisper;
exports.default = _default;
module.exports = exports.default;