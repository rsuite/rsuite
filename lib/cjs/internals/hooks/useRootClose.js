'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
exports.useRootClose = useRootClose;
var _react = require("react");
var _contains = _interopRequireDefault(require("dom-lib/contains"));
var _ownerDocument = _interopRequireDefault(require("dom-lib/ownerDocument"));
var _on = _interopRequireDefault(require("dom-lib/on"));
var _getDOMNode = _interopRequireDefault(require("../utils/getDOMNode"));
var _constants = require("../constants");
function isLeftClickEvent(event) {
  return (event === null || event === void 0 ? void 0 : event.button) === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event !== null && event !== void 0 && event.shiftKey);
}
/**
 * A hook that listens to the document click event and closes the overlay.
 * @param onRootClose
 * @param param1
 * @todo Allow different behaviors based on whether clicked element is focusable
 */
function useRootClose(onRootClose, _ref) {
  var disabled = _ref.disabled,
    triggerTarget = _ref.triggerTarget,
    overlayTarget = _ref.overlayTarget,
    _ref$listenEscape = _ref.listenEscape,
    listenEscape = _ref$listenEscape === void 0 ? true : _ref$listenEscape;
  var handleDocumentKeyUp = (0, _react.useCallback)(function (event) {
    if (listenEscape && event.key === _constants.KEY_VALUES.ESC) {
      onRootClose === null || onRootClose === void 0 || onRootClose(event);
    }
  }, [listenEscape, onRootClose]);
  var handleDocumentMouseDown = (0, _react.useCallback)(function (event) {
    var triggerElement = (0, _getDOMNode.default)(triggerTarget);
    var overlayElement = (0, _getDOMNode.default)(overlayTarget);

    // Check if the clicked element is a trigger.
    if (triggerElement && (0, _contains.default)(triggerElement, event.target)) {
      return;
    }

    // Check if the clicked element is a overlay.
    if (overlayElement && (0, _contains.default)(overlayElement, event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    onRootClose === null || onRootClose === void 0 || onRootClose(event);
  }, [onRootClose, triggerTarget, overlayTarget]);
  (0, _react.useEffect)(function () {
    var currentTarget = (0, _getDOMNode.default)(triggerTarget);
    if (disabled || !currentTarget) return;
    var doc = (0, _ownerDocument.default)(currentTarget);
    var onDocumentMouseDownListener = (0, _on.default)(doc, 'mousedown', handleDocumentMouseDown, true);
    var onDocumentKeyupListener = (0, _on.default)(doc, 'keyup', handleDocumentKeyUp);
    return function () {
      onDocumentMouseDownListener === null || onDocumentMouseDownListener === void 0 || onDocumentMouseDownListener.off();
      onDocumentKeyupListener === null || onDocumentKeyupListener === void 0 || onDocumentKeyupListener.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown, handleDocumentKeyUp]);
}
var _default = exports.default = useRootClose;