'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useEventListener = useEventListener;
var _react = require("react");
var _on = _interopRequireDefault(require("dom-lib/on"));
/**
 * Attach the event handler directly to the specified DOM element.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useEventListener(eventTarget, event, listener, capture) {
  if (capture === void 0) {
    capture = false;
  }
  (0, _react.useEffect)(function () {
    var target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    var controller = target ? (0, _on.default)(target, event, listener, capture) : null;
    return function () {
      controller === null || controller === void 0 || controller.off();
    };
  }, [eventTarget, event, listener, capture]);
}
var _default = exports.default = useEventListener;