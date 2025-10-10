'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
exports.useFocusVirtualListItem = useFocusVirtualListItem;
var _react = require("react");
/**
 * Ensures that a virtualized list item retains focus after scrolling or clicking on options,
 * preventing unnecessary re-renders and loss of focus. If the current focus is on an interactive
 * element (such as input, textarea, select, button, or contenteditable), the focus is not shifted.
 * @param focused - Boolean indicating if the item should be focused.
 * @returns A ref to be attached to the list item element.
 */
function useFocusVirtualListItem(focused) {
  var itemRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!focused || !itemRef.current) {
      return;
    }
    var activeElement = document.activeElement;

    // Helper function to determine if the element should retain focus
    var isInteractiveElement = function isInteractiveElement(element) {
      var tagName = element.tagName;
      return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || tagName === 'BUTTON' || element.isContentEditable || element.tabIndex >= 0 // Elements with tabindex are considered focusable
      ;
    };

    // If the active element is an interactive one, don't shift focus.
    if (activeElement && isInteractiveElement(activeElement)) {
      return;
    }

    // If the currently focused element is not the target item, focus it.
    if (activeElement !== itemRef.current) {
      itemRef.current.focus();
    }
  }, [focused]);
  return itemRef;
}
var _default = exports.default = useFocusVirtualListItem;