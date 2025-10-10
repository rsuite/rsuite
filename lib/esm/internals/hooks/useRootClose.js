'use client';
import { useEffect, useCallback } from 'react';
import contains from 'dom-lib/contains';
import ownerDocument from 'dom-lib/ownerDocument';
import on from 'dom-lib/on';
import getDOMNode from "../utils/getDOMNode.js";
import { KEY_VALUES } from "../constants/index.js";
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
export function useRootClose(onRootClose, _ref) {
  var disabled = _ref.disabled,
    triggerTarget = _ref.triggerTarget,
    overlayTarget = _ref.overlayTarget,
    _ref$listenEscape = _ref.listenEscape,
    listenEscape = _ref$listenEscape === void 0 ? true : _ref$listenEscape;
  var handleDocumentKeyUp = useCallback(function (event) {
    if (listenEscape && event.key === KEY_VALUES.ESC) {
      onRootClose === null || onRootClose === void 0 || onRootClose(event);
    }
  }, [listenEscape, onRootClose]);
  var handleDocumentMouseDown = useCallback(function (event) {
    var triggerElement = getDOMNode(triggerTarget);
    var overlayElement = getDOMNode(overlayTarget);

    // Check if the clicked element is a trigger.
    if (triggerElement && contains(triggerElement, event.target)) {
      return;
    }

    // Check if the clicked element is a overlay.
    if (overlayElement && contains(overlayElement, event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }
    onRootClose === null || onRootClose === void 0 || onRootClose(event);
  }, [onRootClose, triggerTarget, overlayTarget]);
  useEffect(function () {
    var currentTarget = getDOMNode(triggerTarget);
    if (disabled || !currentTarget) return;
    var doc = ownerDocument(currentTarget);
    var onDocumentMouseDownListener = on(doc, 'mousedown', handleDocumentMouseDown, true);
    var onDocumentKeyupListener = on(doc, 'keyup', handleDocumentKeyUp);
    return function () {
      onDocumentMouseDownListener === null || onDocumentMouseDownListener === void 0 || onDocumentMouseDownListener.off();
      onDocumentKeyupListener === null || onDocumentKeyupListener === void 0 || onDocumentKeyupListener.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown, handleDocumentKeyUp]);
}
export default useRootClose;